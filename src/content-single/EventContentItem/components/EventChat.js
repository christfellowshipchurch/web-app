import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { useQuery, useLazyQuery } from 'react-apollo';
import { get, isEmpty } from 'lodash';
import classnames from 'classnames';

import { baseUnit } from 'styles/theme';

import { StreamChatClient } from 'stream-chat-client'; // really: 'src/stream-chat-client/'

import { useAuth } from 'auth';

// UI
import { Loader, Icon } from 'ui';

import { GET_CURRENT_USER_FOR_CHAT, GET_CURRENT_USER_ROLE_FOR_CHANNEL } from '../queries';

import LiveStreamChat from './LiveStreamChat';
import DirectMessagesChat from './DirectMessagesChat';
import DirectMessagesDropdown from './DirectMessagesDropdown';

// TODO: Find better home for these
// ✂️ -----------------------------------------------------------

const getStreamUser = (user) => ({
  id: user.id.split(':')[1],
  name: `${user.profile.firstName} ${user.profile.lastName}`,
  image: get(user, 'profile.photo.uri', ''),
});

const ChatRoles = Object.freeze({
  USER: 'USER',
  MODERATOR: 'MODERATOR',
});

// ✂️ -----------------------------------------------------------

// :: Styled Components
// ------------------------

const ChatContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  background: ${({ theme }) => theme.card.background};
`;

const DirectMessagesContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  background: ${({ theme }) => theme.card.background};
  box-shadow: ${({ theme }) => theme.shadow.medium};
  transform: translateX(${({ visible }) => (visible ? 0 : '130%')});
  transition: transform 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)
    ${({ visible }) => (visible ? '0s' : '0.15s')};
`;

// :: Styled Components
// ------------------------

const ChatHeader = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  padding: ${baseUnit(1)} ${baseUnit(2)};
  background: ${({ theme }) => theme.chat.dmsHeader};
  border-bottom: 1px ${({ theme }) => theme.font[100]} solid;
  box-shadow: ${({ theme }) => theme.shadow.small};
`;

// Warning: Duplicated in DirectMessagesDropdown
const BackButton = styled.button`
  padding: ${baseUnit(1)};
  border: none;
  background: none;
  color: ${({ theme }) => theme.link};
`;

const BackIcon = styled(Icon).attrs(({ theme, name }) => ({
  name,
  fill: theme.brand,
  size: 22,
}))``;

// Main Component
// ------------------------

const EventChat = ({ channelId }) => {
  // User data
  const { isLoggedIn } = useAuth();
  const { loading, data, error } = useQuery(GET_CURRENT_USER_FOR_CHAT, {
    skip: !isLoggedIn,
  });

  // The user role query is separate and invoked manually at the right time, since
  // the channel must exist first before we can request our role in it.
  // That problem only affects the first user for the Event's chat.
  const [getUserRole, { data: userRoleQueryData }] = useLazyQuery(
    GET_CURRENT_USER_ROLE_FOR_CHANNEL,
    {
      fetchPolicy: 'network-only',
      variables: {
        channelId,
      },
    }
  );

  const userRole = isLoggedIn
    ? get(userRoleQueryData, 'currentUser.streamChatRole', null)
    : ChatRoles.USER;
  console.log('[rkd] userRole:', userRole);

  const [channel, setChannel] = useState(null);
  const [dmChannels, setDmChannels] = useState([]);
  const [activeDmChannel, setActiveDmChannel] = useState(null);
  const stripPrefix = (id) => id.split(':')[1];

  useEffect(() => {
    const handleUserConnection = async () => {
      console.group('[rkd] handleUserConnection()');

      // Initialize user first
      const canConnectAsUser = isLoggedIn && !loading && data;

      if (canConnectAsUser && !get(StreamChatClient, 'userID')) {
        await StreamChatClient.setUser(
          getStreamUser(data.currentUser),
          data.currentUser.streamChatToken
        );
      } else if (!isLoggedIn) {
        await StreamChatClient.setGuestUser({ id: 'guest' });
      }

      // Initialize channel
      const newChannel = StreamChatClient.channel('livestream', channelId, {
        name: 'Stream Chat Demo',
        uploads: false,
      });
      await newChannel.create();
      setChannel(newChannel);
      console.log('[rkd] livestream channel (newChannel):', newChannel);

      if (isLoggedIn) {
        // :: Use code below to force-create a 1:1 DM channel
        // const members = [
        //   'AuthenticatedUser:3a4a20f0828c592f7f366dfce8d1f9ab', // Ryan
        //   //   'AuthenticatedUser:3fd1595b8f555c2e1c2f1a57d2947898', // Yoda
        //   'AuthenticatedUser:095eeb4c77024b09efce0a59d38caeef', // Gerard Hey
        // ].map(stripPrefix);

        // const newDmChannel = StreamChatClient.channel('messaging', {
        //   members,
        // });
        // await newDmChannel.create();

        console.groupCollapsed('[rkd] Getting list of DMs a user is participating in');
        const filter = {
          type: 'messaging',
          members: { $in: [stripPrefix(data.currentUser.id)] },
        };
        const sort = { last_message_at: -1 };
        const options = { limit: 30 };

        const dmChannelsResponse = await StreamChatClient.queryChannels(
          filter,
          sort,
          options
        );
        setDmChannels(dmChannelsResponse);

        console.log('[rkd] dmChannelsResponse:', dmChannelsResponse);
        console.groupEnd();
      }

      // Now that we're sure the channel exists, we can request the user's role for it
      if (canConnectAsUser) {
        await getUserRole();
      }

      console.groupEnd();
    };

    handleUserConnection();

    return () => {
      console.log('[rkd] Cleanup handleUserConnection 🧹');
      StreamChatClient.disconnect();
      setChannel(null);
      setDmChannels(null);
      setActiveDmChannel(null);
    };
  }, [isLoggedIn, loading, data, channelId]);

  if (loading || !channel || !userRole) return <Loader />;
  if (error) return <pre>{JSON.stringify({ error }, null, 2)}</pre>;

  console.log(
    `[rkd] 🟧  ${userRole} === ChatRoles.MODERATOR:`,
    userRole === ChatRoles.MODERATOR
  );
  return (
    <ChatContainer>
      <LiveStreamChat channel={channel} isModerator={userRole === ChatRoles.MODERATOR} />

      <DirectMessagesContainer visible={!!activeDmChannel}>
        <DirectMessagesChat channel={activeDmChannel} />
      </DirectMessagesContainer>

      {isLoggedIn && !isEmpty(dmChannels) && (
        <ChatHeader>
          {!activeDmChannel && <div />}
          {activeDmChannel && (
            <BackButton onClick={() => setActiveDmChannel(null)}>
              <BackIcon name="angle-left" />
              <span
                className={classnames({ 'd-none': get(dmChannels, 'length', 0) !== 1 })}
              >
                {'Back to Chat'}
              </span>
            </BackButton>
          )}

          {`${userRole}`}

          <DirectMessagesDropdown
            currentUserId={stripPrefix(data.currentUser.id)}
            channels={dmChannels}
            selectedChannelId={activeDmChannel ? activeDmChannel.id : undefined}
            onSelect={setActiveDmChannel}
          />
        </ChatHeader>
      )}
    </ChatContainer>
  );
};

EventChat.propTypes = {
  channelId: PropTypes.string.isRequired,
};

EventChat.defaultProps = {};

export default EventChat;

import { isString, get } from 'lodash';

import StreamChatClient from './client';
import ChatRoles from './chatRoles';

function channelIncludesUser(channel, userId) {
  return Object.keys(get(channel, 'state.members', {})).includes(userId);
}

function getRoleFromMembership(channel) {
  const role = get(channel, 'state.membership.role');

  if (!role) {
    return ChatRoles.GUEST;
  }

  // ⚠️ Warning
  // There is an assumption that stream's role names will map 1:1
  // with the ones we use in our graphql API's enum.
  // i.e. "moderator" in Stream is "MODERATOR" in our API.
  return ChatRoles[role.toUpperCase()];
}

function getStreamUser(user) {
  return {
    id: user.id.split(':')[1],
    name: `${user.profile.firstName} ${user.profile.lastName}`,
    image: get(user, 'profile.photo.uri', ''),
  };
}

async function getUserDirectMessageChannels() {
  const currentUserId = get(StreamChatClient, 'user.id');
  console.log('[rkd] getUserDirectMessageChannels() currentUserId:', currentUserId);

  if (currentUserId) {
    const filter = {
      type: 'messaging',
      members: { $in: [currentUserId] },
    };
    const sort = { last_message_at: -1 };
    const options = { limit: 30 };

    const dmChannelsResponse = await StreamChatClient.queryChannels(
      filter,
      sort,
      options
    );
    console.log('[rkd] ---> dmChannelsResponse:', dmChannelsResponse);
    return dmChannelsResponse;
  }

  return [];
}

function stripPrefix(string) {
  if (!isString) {
    return string;
  }

  return string.split(':')[1];
}

export default {
  channelIncludesUser,
  getRoleFromMembership,
  getStreamUser,
  getUserDirectMessageChannels,
  stripPrefix,
};

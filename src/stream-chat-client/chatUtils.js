import { isString, get, isEmpty } from 'lodash';
import moment from 'moment';

import StreamChatClient from './client';
import ChatRoles from './chatRoles';

function stripPrefix(string) {
  if (!isString(string)) {
    return undefined;
  }

  return string.split(':')[1];
}

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
    id: stripPrefix(user.id),
    name: `${user.profile.firstName} ${user.profile.lastName}`,
    image: get(user, 'profile.photo.uri', ''),
  };
}

async function getUserDmChannels() {
  const currentUserId = get(StreamChatClient, 'user.id');
  console.group('[rkd] 👥 getUserDmChannels() currentUserId:', currentUserId);

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
    console.groupEnd();
    return dmChannelsResponse;
  }

  return [];
}

function filterRecentDmChannels(channels) {
  if (isEmpty(channels)) {
    return channels;
  }

  const recentDate = moment().subtract(12, 'minutes');
  return channels.filter(
    (channel) => !!moment(get(channel, 'state.last_message_at')).isAfter(recentDate)
  );
}

export default {
  stripPrefix,
  channelIncludesUser,
  getRoleFromMembership,
  getStreamUser,
  getUserDmChannels,
  filterRecentDmChannels,
};

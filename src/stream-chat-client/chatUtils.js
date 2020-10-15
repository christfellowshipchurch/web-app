import { isString, get, isEmpty } from 'lodash';
import moment from 'moment';

import StreamChatClient from './client';
import ChatRoles from './chatRoles';

// :: General
export function stripPrefix(string) {
  if (!isString(string)) {
    return undefined;
  }

  return string.split(':')[1];
}

// User
export function getStreamUser(user) {
  return {
    id: stripPrefix(user.id),
    name: `${user.profile.firstName} ${user.profile.lastName}`,
    image: get(user, 'profile.photo.uri', ''),
  };
}

export function getRoleFromMembership(channel) {
  const role = get(channel, 'state.user.role');
  const membership = get(channel, 'state.membership.user.role');

  if (!(role || membership)) {
    return ChatRoles.GUEST;
  }

  // ⚠️ Warning
  // There is an assumption that stream's role names will map 1:1
  // with the ones we use in our graphql API enum.
  // i.e. "moderator" in Stream is "MODERATOR" in our API.
  return ChatRoles[(role || membership).toUpperCase()];
}

// :: Channel
export function getChannelById(channels, channelId) {
  return channels.find((channel) => channel.cid === channelId);
}

export function channelIncludesUser(channel, userId) {
  return Object.keys(get(channel, 'state.members', {})).includes(userId);
}

export function getChannelUnreadCount(channel, userId) {
  return get(channel, `state.read[${userId}].unread_messages`, 0);
}

export function getOtherUser(channel, currentUserId) {
  const otherUser = Object.values(get(channel, 'state.members', [])).find(
    (member) => member.user.id !== currentUserId
  );

  return otherUser || null;
}

// :: Direct Messages
export async function getUserDmChannels() {
  const currentUserId = get(StreamChatClient, 'user.id');

  if (currentUserId) {
    const filter = {
      type: 'messaging',
      members: { $in: [currentUserId] },
    };
    const sort = { last_message_at: -1 };
    const options = { limit: 30 };

    return StreamChatClient.queryChannels(filter, sort, options);
  }

  return [];
}

export function filterRecentDmChannels(channels) {
  if (isEmpty(channels)) {
    return channels;
  }

  // This is where we define what "recent" means for direct messages
  const recentDate = moment().subtract(12, 'hours');
  return channels.filter(
    (channel) => !!moment(get(channel, 'state.last_message_at')).isAfter(recentDate)
  );
}

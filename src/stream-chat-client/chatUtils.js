import { isString, get } from 'lodash';

import ChatRoles from './chatRoles';

function getStreamUser(user) {
  return {
    id: user.id.split(':')[1],
    name: `${user.profile.firstName} ${user.profile.lastName}`,
    image: get(user, 'profile.photo.uri', ''),
  };
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

function stripPrefix(string) {
  if (!isString) {
    return string;
  }

  return string.split(':')[1];
}

export default {
  getStreamUser,
  getRoleFromMembership,
  stripPrefix,
};

import { get } from 'lodash';

import { ChatRoles } from 'stream-chat-client';

/**
 * Used to decide what action sheet options are available on a message, given
 * a bunch of factors like if it's a users' own message, their role, etc.
 * These input args are a subset of the <Message> component props, mostly
 * provided under-the-hood via Stream.io context.
 */
export default function getMessageActionOptions({
  channel,
  message,
  isMyMessage,
  userRole,
  onInitiateDm,
  handleDelete,
  handleFlag,
  handleMute,
}) {
  const isModerator = userRole === ChatRoles.MODERATOR;
  const isMine = isMyMessage();
  const showSendDirectMessage = isModerator && !isMine && !!onInitiateDm;

  return [
    {
      label: 'Send a Direct Message',
      showWhen: showSendDirectMessage,
      callback: () => {
        onInitiateDm(message.user.id);
      },
    },
    {
      divider: true,
      showWhen: showSendDirectMessage,
    },
    {
      label: 'Flag Message',
      showWhen: !isMine,
      callback: handleFlag,
    },
    {
      label: 'Mute Person',
      showWhen: !isMine,
      callback: handleMute,
    },
    {
      label: 'Delete Message',
      showWhen: isMine || isModerator,
      destructive: true,
      callback: handleDelete,
    },
    {
      label: 'Ban Person',
      showWhen: !isMine && isModerator,
      destructive: true,
      callback: async () => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Are you sure you want to ban this user for 2 hours?')) {
          await channel.banUser(message.user.id, {
            timeout: 120,
          });
        }
      },
    },
  ].filter((option) => get(option, 'showWhen', true));
}

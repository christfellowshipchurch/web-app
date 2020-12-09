import { useEffect } from 'react';

import { useAuth } from 'auth';
import { useInteraction } from 'hooks';

export default function useLiveStreamInteractions(eventId) {
  const { isLoggedIn } = useAuth();

  // Interactions
  const [joinLiveStreamInteraction] = useInteraction({
    nodeId: eventId,
    action: 'LIVESTREAM_JOINED',
  });
  const [closeLiveStreamInteraction] = useInteraction({
    nodeId: eventId,
    action: 'LIVESTREAM_CLOSED',
  });

  useEffect(() => {
    if (!isLoggedIn) return;

    joinLiveStreamInteraction();
    window.addEventListener('beforeunload', closeLiveStreamInteraction, false);

    return () => {
      closeLiveStreamInteraction();
      window.removeEventListener('beforeunload', closeLiveStreamInteraction, false);
    };
  }, [isLoggedIn]);
}

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
    console.log('[rkd] ** logged in effect');

    if (!isLoggedIn) return;

    console.log('[rkd] ✅ Logged In >>');
    joinLiveStreamInteraction();
    window.addEventListener('beforeunload', closeLiveStreamInteraction, false);

    return () => {
      closeLiveStreamInteraction();
      window.removeEventListener('beforeunload', closeLiveStreamInteraction, false);
    };
  }, [isLoggedIn]);
}

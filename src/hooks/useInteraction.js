import { useMutation } from 'react-apollo';
import gql from 'graphql-tag';

const INTERACTION_MUTATION = gql`
  mutation($nodeId: ID!, $action: InteractionAction!) {
    interactWithNode(nodeId: $nodeId, action: $action) {
      success
    }
  }
`;

/**
 * Hook to allow simpler dispatching of interactions. Can provide an optional set of base variables
 * to pre-populate mutation calls with.
 * @param {Object} baseVariables (Optional)
 * @example
 * const [sendInteraction] = useInteraction();
 * sendInteraction({ nodeId: 'SomeContentItem:xyz456', action: 'A_RANDOM_INTERACTION' });
 * @example
 * const [interactWithEvent] = useInteraction({ nodeId: 'Event:abc123' });
 * interactWithEvent({ action: 'SOME_EVENT_INTERACTION' });
 * @example
 * const [joinEvent] = useInteraction({ nodeId: 'Event:def777', action: 'ANOTHER_INTERACTION' });
 * joinEvent();
 */
export default function useInteraction(baseVariables) {
  const [mutation, metaData] = useMutation(INTERACTION_MUTATION);

  const sendInteraction = baseVariables
    ? (variables = {}) => {
        return mutation({ variables: { ...baseVariables, ...variables } });
      }
    : mutation;

  return [sendInteraction, metaData];
}

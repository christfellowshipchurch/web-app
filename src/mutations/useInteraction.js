import { useMutation } from 'react-apollo';
import gql from 'graphql-tag';

const SEND_INTERACTION = gql`
  mutation InteractWithNode($nodeId: ID!, $action: InteractionAction!) {
    interactWithNode(nodeId: $nodeId, action: $action) {
      success
      node {
        id
      }
    }
  }
`;

export default function useInteraction(options = {}) {
  return useMutation(SEND_INTERACTION, options);
}

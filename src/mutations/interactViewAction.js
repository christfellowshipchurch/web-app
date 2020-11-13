import gql from 'graphql-tag';

const VIEW_ACTION = gql`
  mutation($nodeId: ID!) {
    interactWithNode(nodeId: $nodeId, action: VIEWED_ACTION) {
      success
      node {
        id
      }
    }
  }
`;

export default VIEW_ACTION;

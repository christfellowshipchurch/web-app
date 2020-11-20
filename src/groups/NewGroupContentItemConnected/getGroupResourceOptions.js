import gql from 'graphql-tag';

export default gql`
  query groupResourceOptions {
    groupResourceOptions {
      id
      title
    }
  }
`;

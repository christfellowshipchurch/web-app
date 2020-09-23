import gql from 'graphql-tag';

export default gql`
  mutation addAttendance($id: ID!) {
    checkInCurrentUser(id: $id) {
      id
    }
  }
`;

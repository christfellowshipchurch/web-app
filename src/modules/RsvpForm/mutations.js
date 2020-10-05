import gql from 'graphql-tag';

export const SUBMIT_RSVP = gql`
  mutation submitRsvp(
    $firstName: String!
    $lastName: String!
    $campus: String!
    $visitDate: String!
    $visitTime: String!
    $email: String!
  ) {
    submitRsvp(
      input: [
        { field: "firstName", value: $firstName }
        { field: "lastName", value: $lastName }
        { field: "campus", value: $campus }
        { field: "visitDate", value: $visitDate }
        { field: "visitTime", value: $visitTime }
        { field: "email", value: $email }
      ]
    )
  }
`;

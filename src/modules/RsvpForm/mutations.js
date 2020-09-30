import gql from 'graphql-tag';

export const SUBMIT_RSVP = gql`
  mutation submitRsvp(
    $firstName: String!
    $lastName: String!
    $adults: String!
    $children: String!
    $campus: String!
    $visitDate: String!
    $visitTime: String!
    $email: String!
  ) {
    submitRsvp(
      input: [
        { field: "firstName", value: $firstName }
        { field: "lastName", value: $lastName }
        { field: "adults", value: $adults }
        { field: "children", value: $children }
        { field: "campus", value: $campus }
        { field: "visitDate", value: $visitDate }
        { field: "visitTime", value: $visitTime }
        { field: "email", value: $email }
      ]
    )
  }
`;

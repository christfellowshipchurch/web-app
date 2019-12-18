import gql from 'graphql-tag'

export const SUBMIT_EMAIL_CAPTURE = gql`
    mutation submitEmailCapture(
        $firstName:String!, 
        $lastName:String!, 
        $email:String!
    ) {
        submitEmailCapture(input: [
            { field: "firstName", value: $firstName },
            { field: "lastName", value: $lastName },
            { field: "email", value: $email },
        ])
    }
`

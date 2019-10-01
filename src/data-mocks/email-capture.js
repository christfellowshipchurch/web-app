import { SUBMIT_EMAIL_CAPTURE } from '../components/features/EmailCapture/mutations'

export const EMAIL_CAPTURE_MOCKS = {
    request: {
        query: SUBMIT_EMAIL_CAPTURE,
        variables: {
            fistName: 'John',
            lastName: 'Smith',
            email: 'john.smith@email.com'
        }
    },
    result: {
        data: {
            submitEmailCapture: "Completed"
        },
    },
}

export const EMAIL_CAPTURE_ERROR = {
    request: {
        query: SUBMIT_EMAIL_CAPTURE,
    },
    error: new Error("Error submitting the Email Capture Form")
}
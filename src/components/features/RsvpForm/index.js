import React from 'react'
import { useMutation } from 'react-apollo'
import { Formik } from 'formik'
import * as Yup from 'yup'
import AwesomePhoneNumber from 'awesome-phonenumber'
import {
    get,
    filter,
    has,
    keys
} from 'lodash'
import { Button } from '../../../ui'
import { ContactForm, DemographicForm, VisitForm } from './fragments'

import { SUBMIT_RSVP } from './mutations'

const DO_NOT_SHOW_ERROR = '!! DO NOT SHOW THIS ERROR !!'

const Rsvp = (props) => {
    const {
        errors,
        formTitle,
        formDescription,
        formAdditionalText1,
        formAdditionalText2,
        setSubmitting,
        values,
        submitting
    } = props

    const [submitRsvp, { data, loading, error }] = useMutation(SUBMIT_RSVP)
    const filteredErrors = filter(errors, (n) => n !== DO_NOT_SHOW_ERROR)
    const emptyStrings = filter(values, n => n === '')

    const disabled = keys(errors).length > 0
        || emptyStrings.length > 0
        || submitting
        || loading

    // Form submission successful
    if (get(data, 'submitRsvp', '') === "Completed") {
        return (
            <div className="text-success text-center">
                <h3>
                    We can't wait to see you!
                </h3>
                <small>
                    Check your email for more information
                </small>
            </div>
        )

    }

    // Form submission unsuccessful
    if ((has(data, 'submitRsvp') && data.submitRsvp !== "Completed") || error) {
        return (
            <div className="text-danger text-center">
                <h3>
                    There was an error submitting your information.
                </h3>
                <small>
                    Please try again
                </small>
            </div>
        )
    }

    return (
        <div className="container">
            {/* Demographic Information */}
            <div className="row my-4">
                <div className="col text-center">
                    <h2>
                        {formTitle}
                    </h2>
                    <p className="text-dark">
                        {formDescription}
                    </p>
                </div>
            </div>
            <DemographicForm
                {...props}
                errors={filteredErrors}
                loading={loading || submitting}
            />

            {/* Visit Information */}
            <div className="row mt-6">
                <div className="col text-left">
                    <p className="text-dark">
                        {formAdditionalText1}
                    </p>
                </div>
            </div>
            <VisitForm
                {...props}
                errors={filteredErrors}
                loading={loading || submitting}
            />

            {/* Contact Information */}
            <div className="row mt-6">
                <div className="col text-left">
                    <p className="text-dark">
                        {formAdditionalText2}
                    </p>
                </div>
            </div>
            <ContactForm
                {...props}
                errors={filteredErrors}
                loading={loading || submitting}
            />

            {/* Submit */}
            <div className="row my-6">
                <div className="col text-center">
                    <Button
                        title={`Submit`}
                        disabled={disabled}
                        loading={submitting || loading}
                        onClick={() => submitRsvp({ variables: values })}
                    />
                </div>
            </div>
        </div>
    )
}

Rsvp.defaultProps = {
    formTitle: "RSVP",
    formDescription: "Enter your details and one of our team will meet you before the service, grab you a coffee, give you a personalized tour of the facility, save you a seat, and help you however they can.",
    formAdditionalText1: "You’ll be visiting us at:",
    formAdditionalText2: "We’d like to send you a reminder with driving directions, and confirmation of your visit. Please provide the following:"
}

const RsvpForm = ({ initialValues }) => <Formik
    initialValues={{
        firstName: get(initialValues, 'firstName', ''),
        lastName: get(initialValues, 'lastName', ''),
        adults: get(initialValues, 'adults', 1),
        children: get(initialValues, 'children', 0),

        campus: get(initialValues, 'campus', ''),
        visitDate: get(initialValues, 'visitDate', ''),
        visitTime: get(initialValues, 'visitTime', ''),

        email: get(initialValues, 'email', ''),
        phoneNumber: get(initialValues, 'phoneNumber', ''),
    }}
    validationSchema={Yup.object().shape({
        firstName: Yup.string()
            .required(DO_NOT_SHOW_ERROR),
        lastName: Yup.string()
            .required(DO_NOT_SHOW_ERROR),
        adults: Yup.number()
            .min(1, 'Please make sure you have at least 1 adult registered')
            .required(DO_NOT_SHOW_ERROR),
        children: Yup.number()
            .required(DO_NOT_SHOW_ERROR),

        campus: Yup.string()
            .required(DO_NOT_SHOW_ERROR),
        visitDate: Yup.string()
            .required(DO_NOT_SHOW_ERROR),
        visitTime: Yup.string()
            .required(DO_NOT_SHOW_ERROR),

        email: Yup.string()
            .email('Please make sure you entered a valid email address')
            .required(DO_NOT_SHOW_ERROR),
        phoneNumber: Yup.string()
            .test(
                'phoneNumber',
                'Please make sure you entered a valid phone number',
                (value) => {
                    if (value) {
                        const phoneNumber = new AwesomePhoneNumber(`+1 ${value}`)

                        return phoneNumber.isValid()
                    }

                    return true
                }
            )
            .required(DO_NOT_SHOW_ERROR)
    })}
    render={props => <Rsvp {...props} />}
/>

export default RsvpForm
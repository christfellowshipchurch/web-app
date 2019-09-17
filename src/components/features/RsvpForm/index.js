import React, { useState } from 'react'
import { useQuery } from 'react-apollo'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import AwesomePhoneNumber from 'awesome-phonenumber'
import { get, has } from 'lodash'
import {
    faUser,
    faUsers,
    faEnvelope,
    faChurch,
    faCalendarAlt,
    faClock,
    faPhone
} from '@fortawesome/fontawesome-pro-light'
import {
    faBabyCarriage
} from '@fortawesome/free-solid-svg-icons'
import { TextInput, Button, Loader } from '@christfellowshipchurch/web-ui-kit'

import { GET_CAMPUSES } from './queries'

const checkEmptyString = (obj, key) => get(obj, key, '') === ''

const Rsvp = ({
    errors,
    setFieldValue,
    values,
    onSubmit,
    formTitle,
    formDescription,
    formAdditionalText1,
    formAdditionalText2
}) => {
    const { loading, error, data } = useQuery(GET_CAMPUSES)

    if (loading) return (
        <div style={{ width: 200 }}>
            <Loader />
        </div>
    )
    if (error) {
        console.log({ error })
        return (
            <h2 className="text-danger text-center">
                There was an error. Try reloading
            </h2>
        )
    }

    const hasError = false

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
            <div className="row my-4">
                <div className="col">
                    <TextInput
                        label="First Name"
                        onChange={(e) => setFieldValue('firstName', get(e, 'target.value', ''))}
                        icon={faUser}
                    />
                </div>
            </div>
            <div className="row my-4">
                <div className="col">
                    <TextInput
                        label="Last Name"
                        onChange={(e) => setFieldValue('lastName', get(e, 'target.value', ''))}
                        icon={faUser}
                    />
                </div>
            </div>
            <div className="row my-4">
                <div className="col">
                    <TextInput
                        label="Number of Adults Attending"
                        onChange={(e) => setFieldValue('adults', get(e, 'target.value', ''))}
                        icon={faUsers}
                        type="number"
                    />
                </div>
            </div>
            <div className="row my-4">
                <div className="col">
                    <TextInput
                        label="Number of Children Attending"
                        onChange={(e) => setFieldValue('children', get(e, 'target.value', ''))}
                        icon={faBabyCarriage}
                        type="number"
                    />
                </div>
            </div>

            {/* Visit Information */}
            <div className="row mt-6">
                <div className="col text-left">
                    <p className="text-dark">
                        {formAdditionalText1}
                    </p>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col">
                    <TextInput
                        label="Palm Beach Gardens"
                        icon={faChurch}
                        onChange={(e) => setFieldValue('campus', get(e, 'target.value', ''))}
                        error={has(values, 'campus') && has(errors, 'campus') ? get(errors, 'campus', null) : null}
                    />
                </div>
            </div>
            <div className="row mb-4">
                <div className="col">
                    <TextInput
                        label="Sunday, Nov 12"
                        icon={faCalendarAlt}
                        onChange={(e) => setFieldValue('visitDate', get(e, 'target.value', ''))}
                        error={has(values, 'visitDate') && has(errors, 'visitDate') ? get(errors, 'visitDate', null) : null}
                    />
                </div>
            </div>
            <div className="row mb-4">
                <div className="col">
                    <TextInput
                        label="10AM"
                        icon={faClock}
                        onChange={(e) => setFieldValue('visitTime', get(e, 'target.value', ''))}
                        error={has(values, 'visitTime') && has(errors, 'visitTime') ? get(errors, 'visitTime', null) : null}
                    />
                </div>
            </div>

            {/* Contact Information */}
            <div className="row mt-6">
                <div className="col text-left">
                    <p className="text-dark">
                        {formAdditionalText2}
                    </p>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col">
                    <TextInput
                        label="Email Address"
                        icon={faEnvelope}
                        onChange={(e) => setFieldValue('email', get(e, 'target.value', ''))}
                        error={has(values, 'email') && has(errors, 'email') ? get(errors, 'email', null) : null}
                    />
                </div>
            </div>
            <div className="row mb-4">
                <div className="col">
                    <TextInput
                        label="Phone Number"
                        icon={faPhone}
                        onChange={(e) => setFieldValue('phoneNumber', get(e, 'target.value', ''))}
                        error={has(values, 'phoneNumber') && has(errors, 'phoneNumber') ? get(errors, 'phoneNumber', null) : null}
                    />
                </div>
            </div>

            {/* Submit */}
            <div className="row my-6">
                <div className="col text-center">
                    <Button
                        title={`Submit`}
                        disabled={hasError} />
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

const RsvpForm = withFormik({
    mapPropsToValues: () => ({
        firstName: '',
        lastName: '',
        adults: 0,
        children: 0,

        campus: '',
        visitDate: '',
        visitTime: '',

        email: '',
        phoneNumber: '',
    }),
    validationSchema: Yup.object().shape({
        firstName: Yup.string()
            .required(),
        lastName: Yup.string()
            .required(),
        adults: Yup.number()
            .min(1, 'Please make sure you have at least 1 adult registered')
            .required(),
        children: Yup.number()
            .positive('Input error. Make sure you input a positive number')
            .required(),

        campus: Yup.string()
            .required(),
        visitDate: Yup.date()
            .min(new Date())
            .required(),
        visitTime: Yup.string()
            .required(),

        email: Yup.string()
            .email('Please make sure you entered a valid email address')
            .required(),
        phoneNumber: Yup.string()
            .test(
                'phoneNumber',
                'Please make sure you entered a valid phone number',
                (value) => {
                    const phoneNumber = new AwesomePhoneNumber(value)

                    return phoneNumber.isValid()
                }
            )
            .required()
    })
})(Rsvp)

export default RsvpForm
import React from 'react'
import {
    get,
    has,
} from 'lodash'
import {
    faEnvelope,
    faPhone
} from '@fortawesome/fontawesome-pro-light'
import { TextInput } from '../../../ui'

const ContactForm = ({
    errors,
    setFieldValue,
    values,
    loading
}) => (
        <React.Fragment>
            <div className="row mb-4">
                <div className="col">
                    <TextInput
                        type="email"
                        disabled={loading}
                        label="Email Address"
                        icon={faEnvelope}
                        value={get(values, 'email', '')}
                        onChange={(e) => setFieldValue('email', get(e, 'target.value', ''))}
                        error={has(values, 'email') && has(errors, 'email') ? get(errors, 'email', null) : null}
                    />
                </div>
            </div>
            <div className="row mb-4">
                <div className="col">
                    <TextInput
                        type="phone"
                        disabled={loading}
                        label="Phone Number"
                        icon={faPhone}
                        value={get(values, 'phoneNumber', '')}
                        onChange={(e) => setFieldValue('phoneNumber', get(e, 'target.value', ''))}
                        error={has(values, 'phoneNumber') && has(errors, 'phoneNumber') ? get(errors, 'phoneNumber', null) : null}
                    />
                </div>
            </div>
        </React.Fragment>
    )


export default ContactForm
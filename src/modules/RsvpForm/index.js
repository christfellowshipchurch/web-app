import React from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-apollo';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { get, filter, has, keys } from 'lodash';
import { Button } from '../../ui';
import { ContactForm, DemographicForm, VisitForm } from './fragments';

import { SUBMIT_RSVP } from './mutations';

const DO_NOT_SHOW_ERROR = '!! DO NOT SHOW THIS ERROR !!';

const currentPage = window.location.href;

const Rsvp = (props) => {
  const {
    errors,
    formTitle,
    formDescription,
    formAdditionalText1,
    values,
    submitting,
  } = props;

  const [submitRsvp, { data, loading, error }] = useMutation(SUBMIT_RSVP);
  const filteredErrors = filter(errors, (n) => n !== DO_NOT_SHOW_ERROR);
  const emptyStrings = filter(values, (n) => n === '');

  const disabled =
    keys(errors).length > 0 || emptyStrings.length > 0 || submitting || loading;

  // Form submission successful
  if (get(data, 'submitRsvp', '') === 'Completed') {
    return (
      <div className="text-success text-center">
        <h3>We can't wait to see you!</h3>
        <p>Check your email for more information</p>
      </div>
    );
  }

  // Form submission unsuccessful
  if ((has(data, 'submitRsvp') && data.submitRsvp !== 'Completed') || error) {
    return (
      <div className="text-danger text-center">
        <h3>Oops!</h3>
        <h4 className="font-weight-normal p-3">
          It looks like there was an error submitting your information. Please make sure
          all the fields are filled in correctly.
        </h4>
        <a className="btn btn-primary" href={currentPage}>
          try again
        </a>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Demographic Information */}
      <div className="row my-4">
        <div className="col text-center">
          <h2>{formTitle}</h2>
          <p className="text-dark">{formDescription}</p>
        </div>
      </div>
      <DemographicForm
        {...props}
        errors={filteredErrors}
        loading={loading || submitting}
      />

      {/* Contact Information */}
      <ContactForm {...props} errors={filteredErrors} loading={loading || submitting} />

      {/* Visit Information */}
      <div className="row mt-6">
        <div className="col text-left">
          <p className="text-dark">{formAdditionalText1}</p>
        </div>
      </div>
      <VisitForm {...props} errors={filteredErrors} loading={loading || submitting} />

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
  );
};

Rsvp.propTypes = {
  formTitle: PropTypes.string,
  formDescription: PropTypes.string,
  formAdditionalText1: PropTypes.string,
  setSubmitting: PropTypes.func,
  values: PropTypes.objectOf(PropTypes.string),
  submitting: PropTypes.bool,
  errors: PropTypes.object,
};

Rsvp.defaultProps = {
  formTitle: 'RSVP',
  formDescription:
    'Enter your details and one of our team will meet you before the service, grab you a coffee, give you a personalized tour of the facility, save you a seat, and help you however they can.',
  formAdditionalText1: 'You’ll be visiting us at:',
};

const RsvpForm = ({ initialValues }) => (
  <Formik
    initialValues={{
      firstName: get(initialValues, 'firstName', ''),
      lastName: get(initialValues, 'lastName', ''),

      campus: get(initialValues, 'campus', ''),
      visitDate: get(initialValues, 'visitDate', ''),
      visitTime: get(initialValues, 'visitTime', ''),

      email: get(initialValues, 'email', ''),
    }}
    validationSchema={Yup.object().shape({
      firstName: Yup.string().required(DO_NOT_SHOW_ERROR),
      lastName: Yup.string().required(DO_NOT_SHOW_ERROR),

      campus: Yup.string().required(DO_NOT_SHOW_ERROR),
      visitDate: Yup.string().required(DO_NOT_SHOW_ERROR),
      visitTime: Yup.string().required(DO_NOT_SHOW_ERROR),

      email: Yup.string()
        .email('Please make sure you entered a valid email address')
        .required(DO_NOT_SHOW_ERROR),
    })}
    render={(props) => <Rsvp {...props} />}
  />
);

export default RsvpForm;

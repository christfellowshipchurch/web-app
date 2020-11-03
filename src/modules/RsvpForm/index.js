import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-apollo';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { get, filter, has, keys } from 'lodash';
import { Carousel } from 'react-bootstrap';
import { Button } from '../../ui';
import { Icon } from '../../ui/Icons';
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
  const [index, setIndex] = useState(0);
  const filteredErrors = filter(errors, (n) => n !== DO_NOT_SHOW_ERROR);
  const emptyStrings = filter(values, (n) => n === '');

  const disabled =
    keys(errors).length > 0 || emptyStrings.length > 0 || submitting || loading;

  // Form submission successful
  if (get(data, 'submitRsvp', '') === 'Completed') {
    return (
      <div className="text-success text-center">
        <h3>Thank you!</h3>
        <p>
          Your reminder has been set. Be sure to check your email for all the information
          you’ll need prior to your visit here at Christ Fellowship. We look forward to
          seeing you soon!
        </p>
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

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="container">
      <div className="text-center">
        <h4 className="mb-0 mt-3">
          <span className="badge badge-secondary">{`Step ${index + 1} of 2`}</span>
        </h4>
      </div>
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        controls={false}
        indicators={false}
        interval={null}
        touch={false}
      >
        <Carousel.Item>
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
          <ContactForm
            {...props}
            errors={filteredErrors}
            loading={loading || submitting}
          />
          <div className="row my-6">
            <div className="col text-center">
              <Button title="Next" onClick={() => handleSelect(1)} />
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          {/* Visit Information */}
          <div className="my-3">
            <Icon name="angle-left" fill="#00aeef" />
            <Button
              title="Back"
              type="link"
              onClick={() => handleSelect(0)}
              className="pl-0 ml-0"
            />
          </div>
          <div className="row mt-2">
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
        </Carousel.Item>
      </Carousel>
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
  formTitle: 'Set a Reminder',
  formDescription:
    'Enter your details below to set a reminder and we will send you an email with all the information you’ll need prior to your visit here at Christ Fellowship.',
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

import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import { act, render, fireEvent } from '@testing-library/react';
import wait from 'waait';

import { Features } from '../../../../data-mocks';
import EmailCaptureForm from '..';

const { EMAIL_CAPTURE_MOCKS, EMAIL_CAPTURE_ERROR } = Features;
let component = null;

describe('EmailCaptureForm', () => {
  it('renders without crashing', () => {
    act(() => {
      render(
        <MockedProvider mocks={[EMAIL_CAPTURE_MOCKS]} addTypename={false}>
          <EmailCaptureForm />
        </MockedProvider>
      );
    });
  });

  it('triggers mutation with a status of Completed', async () => {
    act(() => {
      component = render(
        <MockedProvider mocks={[EMAIL_CAPTURE_MOCKS]} addTypename={false}>
          <EmailCaptureForm />
        </MockedProvider>
      );

      const { getByLabelText, getByText } = component;

      const firstNameInput = getByLabelText('First Name');
      fireEvent.change(firstNameInput, { target: { value: 'John' } });
      expect(firstNameInput.value).toBe('John');

      const lastNameInput = getByLabelText('Last Name');
      fireEvent.change(lastNameInput, { target: { value: 'Smith' } });
      expect(lastNameInput.value).toBe('Smith');

      const emailInput = getByLabelText('Email Address');
      fireEvent.change(emailInput, { target: { value: 'john.smith@email.com' } });
      expect(emailInput.value).toBe('john.smith@email.com');

      const submitButton = getByText('Send this to me');
      fireEvent.click(submitButton);
    });

    await wait(0); // wait for response

    const { container, getByText } = component;

    expect(getByText("You're all set! Check your email soon.")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});

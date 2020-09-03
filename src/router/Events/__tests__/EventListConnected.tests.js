import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { MockedProvider } from '@apollo/react-testing';
import { act, render } from '@testing-library/react';
import wait from 'waait';

import { Events } from '../../../data-mocks';
import { AuthProvider } from '../../../auth';
import EventListConnected from '../EventListConnected';

const { EVENT_LIST_MOCK, EVENT_LIST_ERROR } = Events;

let component = null;

describe('EventListConnected', () => {
  it('renders a collection of events', async () => {
    act(() => {
      component = render(
        <MockedProvider mocks={[EVENT_LIST_MOCK]} addTypename={false}>
          <EventListConnected />
        </MockedProvider>
      );
    });

    await wait(0); // waits for response

    const { container } = component;
    expect(container).toMatchSnapshot();
  });

  // Loading States
  it('renders the loading state', () => {
    act(() => {
      component = render(
        <MockedProvider mocks={[]}>
          <AuthProvider>
            <EventListConnected />
          </AuthProvider>
        </MockedProvider>
      );
    });

    const { container } = component;
    expect(container).toMatchSnapshot();
  });

  it('renders the error state', async () => {
    act(() => {
      component = render(
        <MockedProvider mocks={[EVENT_LIST_ERROR]}>
          <AuthProvider>
            <EventListConnected />
          </AuthProvider>
        </MockedProvider>
      );
    });

    await wait(0); // waits for response

    const { container } = component;
    expect(container).toMatchSnapshot();
  });
});

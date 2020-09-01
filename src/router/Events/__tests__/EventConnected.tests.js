import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { MockedProvider } from '@apollo/react-testing';
import { act, render } from '@testing-library/react';
import wait from 'waait';

import { Events, CardFeed } from '../../../data-mocks';
import { AuthProvider } from '../../../auth';
import EventConnected from '../EventConnected';

const { EVENT_MOCK, EVENT_ERROR, CURRENT_USER_CAMPUS, EVENT_LIST_MOCK } = Events;
const { SIBLING_ITEM_FEED_MOCK } = CardFeed;

let component = null;

describe('EventConnected', () => {
  it('renders without crashing', () => {
    act(() => {
      render(
        <MockedProvider
          mocks={[EVENT_MOCK, SIBLING_ITEM_FEED_MOCK, CURRENT_USER_CAMPUS]}
          addTypename={false}
        >
          <AuthProvider>
            <EventConnected title="vision-weekend" />
          </AuthProvider>
        </MockedProvider>
      );
    });
  });

  it('renders an event', async () => {
    act(() => {
      component = render(
        <MockedProvider
          mocks={[EVENT_MOCK, SIBLING_ITEM_FEED_MOCK, CURRENT_USER_CAMPUS]}
          addTypename={false}
        >
          <AuthProvider>
            <EventConnected title="vision-weekend" />
          </AuthProvider>
        </MockedProvider>
      );
    });

    await wait(0); // waits for response

    const { container } = component;
    expect(container).toMatchSnapshot();
  });

  it('redirects to /events when no event is found', async () => {
    act(() => {
      component = render(
        <MockedProvider
          mocks={[
            {
              request: EVENT_MOCK.request,
              results: {
                data: {},
              },
            },
            SIBLING_ITEM_FEED_MOCK,
            CURRENT_USER_CAMPUS,
            EVENT_LIST_MOCK,
          ]}
          addTypename={false}
        >
          <AuthProvider>
            <EventConnected title="vision-weekend" />
          </AuthProvider>
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
            <EventConnected title="vision-weekend" />
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
        <MockedProvider mocks={[EVENT_ERROR]}>
          <AuthProvider>
            <EventConnected title="vision-weekend" />
          </AuthProvider>
        </MockedProvider>
      );
    });

    await wait(0); // waits for response

    const { container } = component;
    expect(container).toMatchSnapshot();
  });
});

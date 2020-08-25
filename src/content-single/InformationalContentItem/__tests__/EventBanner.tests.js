import React from 'react';
import { act, render } from '@testing-library/react';
import wait from 'waait';

import EventBanner from '../EventBanner';
import { Events } from '../../data-mocks';

const { TEST_EVENT_JSON } = Events;

let component = null;

describe('EventBanner', () => {
  it('renders an Event Banner image', async () => {
    component = render(<EventBanner {...TEST_EVENT_JSON} />);

    const { container } = component;
    expect(container).toMatchSnapshot();
  });
});

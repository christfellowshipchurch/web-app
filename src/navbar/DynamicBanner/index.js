import React, { useState } from 'react';
import { useQuery } from 'react-apollo';
import { get } from 'lodash';
import classnames from 'classnames';
import { Times } from '../../ui/Icons';

import { GET_BANNER } from './queries';

const LiveBanner = () => {
  const [closed, isClosed] = useState(false);

  const { loading, error, data } = useQuery(GET_BANNER, {
    fetchPolicy: 'network-only',
  });
  const call = get(data, 'websiteBanner.call', '');
  const action = get(data, 'websiteBanner.action', '');

  if (loading || error || !call || !action || call === '' || action === '') return null;

  return (
    <div
      className={classnames(
        'w-100',
        'justify-content-start',
        'justify-content-md-center',
        'align-items-center',
        'p-2',
        'bg-primary',
        {
          'd-none': closed,
          'd-flex': !closed,
        }
      )}
    >
      <a className={classnames('h4', 'mb-0', 'text-white')} href={action} target="_blank">
        {call}
      </a>
      <div
        style={{
          fontSize: '20px',
          position: 'absolute',
          right: 10,
        }}
      >
        <span onClick={() => isClosed(true)}>
          <Times fill="white" />
        </span>
      </div>
    </div>
  );
};

export default LiveBanner;

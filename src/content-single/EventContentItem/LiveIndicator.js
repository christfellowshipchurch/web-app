import React from 'react';
import classnames from 'classnames';
import { Icon } from '../../ui/Icons';

const LiveIndicator = () => (
  <div className={classnames('mb-2', 'd-flex', 'align-items-center')}>
    <Icon
      className={classnames('d-flex', 'align-items-center')}
      name="live-dot"
      fill="#cb045b"
      size={8}
    />
    <h4
      className={classnames('text-danger', 'text-left', 'text-uppercase', 'mb-0', 'ml-2')}
    >
      live now
    </h4>
  </div>
);

export default LiveIndicator;

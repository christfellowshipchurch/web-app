import React from 'react';
import PropTypes from 'prop-types';

import { Share } from 'ui';

import LiveIndicator from './LiveIndicator';

const EventDetail = ({ title, summary, isLive }) => (
  <div className="row  pt-2 pt-md-3 px-1 pl-lg-2 pl-xl-0">
    {(title !== '' || summary !== '') && (
      <div className="col-12">
        {isLive && <LiveIndicator />}

        <div className="w-100">
          <h1 className="my-2 text-dark">{title}</h1>
          <h3 className="mt-1 content-subtitle font-weight-light">{summary}</h3>
        </div>
      </div>
    )}

    <div className="col-12 mt-2">
      <div className="d-flex flex-grow-1 justify-content-end">
        <Share shareTitle="Invite" title={title} variant={'outline-dark'} />
      </div>
    </div>
  </div>
);

EventDetail.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  summary: PropTypes.string,
  isLive: PropTypes.bool,
};

EventDetail.defaultProps = {
  isLive: false,
};

export default EventDetail;

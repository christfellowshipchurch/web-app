import React from 'react';
import PropTypes from 'prop-types';

import { Share } from 'ui';

import LiveIndicator from './LiveIndicator';

const EventDetail = ({ title, summary, isLive }) => (
  <div className="pr-3">
    <div className="container">
      {(title !== '' || summary !== '') && (
        <div className="row mt-3 pl-3">
          {isLive && <LiveIndicator />}

          <div className="col-12">
            <h1 className="mt-2 mb-2 text-dark">{title}</h1>
            <h3 className="mt-1 content-subtitle font-weight-light">{summary}</h3>
          </div>
        </div>
      )}

      <div className="row pl-3 flex-grow-1 mt-2 justify-content-end">
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

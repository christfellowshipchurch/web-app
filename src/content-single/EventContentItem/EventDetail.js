import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { Card, Share } from 'ui';

import { htmlToReactParser } from 'utils';

import EventGroupings from './EventGroupings';
import LiveIndicator from './components/LiveIndicator';

const EventDetail = ({ id, title, summary, htmlContent, tags, isLive }) => (
  <div className={classnames('container-fluid', 'mb-4', 'px-3')}>
    {(title !== '' || summary !== '') && (
      <div
        className={classnames(
          'd-md-flex',
          'justify-content-between',
          'align-items-center',
          'pb-3'
        )}
      >
        <div className="mt-4 mb-2 pb-2">
          <LiveIndicator isLive={isLive} />
          <h1 className="mb-2 text-dark">{title}</h1>
          <h3 className="mt-1 content-subtitle font-weight-light">{summary}</h3>
        </div>
        <Share shareTitle="Invite" title={title} variant={'outline-dark'} />
      </div>
    )}

    <div className="row mx-n2">
      <EventGroupings contentId={id} />

      <div className="col-12 col-lg-8 px-2">
        <Card>
          <div className="">{htmlToReactParser.parse(htmlContent)}</div>

          <div className="mx-n1">
            {tags.map((n, i) => (
              <span
                key={i}
                className={classnames(
                  'badge',
                  'badge-light',
                  'font-weight-normal',
                  'py-2',
                  'px-3',
                  'mx-1'
                )}
              >
                {n}
              </span>
            ))}
          </div>
        </Card>
      </div>
    </div>
  </div>
);

EventDetail.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  summary: PropTypes.string,
  htmlContent: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  isLive: PropTypes.bool,
};

EventDetail.defaultProps = {
  id: '',
  title: '',
  summary: '',
  htmlContent: '',
  tags: [],
  isLive: false,
};

export default EventDetail;

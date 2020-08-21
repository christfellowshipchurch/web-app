import React from 'react';
import classnames from 'classnames';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import Banner from '../../content-single/Banner';

const GroupContentItem = ({
  coverImage, date, title, videoCall,
}) => (
  <>
    <Banner coverImage={coverImage} shareTitle="Invite" title={title} />
    <div className="container-fluid mb-4 px-3">
      {title && (
        <div
          className={classnames(
            'd-md-flex',
            'justify-content-between',
            'align-items-center',
            'pb-3',
          )}
        >
          <div className="mt-4 mb-2 pb-2">
            <h1 className="mb-2 text-dark">{title}</h1>
            <h3 className="mt-1 content-subtitle font-weight-light">{date}</h3>
          </div>
        </div>
      )}
      {get(videoCall, 'link') && (
        <a className="btn btn-primary btn-block my-3" href={get(videoCall, 'link')} target="_blank">
          Join Meeting
        </a>
      )}
      {/* <Detail {...content} isLive={isLive} /> */}
    </div>
  </>
);

GroupContentItem.propTypes = {
  coverImage: PropTypes.shape({
    name: PropTypes.string,
    sources: PropTypes.arrayOf(PropTypes.shape({ uri: PropTypes.string })),
  }),
  date: PropTypes.string,
  title: PropTypes.string,
  videoCall: PropTypes.shape({
    link: PropTypes.string,
    meetingId: PropTypes.string,
    passcode: PropTypes.string,
  }),
};

GroupContentItem.defaultProps = {};

export default GroupContentItem;

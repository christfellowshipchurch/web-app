import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Media } from '../../ui';
import { bookImage, onlineIcon, contactIcon, homeIcon, sermonIcon } from './images';

const ErrorLink = ({ icon, call, action }) => (
  <div className={classnames('row', 'mt-3', 'd-flex', 'align-items-center')}>
    <img
      src={icon}
      style={{
        height: 40,
        width: 'auto',
      }}
    />
    <a href={action}>
      <h4 className="mb-0 pl-2">{call}</h4>
    </a>
  </div>
);

const ErrorBlock = ({}) => {
  return (
    <div
      className={classnames(
        'container',
        'd-flex',
        'flex-column',
        'align-items-center',
        'my-6'
      )}
    >
      <Media imageUrl={bookImage} imageAlt="404 Image" ratio="21by9" className="w-75" />
      <h1 className={classnames('mt-4')}>Page Not Found</h1>
      <p className={classnames('text-center', 'my-2', 'mx-3')}>
        The page you’re looking for doesn’t exist, or is unavailable. Here’s some helpful
        links instead:
      </p>
      <div className={classnames('row', 'my-3', 'w-75')}>
        <div className="col-md-6 col-12">
          <ErrorLink
            icon={onlineIcon}
            call="Watch Church Online"
            action="https://live.christfellowship.church/"
          />
          <ErrorLink
            icon={homeIcon}
            call="Go to Home Page"
            action="https://christfellowship.church/"
          />
        </div>
        <div className="col-md-6 col-12">
          <ErrorLink
            icon={sermonIcon}
            call="Watch the Latest Sermon"
            action="https://www.youtube.com/user/christfellowship/videos"
          />
          <ErrorLink
            icon={contactIcon}
            call="Contact Us"
            action="https://rock.gocf.org/contactus"
          />
        </div>
      </div>
    </div>
  );
};

ErrorBlock.propTypes = {};

ErrorBlock.defaultProps = {};

export default ErrorBlock;

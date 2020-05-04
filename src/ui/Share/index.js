import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  includes, toLower, uniqueId,
} from 'lodash';
import {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
} from 'react-share';
import {
  Dropdown,
} from 'react-bootstrap';
import { GoogleAnalytics } from '../../analytics';
import { Icon } from '../Icons';

const Share = ({
  title,
  shareTitle,
  variant
}) => {
  // Google Analytics
  const buttonClick = (label, action) => {
    GoogleAnalytics.trackEvent({
      category: 'Share',
      action,
      label,
    });
  };


  // Creates URL for SMS
  const smsUrl = (string) => {
    const encodedString = encodeURI(string);
    const url = `sms://?&body=${encodedString}`;
    return url;
  };

  const iconSize = '24'

  const shareMessages = {
      faceBookShare: `Check out ${title} happening at Christ Fellowship Church!`,
      twitterShare: `${title} at Christ Fellowship Church`,
      emailShare: {
        subject: `${title} at Christ Fellowship Church`,
        body: `Check out ${title} happening at Christ Fellowship Church! I would love for you to join me. \n\n`,
      },
      smsShare: `Join me for ${title} at Christ Fellowship! ${document.URL}`,
    }

  return (
    <Dropdown
      drop="up"
      alignRight={false}
    >
      <a
        onClick={() => buttonClick(`${title} - Invite Button`, 'Open Share Sheet')}
      >
        <Dropdown.Toggle
          id={uniqueId('share-')}
          variant={variant}
        >
          <span
            className="mr-2"
          >
            <Icon
              name='share-square'
              size={iconSize}
            />
          </span>
          {shareTitle}
        </Dropdown.Toggle>
      </a>
      <Dropdown.Menu>
        <Dropdown.Item
          target="_blank"
          onClick={() => buttonClick(`${title} - Facebook Share Button`, 'Shared from Share Sheet')}
        >
          <FacebookShareButton
            url={document.URL}
            quote={shareMessages.faceBookShare}
          >
            <span className="mr-2">
              <Icon
                name='facebook'
                size={iconSize}
              />
            </span>
            Facebook
          </FacebookShareButton>
        </Dropdown.Item>

        <Dropdown.Item
          target="_blank"
          onClick={() => buttonClick(`${title} - Twitter Share Button`, 'Shared from Share Sheet')}
        >
          <TwitterShareButton
            url={document.URL}
            title={shareMessages.twitterShare}
          >
            <span className="mr-2">
              <Icon
                name='twitter'
                size={iconSize}
              />
            </span>
            Twitter
          </TwitterShareButton>
        </Dropdown.Item>

        <Dropdown.Item
          target="_blank"
          onClick={() => buttonClick(`${title} - Email Share Button`, 'Shared from Share Sheet')}
        >
          <EmailShareButton
            url={document.URL}
            subject={shareMessages.emailShare.subject}
            body={shareMessages.emailShare.body}
          >
            <span className="mr-2">
              <Icon
                name='envelope'
                size={iconSize}
              />
            </span>
            Email
          </EmailShareButton>
        </Dropdown.Item>

        <Dropdown.Item
          href={smsUrl(shareMessages.smsShare)}
          target="_blank"
          className="d-md-none"
          onClick={() => buttonClick(`${title} - SMS Share Button`, 'Shared from Share Sheet')}
        >
          <span className="mr-2">
              <Icon
                name='comments'
                size={iconSize}
              />
          </span>
          Text Message
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

Share.propType = {
  shareTitle: PropTypes.string,
  variant: PropTypes.string,
  title: PropTypes.string.isRequired,
};

Share.defaultProps = {
  shareTitle: 'Share',
  variant: 'ghost-white'
};

export default Share;

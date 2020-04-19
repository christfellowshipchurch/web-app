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
import { ShareSquare, Facebook, Comments, Envelope, Twitter } from '../../ui/Icons';

const Share = ({
  title,
  shareTitle,
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

  // TODO: Come up with a different fix for Easter!!!!
  // If the title is for Easter it will use the specific prewritten messages for that event.
  // Else it will use the generic messages.
  const isEaster = includes(toLower(title), 'easter');

  const shareMessages = isEaster
    ? {
      faceBookShare: 'An Online Easter Service Just for You',
      twitterShare: 'I\'ll be watching Easter at Christ Fellowship online! \nWill you? \n',
      emailShare: {
        subject: 'An Online Easter Service Just for You',
        body: 'Hey, \n\n I\'m going to be watching Easter at Christ Fellowship online. Would you like to watch with me? \n\n Check out this link to view when the service times are, as well as how you can watch online. \n\n',
      },
      smsShare: 'Hey, I\'m going to be watching Easter at Christ Fellowship online. Would you like to watch with me? If so, check out EasteratCF.com to view when the service times are, as well as how you can watch online.',
    }
    : {
      faceBookShare: `Check out ${title} happening at Christ Fellowship Church!`,
      twitterShare: `${title} at Christ Fellowship Church`,
      emailShare: {
        subject: `${title} at Christ Fellowship Church`,
        body: `Check out ${title} happening at Christ Fellowship Church! I would love for you to join me. \n\n ${document.URL}`,
      },
      smsShare: `Join me for ${title} at Christ Fellowship! ${document.URL}`,
    };

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
          variant="ghost-white"
        >
          <span
            className="mr-2"
          >
            <ShareSquare 
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
              <Facebook
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
              <Twitter 
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
              <Envelope 
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
            <Comments 
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
  title: PropTypes.string.isRequired,
};

Share.defaultProps = {
  shareTitle: 'Share',
};

export default Share;

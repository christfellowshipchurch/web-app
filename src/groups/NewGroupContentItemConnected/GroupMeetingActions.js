import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { get } from 'lodash';

import { baseUnit } from 'styles/theme';

// add any additional parameters to the video urls
const videoCallURLWithParameters = (videoURL, parameters) => {
  const isMSIE = /*@cc_on!@*/ false || !!document.documentMode; //eslint-disable-line spaced-comment
  let urlWithParams = videoURL;

  if (!isMSIE) {
    urlWithParams = new URL(videoURL);

    if (parameters) {
      Object.entries(parameters).map(([key, value]) =>
        urlWithParams.searchParams.set(key, value)
      );
    }

    urlWithParams = urlWithParams.href;
  }

  return urlWithParams;
};

// :: Styled Components
// ------------------------

const Container = styled.div`
  display: grid;
  grid-auto-rows: 1fr;
  grid-gap: ${baseUnit(1)};
`;

// :: Main Component
// ------------------------
const GroupMeetingActions = ({
  userName,
  parentVideoCall,
  videoCall,
  onClickParentVideoCall,
  onClickVideoCall,
}) => {
  return (
    <Container>
      {get(parentVideoCall, 'link') && (
        <a
          className="btn btn-primary btn-block mb-3"
          href={videoCallURLWithParameters(
            get(parentVideoCall, 'link'),
            userName
              ? {
                  uname: userName,
                }
              : null
          )}
          onClick={() => onClickParentVideoCall('parent')}
          target="_blank"
          rel="noopener noreferrer"
        >
          {get(parentVideoCall, 'labelText') || `Join Meeting`}
        </a>
      )}
      {get(videoCall, 'link') ? (
        <a
          className="btn btn-primary btn-block mb-3"
          href={videoCallURLWithParameters(
            get(videoCall, 'link'),
            userName
              ? {
                  uname: userName,
                }
              : null
          )}
          onClick={() => onClickVideoCall()}
          target="_blank"
          rel="noopener noreferrer"
        >
          {get(videoCall, 'label') || parentVideoCall ? 'Join Breakout' : 'Join Meeting'}
        </a>
      ) : (
        <a
          // allow to just checkin for in person groups
          className="btn btn-primary btn-block mb-3"
          href={'# '}
          onClick={() => onClickVideoCall()}
        >
          Check In
        </a>
      )}
    </Container>
  );
};

GroupMeetingActions.propTypes = {
  userName: PropTypes.string,
  parentVideoCall: PropTypes.shape({
    link: PropTypes.string,
    meetingId: PropTypes.string,
    passcode: PropTypes.string,
  }),
  videoCall: PropTypes.shape({
    labelText: PropTypes.shape,
    link: PropTypes.string,
    meetingId: PropTypes.string,
    passcode: PropTypes.string,
  }),
  onClickParentVideoCall: PropTypes.func,
  onClickVideoCall: PropTypes.func,
};

export default GroupMeetingActions;

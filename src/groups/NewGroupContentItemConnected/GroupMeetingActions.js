import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { get, isEmpty } from 'lodash';

import { baseUnit } from 'styles/theme';

// :: Styled Components
// ------------------------

const Container = styled.div`
  display: grid;
  /* flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  align-content: stretch; */
  grid-auto-rows: 1fr;
  grid-gap: ${baseUnit(1)};
`;

// :: Main Component
// ------------------------
const GroupMeetingActions = ({ parentVideoCall, videoCall }) => {
  console.group('[rkd] GroupMeetingActions');
  console.log('[rkd] parentVideoCall:', parentVideoCall);
  console.log('[rkd] videoCall:', videoCall);
  console.groupEnd();
  const parentVideoCallLabel = get(parentVideoCall, 'labelText', 'Join Meeting');
  const videoCallLabel = get(
    videoCall,
    'labelText',
    !isEmpty(parentVideoCall) ? 'Join Breakout' : 'Join Meeting'
  );

  return (
    <Container>
      {!isEmpty(parentVideoCall) && (
        <a
          href={get(parentVideoCall, 'link', '#')}
          className="btn btn-primary text-white w-100"
        >
          {parentVideoCallLabel}
        </a>
      )}
      {!isEmpty(videoCall) && (
        <a
          href={get(videoCall, 'link', '#')}
          className="btn btn-primary text-white w-100"
        >
          {videoCallLabel}
        </a>
      )}
    </Container>
  );
};

GroupMeetingActions.propTypes = {
  headline: PropTypes.string,
  subHeadline: PropTypes.string,
};

export default GroupMeetingActions;

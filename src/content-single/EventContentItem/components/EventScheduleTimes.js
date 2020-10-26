import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { uniqBy } from 'lodash';
import moment from 'moment';

import { baseUnit } from 'styles/theme';

import { Icon } from 'ui';

// :: Styled Components
// ------------------------
const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ isOnlyEventTime }) => (isOnlyEventTime ? 0 : baseUnit(3))};
`;

// :: Main Component
// ------------------------

const EventTimes = ({ date, times, isOnlyEventTime }) => {
  const mDate = moment(date);
  const currentUtcOffset = moment().format('ZZ');

  return (
    <Container isOnlyEventTime={isOnlyEventTime}>
      <div>
        <h4 className="d-flex align-items-center">
          <Icon name="calendar-alt" className="mr-2" />
          {mDate.format('ddd MMM D')}
        </h4>
      </div>
      {uniqBy(times, 'start')
        .sort((a, b) => moment(a.start).diff(moment(b.start)))
        .map((t) => {
          const utc = moment.utc(t.start);
          const local = moment(utc).utcOffset(currentUtcOffset);

          return (
            <div key={`${date}:${t.start}`}>
              <h4 className="font-weight-normal d-flex align-items-center">
                <Icon name="clock" className="mr-2" size={18} />
                {local.format('LT')}
              </h4>
            </div>
          );
        })}
    </Container>
  );
};

EventTimes.propTypes = {
  date: PropTypes.string,
  times: PropTypes.arrayOf(PropTypes.object),
  isOnlyEventTime: PropTypes.bool,
};

EventTimes.defaultProps = {
  date: '',
  times: [],
  isOnlyEventTime: false,
};

export default EventTimes;

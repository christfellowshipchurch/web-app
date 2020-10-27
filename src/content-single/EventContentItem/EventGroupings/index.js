import React, { useState } from 'react';
import { useQuery } from 'react-apollo';
import PropTypes from 'prop-types';
import moment from 'moment';
import { get } from 'lodash';
import classnames from 'classnames';

import { Dropdown } from 'react-bootstrap';
import { GoogleAnalytics } from '../../../analytics';

import { Card, AddToCalendar } from '../../../ui';
import { Icon } from '../../../ui/Icons';
import { Row, CampusSelectToggle, TextIconRow } from './components';

import GET_EVENT_GROUPINGS from './getEventGroupings';

const DateTime = ({ start, end, title, group }) => {
  const mDate = moment(start);
  const event = {
    title: `${title} - Christ Fellowship Church`,
    alternateDescription: `${title} at ${group}`,
    startTime: start,
    endTime: end,
  };

  return (
    <div
      className={classnames(
        'd-flex',
        'flex-row',
        'justify-content-between',
        'align-items-center'
      )}
    >
      <Row>
        <TextIconRow icon="calendar-alt" header="h3">
          {mDate.format('ddd MMM D')}
        </TextIconRow>
        <TextIconRow icon="clock" header="h4">
          {mDate.format('LT')}
        </TextIconRow>
      </Row>
      <AddToCalendar title={null} event={event}>
        <Icon name="calendar-plus" />
      </AddToCalendar>
    </div>
  );
};

DateTime.propTypes = {
  start: PropTypes.string,
  end: PropTypes.string,
  title: PropTypes.string,
  group: PropTypes.string,
};

const EventGroupings = ({ groupings, defaultSelection, callsToAction, title }) => {
  const id = 'event-campus-selection';
  const [selected, setSelected] = useState(
    defaultSelection || get(groupings, '[0].name')
  );
  const selectedGroup = groupings.find((i) => i.name === selected);

  return (
    <div className={classnames('col-12', 'col-md-4')}>
      <Card className="mb-3">
        <Dropdown
          id={id}
          onSelect={(key, e) => {
            e.preventDefault();
            setSelected(key);
          }}
        >
          <Dropdown.Toggle variant="link" id={id} as={CampusSelectToggle}>
            {selected}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {groupings.map(({ name }, i) => (
              <Dropdown.Item
                key={`CampusSelection:${i}`}
                eventKey={name}
                active={name === selected}
              >
                {name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Card>

      <Card key="EventOccurences" className={classnames('mb-3')}>
        <div className="">
          {selectedGroup.instances.length &&
            selectedGroup.instances.map(({ id, start, end }) => (
              <DateTime
                key={id}
                start={start}
                end={end}
                title={title}
                group={selectedGroup.name}
              />
            ))}

          <div>
            {callsToAction.map((n, i) => (
              <a
                key={i}
                className={classnames('btn', 'btn-primary', 'btn-block', 'my-3')}
                href={n.action}
                target={n.action.includes('http') ? '_blank' : ''}
                onClick={() =>
                  GoogleAnalytics.trackEvent({
                    category: 'Event Item',
                    action: `${title} Call to Action`,
                    label: `${title} - ${n.call} Button`,
                  })
                }
              >
                {n.call}
              </a>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

EventGroupings.propTypes = {
  defaultSelection: PropTypes.string,
  title: PropTypes.string,
  callsToAction: PropTypes.arrayOf(
    PropTypes.shape({
      call: PropTypes.string,
      action: PropTypes.string,
    })
  ),
  groupings: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      instances: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          start: PropTypes.string,
          end: PropTypes.string,
        })
      ),
    })
  ),
};

EventGroupings.defaultProps = {
  groupings: [],
  defaultSelection: null,
};

const EventGroupingsConnected = ({ contentId }) => {
  const { data, loading, error } = useQuery(GET_EVENT_GROUPINGS, {
    variables: { id: contentId },
    skip: !contentId || contentId === '',
  });

  console.log({ data });

  if (error || loading) return null;

  const groupings = get(data, 'node.eventGroupings', []);
  const myCampus = get(data, 'currentUser.profile.campus.name', '');
  const defaultSelection = groupings.filter((i) => i.name === myCampus).length
    ? myCampus
    : get(groupings, '[0].name');

  if (!groupings.length) return null;

  return (
    <EventGroupings
      groupings={get(data, 'node.eventGroupings', [])}
      callsToAction={get(data, 'node.callsToAction', [])}
      title={get(data, 'node.title', '')}
      defaultSelection={defaultSelection}
    />
  );
};

EventGroupingsConnected.propTypes = {
  contentId: PropTypes.string,
};

EventGroupingsConnected.defaultProps = {
  contentId: null,
};

export default EventGroupingsConnected;

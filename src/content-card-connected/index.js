import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';
import { get, last, flatten, uniqBy, head } from 'lodash';
import moment from 'moment';

import { isMobile } from 'react-device-detect';
import { ContentCard } from '../ui';
import { LiveConsumer } from '../live/LiveContext';
import { trimText } from '../utils';
import GET_CONTENT_CARD from './queries';

const generateEventGroupingLabel = (eventGroups) => {
  if (eventGroups.length === 0) return null;
  /**
   * The following transformations need to be applied after getting the eventGroupings
   * Map to start dates                   : [ [date1Time, date1Time], [date2Time] ]
   * Flatten the array                    : [date1Time, date1Time, date2Time]
   * Filter to just get the unique dates  : [date1Time, date2Time]
   */
  let eventDates = eventGroups;
  eventDates = eventDates.map((grouping) =>
    grouping.instances.map(({ start }) => moment(start).format(''))
  );
  eventDates = flatten(eventDates);
  eventDates = uniqBy(eventDates, (date) => moment(date).format('MMDD'));

  if (eventDates.length === 0) return null;

  /**
   * If today with 1 date     : Today
   * If not today with 1 date : January 1
   * If more than 1 date      : Jan 1 - Jan 5
   */
  if (eventDates.length === 1) {
    const today = moment().format('MMMM D');
    const date = moment(eventDates[0]).format('MMMM D');

    return date === today ? 'Today' : date;
  }

  eventDates = eventDates.sort((a, b) => moment(a).diff(b));
  const firstDate = moment(head(eventDates)).format('MMM D');
  const lastDate = moment(last(eventDates)).format('MMM D');

  return `${firstDate} - ${lastDate}`;
};

const ContentCardConnectedWithQuery = ({
  contentId,
  tile,
  card,
  label,
  isLive,
  hideLabel,
  ...otherProps
}) => {
  const { loading, error, data } = useQuery(GET_CONTENT_CARD, {
    variables: { contentId, tile: false },
    fetchPolicy: 'network-only',
  });

  if (error) return null;

  const node = get(data, 'node', {});
  const typename = get(node, '__typename', '');
  const metrics = [
    {
      icon: node.isLiked ? 'like-solid' : 'like',
      value: node.likedCount,
    },
  ];
  const coverImage = get(node, 'coverImage.sources', undefined);

  let labelValue =
    typeof label.field === 'string' ? get(node, label.field, '') : label.field(node);

  if (typename === 'EventContentItem') {
    /**
     * If label is not null or an empty string, override the date duration
     * and use the custom label instead
     */
    const eventLabelOverride = get(node, 'label');
    if (!eventLabelOverride || eventLabelOverride === '') {
      labelValue = generateEventGroupingLabel(get(node, 'eventGroupings', []));
    } else {
      labelValue = eventLabelOverride;
    }
  }

  const liveLabel = {
    value: 'live now',
    bg: 'danger',
    textColor: 'white',
  };

  if (hideLabel) {
    labelValue = '';
  }

  let urlBase = 'content';
  switch (typename) {
    case 'EventContentItem':
      urlBase = 'events';
      break;
    case 'InformationalContentItem':
      urlBase = 'items';
      break;
    default:
      break;
  }

  urlBase = get(otherProps, 'baseUrl', urlBase);

  return React.createElement(card, {
    ...node,
    ...otherProps,
    coverImage,
    metrics,
    tile,
    isLoading: loading,
    label: isLive
      ? liveLabel
      : {
          value: labelValue,
          ...label,
        },
    urlBase,
    isLive,
  });
};

const ContentCardConnected = ({
  contentId,
  isLoading,
  tile,
  card = ContentCard,
  ...otherProps
}) => {
  if (!contentId || isLoading) {
    return React.createElement(card, {
      ...otherProps,
      tile,
      isLoading: true,
    });
  }

  return (
    <LiveConsumer contentId={contentId}>
      {(liveStream) => {
        const isLive = !!(liveStream && liveStream.isLive);
        return (
          <ContentCardConnectedWithQuery
            contentId={contentId}
            tile={tile}
            card={card}
            isLive={isLive}
            {...otherProps}
          />
        );
      }}
    </LiveConsumer>
  );
};

ContentCardConnected.propTypes = {
  isLoading: PropTypes.bool,
  contentId: PropTypes.string,
  tile: PropTypes.bool,
  card: PropTypes.func,
  hideLabel: PropTypes.bool,
  label: PropTypes.shape({
    field: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    bg: PropTypes.string,
    textColor: PropTypes.string,
  }),
};

ContentCardConnected.defaultProps = {
  card: ContentCard,
  tile: false,
  hideLabel: false,
  label: {
    field: 'tags[0]',
    bg: 'dark',
    textColor: 'white',
  },
};

export default ContentCardConnected;

import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';
import { get, last } from 'lodash';
import moment from 'moment';

import { ContentCard } from '../ui';
import { LiveConsumer } from '../live/LiveContext';
import GET_CONTENT_CARD from './queries';

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
    fetchPolicy: 'cache-and-network',
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
    const hideLabel = get(node, 'hideLabel', false);
    const comingSoon = hideLabel ? '' : 'Dates Coming Soon';
    const events = get(node, 'events', []);
    const startDate = moment(get(events, '[0].start', new Date()));
    let eventDate = startDate.format('MMM D');

    if (events.length > 1) {
      const endDate = moment(get(last(events), 'start', new Date()));
      const format = startDate.month() === endDate.month() ? 'D' : 'MMM D';
      if (startDate.day() !== endDate.day()) {
        eventDate = `${startDate.format('MMM D')} - ${endDate.format(format)}`;
      }
    }
    labelValue = get(node, 'events', []).length && !hideLabel ? eventDate : comingSoon;
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

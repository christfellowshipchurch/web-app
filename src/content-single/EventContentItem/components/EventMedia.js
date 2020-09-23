import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { get } from 'lodash';

import { Media } from 'ui';

import ADD_ATTENDANCE from 'mutations/addAttendance';

const GET_CHECK_IN = gql`
  query getCheckIn($itemId: ID!) {
    node(id: $itemId) {
      __typename
      id
      ... on CheckInableNode {
        checkin {
          id
          title
          message
          isCheckedIn
        }
      }
    }
  }
`;

const EventMedia = ({ id, coverImage, isLive, liveStreamSource, title, videos }) => {
  const { loading, error, data } = useQuery(GET_CHECK_IN, {
    fetchPolicy: 'network-only',
    skip: !id || id === '',
    variables: {
      itemId: id,
      key: 'CHECK_IN',
    },
  });
  const checkin = get(data, 'node.checkin', null);

  const [handleAttend] = useMutation(ADD_ATTENDANCE);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLive && checkin && !checkin.isCheckedIn) {
        handleAttend({ variables: { id: checkin.id } });
      }
    }, 10000);
    return () => clearTimeout(timer);
  }, [checkin]);

  return (
    <div className="mb-2 px-3">
      <Media
        imageUrl={get(coverImage, 'sources[0].uri', '')}
        videoUrl={
          !!liveStreamSource && liveStreamSource !== ''
            ? liveStreamSource
            : get(videos, '[0].sources[0].uri', '')
        }
        isLive={isLive}
        imageAlt={`${title} - ${get(coverImage, 'name', '')}`}
        className={classnames('max-height-45-vh', 'shadow')}
        ratio={{ xs: '1by1', md: '16by9' }}
        forceRatio
        rounded
        showControls
      />
    </div>
  );
};

EventMedia.propTypes = {
  contentId: PropTypes.string,
  coverImage: PropTypes.shape({
    name: PropTypes.string,
    sources: PropTypes.arrayOf(PropTypes.shape({ uri: PropTypes.string })),
  }),
  isLive: PropTypes.bool,
  liveStreamSource: PropTypes.string,
  title: PropTypes.string,
  videos: PropTypes.arrayOf(
    PropTypes.shape({
      sources: PropTypes.arrayOf(PropTypes.shape({ uri: PropTypes.string })),
    })
  ),
};

EventMedia.defaultProps = {
  title: '',
  coverImage: {},
  videos: [],
};

export default EventMedia;

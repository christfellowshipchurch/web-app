import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'apollo-client';
import gql from 'graphql-tag';

const TRACK = gql`
  mutation track($input: AnalyticsTrackInput!) {
    trackEvent(input: $input) {
      success
    }
  }
`;

const objectToGqlInput = (props = {}) =>
  Object.keys(props).map((key) => ({
    field: key,
    value: props[key],
  }));

const TrackEventWhenLoadedConnected = ({ loaded, eventName, properties }) => {
  const [track] = useMutation(TRACK);

  useEffect(() => {
    if (loaded) {
      track({
        variables: {
          eventName,
          properties: objectToGqlInput(properties),
        },
      });
    }
  }, [loaded]);

  return null;
};

TrackEventWhenLoadedConnected.propTypes = {
  loaded: PropTypes.bool,
  eventName: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  properties: PropTypes.any,
};

export default TrackEventWhenLoadedConnected;

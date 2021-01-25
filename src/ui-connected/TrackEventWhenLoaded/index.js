import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-apollo';
import gql from 'graphql-tag';

import { useAuth } from 'auth';

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
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (loaded && isLoggedIn) {
      track({
        variables: {
          input: {
            eventName,
            properties: objectToGqlInput(properties),
          },
        },
      });
    }
  }, [loaded, isLoggedIn]);

  return null;
};

TrackEventWhenLoadedConnected.propTypes = {
  loaded: PropTypes.bool,
  eventName: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  properties: PropTypes.any,
};

export default TrackEventWhenLoadedConnected;

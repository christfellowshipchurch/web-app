import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';
import { get } from 'lodash';

import { useAuthQuery } from '../../auth';
import { Loader, ErrorBlock } from '../../ui';

import GET_GROUP from '../getGroup';

const GroupContentItemConnected = ({ itemId, title }) => {
  console.log(itemId);
  const { loading, error, data } = useQuery(GET_GROUP, {
    variables: { itemId },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return <Loader />;
  if (error) {
    console.log({ error }); // eslint-disable-line no-console
    return null;
  }

  const content = get(data, 'node', {});

  if (!content) {
    return <ErrorBlock />;
  }

  console.log(data);
  return 'Hello World';
};

GroupContentItemConnected.propTypes = {
  itemId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default GroupContentItemConnected;

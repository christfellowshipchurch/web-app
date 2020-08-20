import React from 'react';
import { useQuery } from 'react-apollo';
import { get } from 'lodash';

import { Loader, ErrorBlock } from '../../ui';

import ContentSingle from '../../content-single';

import { GET_EVENT } from './queries';

const GroupConnected = ({ title }) => {
  const { loading, error, data } = useQuery(GET_EVENT, {
    variables: { title },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return <Loader />;
  if (error) {
    console.log({ error });
    return null;
  }

  const content = get(data, 'getGroupContentByTitle', null);

  if (!content) {
    return <ErrorBlock />;
  }

  return <ContentSingle itemId={content.id} />;
};

export default GroupConnected;

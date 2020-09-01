import React from 'react';
import { useQuery } from 'react-apollo';
import { get } from 'lodash';

import { Loader, ErrorBlock } from '../../ui';

import ContentSingle from '../../content-single';
import { CardFeed } from '../../content-feed';

import { GET_EVENT } from './queries';

const EventConnected = ({ title }) => {
  const { loading, error, data } = useQuery(GET_EVENT, {
    variables: { title },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return <Loader />;
  if (error) {
    console.log({ error });
    return null;
  }

  const content = get(data, 'getEventContentByTitle', null);

  if (!content) {
    return <ErrorBlock />;
  }

  return <ContentSingle itemId={content.id} />;
};

export default EventConnected;

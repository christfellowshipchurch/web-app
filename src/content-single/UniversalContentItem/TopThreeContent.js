import React from 'react';
import { useQuery } from 'react-apollo';
import { get } from 'lodash';

import { Loader } from '../../ui';

import { GET_TOP_THREE_ARTICLES } from '../queries';
import ContentLinks from './ContentLinks';

const TopThreeContent = () => {
  const { loading, error, data } = useQuery(GET_TOP_THREE_ARTICLES, {
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return <Loader />;

  if (error) {
    console.log({ error });
    // TODO : should we show an error? Or should we just redirect to the Contents page?
    return null;
  }

  const content = get(
    data,
    'getBrowseFilters.childContentItemsConnection.edges[0].node.childContentItemsConnection.edges[0].node',
    []
  );

  return content.length ? <ContentLinks content={content} /> : null;
};

TopThreeContent.propTypes = {};

TopThreeContent.defaultProps = {};

export default TopThreeContent;

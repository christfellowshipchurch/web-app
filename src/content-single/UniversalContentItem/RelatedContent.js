import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';
import { get, take } from 'lodash';
import { Loader } from '../../ui';
import { GET_RELATED_ARTICLES } from '../queries';
import ContentLinks from './ContentLinks';
import TopThreeContent from './TopThreeContent';

const RelatedArticles = ({ id }) => {
  const { loading, error, data } = useQuery(GET_RELATED_ARTICLES, {
    variables: { id },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return <Loader />;

  if (error) {
    console.log({ error });
    return <TopThreeContent />;
  }

  const articles = take(
    get(data, 'node.siblingContentItemsConnection.edges', [])
      .map(({ node }) => node)
      .filter((n) => n.id !== id),
    3
  );

  return articles.length ? <ContentLinks articles={articles} /> : <TopThreeContent />;
};

RelatedArticles.propTypes = {
  id: PropTypes.string.isRequired,
};

RelatedArticles.defaultProps = {};

export default RelatedArticles;

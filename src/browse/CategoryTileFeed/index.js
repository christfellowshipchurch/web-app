import React from 'react';
import { useQuery } from 'react-apollo';
import PropTypes from 'prop-types';
import { get, take, kebabCase } from 'lodash';

import { Loader, ContentContainer } from '../../ui';
import ContentCardConnected from '../../content-card-connected';

import { GET_CATEGORY_PREVIEW } from '../queries';
import { redirectTo } from '../../utils';

const CategoryTileFeed = ({ contentId, title, onSeeMore }) => {
  const { loading, error, data } = useQuery(GET_CATEGORY_PREVIEW, {
    variables: { id: contentId },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) {
    return (
      <ContentContainer style={{ height: '200px' }}>
        <Loader />
      </ContentContainer>
    );
  }

  if (error) {
    console.log({ error });
    return null;
  }

  const content = get(data, 'node.childContentItemsConnection.edges', []).map(
    (edge) => edge.node
  );

  return (
    <div className="my-4">
      <div key="CategoryTileFeed:1" className="row my-n3">
        <div className="col-9">
          <h3 className="mb-2">{title}</h3>
        </div>
        {content.length > 3 && (
          <div className="col-3 text-right">
            <a
              href="#"
              className="h5"
              onClick={(e) => {
                e.preventDefault();
                onSeeMore({ id: contentId, title });
              }}
            >
              See More
            </a>
          </div>
        )}
      </div>
      <div key="CategoryTileFeed:2" className="row mx-n2 pb-1">
        {take(content, 3).map((n, i) => (
          <ContentCardConnected key={i} contentId={get(n, 'id', '')} />
        ))}
      </div>
    </div>
  );
};

CategoryTileFeed.propTypes = {
  filter: PropTypes.string,
  category: PropTypes.string,
  title: PropTypes.string,
  onSeeMore: PropTypes.func,
};

CategoryTileFeed.defaultProps = {
  filter: null,
  category: null,
  title: null,
  onSeeMore: () => true,
};

export default CategoryTileFeed;

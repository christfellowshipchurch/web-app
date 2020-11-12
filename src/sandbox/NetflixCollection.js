import React from 'react';
import { useQuery } from 'react-apollo';
import { get, drop, first } from 'lodash';

import classnames from 'classnames';
import { Media, RowCard } from '../ui';
import { GET_CONTENT_FEED } from '../content-feed';
import ContentCardConnected from '../content-card-connected';

const NetflixCollection = ({ itemId, inverse }) => {
  const { loading, error, data } = useQuery(GET_CONTENT_FEED, {
    fetchPolicy: 'cache-and-network',
    variables: {
      itemId,
      child: true,
      sibling: false,
    },
  });
  if (loading || error) return null;
  const content = get(data, 'node.childContentItemsConnection.edges', []).map(
    ({ node }) => node
  );
  const hero = first(content);
  const items = drop(content);

  return (
    <Media
      imageUrl={get(hero, 'images[0].sources[0].uri')}
      overlay="black"
      style={{ minHeight: '100vh', minWidth: '100vw' }}
      className={classnames('d-flex', 'align-items-center')}
    >
      <div className="container-fluid">
        <div className="row">
          <div
            className={classnames('col-12', 'col-md-6', 'px-3', 'p-lg-4', {
              'order-lg-last': inverse,
            })}
          >
            <h1 className="text-white">{hero.title}</h1>
            <h3 className="text-light">{hero.summary}</h3>
            <button className={classnames('btn', 'btn-primary')}>Learn More</button>
          </div>
          {items.length > 0 && (
            <div
              className={classnames(
                'col-12',
                'col-md-6',
                'px-3',
                'p-lg-4',
                'mt-lg-n3',
                'mt-5'
              )}
            >
              {items.map(({ id }) => (
                <ContentCardConnected contentId={id} card={RowCard} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Media>
  );
};

export default NetflixCollection;

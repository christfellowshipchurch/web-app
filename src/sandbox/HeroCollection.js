import React from 'react';
import { useQuery } from 'react-apollo';
import { get, drop, first } from 'lodash';

import classnames from 'classnames';
import { Media } from '../ui';
import { GET_CONTENT_FEED } from '../content-feed';
import ContentCardConnected from '../content-card-connected';

const HeroCollection = ({ itemId }) => {
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
    <>
      <Media
        imageUrl={get(hero, 'images[0].sources[0].uri')}
        ratio={{ xs: '1by1', lg: '21by9' }}
        overlay="black"
        forceRatio
      >
        <div
          className={classnames('px-2', 'py-3', 'py-lg-4', 'w-100', 'max-width-1100')}
          style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <h1 className="text-white">{hero.title}</h1>
          <h3 className="text-light">{hero.summary}</h3>
          <button className={classnames('btn', 'btn-primary')}>Learn More</button>
        </div>
      </Media>
      {items.length > 0 && (
        <div className="container-fluid">
          <div className="row pb-2">
            {items.map(({ id }) => (
              <ContentCardConnected contentId={id} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default HeroCollection;

import React from 'react';
import { useQuery } from 'react-apollo';
import { get, first } from 'lodash';

import classnames from 'classnames';
import { Media } from '../ui';
import { GET_CONTENT_FEED } from '../content-feed';
import ContentCardConnected from '../content-card-connected';

const NetflixCardFeed = ({ title, itemId }) => {
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

  return (
    <div>
      <Media
        imageUrl={get(hero, 'images[0].sources[0].uri')}
        overlay="black"
        style={{ minHeight: '100vh', minWidth: '100vw' }}
        className={classnames('d-flex', 'align-items-center')}
      >
        <div className="container-fluid">
          <div className="row">
            <div
              className={classnames(
                'col-12',
                'px-2',
                'flex-row',
                'd-flex',
                'align-items-end',
                'justify-content-between'
              )}
            >
              <h1 className="text-white">{title}</h1>
              <p>See All</p>
            </div>
          </div>
          <div className="row">
            {content.length > 0 &&
              content.map(({ id }) => <ContentCardConnected contentId={id} />)}
          </div>
        </div>
      </Media>
    </div>
  );
};

export default NetflixCardFeed;

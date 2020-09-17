import React from 'react';
import { useQuery } from 'react-apollo';
import { get, drop, first } from 'lodash';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import { ContentCard, HighlightCard, Media, RowCard } from '../ui';
import { GET_CONTENT_FEED } from '../content-feed';
import ContentCardConnected from '../content-card-connected';
import { useSandbox } from '.';

const RATIO_MAP = {
  '-1': '4by3',
  0: { xs: '1by1', lg: '16by9' },
  1: '21by9',
};

const cardLoadingObject = {
  id: 'fake_id',
  title: '',
  coverImage: [],
  ratio: RATIO_MAP[0],
};

const StyledHighlightCard = ({ style, ...props }) => (
  <HighlightCard {...props} style={{ maxHeight: 450, ...style }} />
);
const ColumnHighlightCard = ({ style, ...props }) => (
  <div className={classnames('col-12', 'col-md-6', 'col-lg-4', 'px-2', 'pt-2')}>
    <HighlightCard {...props} style={{ ...style, height: '100%' }} ratio="1by1" />
  </div>
);

const THEME_CARD_MAP = {
  default: ContentCard,
  highlight: ColumnHighlightCard,
};

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
    </div>
  );
};

export default NetflixCollection;

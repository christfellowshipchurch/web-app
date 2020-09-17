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

const NetflixCardFeed = ({ title, itemId, inverse }) => {
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

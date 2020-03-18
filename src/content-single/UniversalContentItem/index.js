import React from 'react';
import PropTypes from 'prop-types';
import {
  useQuery,
} from 'react-apollo';
import {
  get, toLower,
} from 'lodash';
import moment from 'moment';
import { htmlToReactParser } from '../../utils';
import {
  Loader,
  Media,
} from '../../ui';
import Placeholder from './Placeholder';

import Author from '../Author';
import RelatedArticles from './RelatedContent';
import ArticleCategories from './ContentCategories';
import {
  GET_CONTENT_ITEM,
} from '../queries';

const DATE_FORMAT = 'MMMM D, YYYY';

const ArticleDetail = ({
  itemId,
}) => {
  const { loading, error, data } = useQuery(GET_CONTENT_ITEM,
    {
      variables: {
        itemId,
      },
      fetchPolicy: 'cache-and-network',
    });

  if (loading) return <Placeholder />;

  if (error) {
    console.log({ error });
    // TODO : should we show an error? Or should we just redirect to the Articles page?
    return (
      <h3 className="text-center text-danger">
        There was an error loading this content. Try refreshing the page.
      </h3>
    );
  }

  const article = get(data, 'node', null);
  const bodyText = get(article, 'htmlContent', '');

  const categoryTags = get(article, 'tags', []);

  if (!article) {
    console.error('Articles: Null was returned from the server');
    return (
      <h3 className="text-center text-danger">
        There was an error loading this content. Try refreshing the page.
      </h3>
    );
  }

  const publishDate = get(article, 'publishDate', '') !== ''
    ? moment(article.publishDate).format(DATE_FORMAT)
    : moment().format(DATE_FORMAT);

  return (
    <>
      <div className="pt-6 bg-white px-3">
        <div className="container">
          <div className="row">
            <div className="col">
              {get(article, 'title', '') !== ''
                && (
                  <h1 className="mb-2 text-dark">
                    {article.title}
                  </h1>
                )}

              {get(article, 'summary', '') !== ''
                && (
                  <h2 className="mt-1 article-subtitle font-weight-light">
                    {article.summary}
                  </h2>
                )}

              {get(article, 'coverImage.sources[0].uri') !== ''
                && (
                  <Media
                    rounded
                    showControls
                    ratio="16by9"
                    imageUrl={get(article, 'coverImage.sources[0].uri', '')}
                    videoUrl={get(article, 'videos[0].sources[0].uri', '')}
                    imageAlt={get(article, 'title', 'Christ Fellowship Church')}
                    className="my-4"
                  />
                )}

              {/* TODO : add some sort of default photo/icon */}
              <Author contentId={itemId} />

              {get(article, 'htmlContent', '') !== ''
                && (
                  <div className="article-body my-3 pb-4 text-left">
                    {htmlToReactParser.parse(bodyText)}
                  </div>
                )}
            </div>
          </div>
          {/* Category tags */}
          {categoryTags.length > 0
            && (
              <div className="row pb-6">
                <div className="col-12">
                  <h4
                    className="text-uppercase text-muted"
                    style={{ fontWeight: 900, letterSpacing: 2 }}
                  >
                    categories
                  </h4>
                </div>
                <div className="col-12">
                  <ArticleCategories categories={categoryTags} />
                </div>
              </div>
            )}
        </div>
      </div>
      <RelatedArticles id={get(article, 'id')} />
    </>
  );
};

ArticleDetail.propTypes = {
  itemId: PropTypes.string,
};

ArticleDetail.defaultProps = {
};

export default ArticleDetail;
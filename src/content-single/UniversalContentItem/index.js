import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames'
import {
  get,
} from 'lodash';
import { htmlToReactParser } from '../../utils';
import {
  Media,
  ErrorBlock,
} from '../../ui';
import Placeholder from './Placeholder';

import Author from '../Author';
import RelatedArticles from './RelatedContent';
import ArticleCategories from './ContentCategories';

import Share from '../Banner/Share'

const UniversalContentItem = ({
  itemId,
  loading,
  error,
  content,
}) => {
  if (loading) return <Placeholder />;

  if (error) {
    console.log({ error });
    return <ErrorBlock />;
  }
  const bodyText = get(content, 'htmlContent', '');

  const categoryTags = get(content, 'tags', []);

  if (!content) {
    console.error('Articles: Null was returned from the server');
    return (
      <ErrorBlock />
    );
  }

  return (
    <>
      <div className="pt-6 bg-white px-3">
        <div className="container">
          <div className="row">
            <div className="col">
              {get(content, 'title', '') !== ''
                && (
                  <h1 className="mb-2 text-dark">
                    {content.title}
                  </h1>
                )}

              {get(content, 'summary', '') !== ''
                && (
                  <h2 className="mt-1 content-subtitle font-weight-light">
                    {content.summary}
                  </h2>
                )}

              {get(content, 'coverImage.sources[0].uri') !== ''
                && (
                  <Media
                    imageUrl={get(content, 'coverImage.sources[0].uri', '')}
                    videoUrl={get(content, 'videos[0].sources[0].uri', '')}
                    imageAlt={get(content, 'title', 'Christ Fellowship Church')}
                    ratio={{ xs: '1by1', md: '16by9' }}
                    forceRatio
                    rounded
                    showControls
                    className="shadow my-4"
                  />
                )}

              {/* TODO : add some sort of default photo/icon */}
              <div 
                className={classnames(
                  'd-flex',
                  'align-items-center',
                  'justify-content-between',
                  'mt-n4'
                )}
              >
                <Author contentId={itemId} />
                <Share 
                  title ={content.title}
                  variant={'primary'}
                />
              </div>
              

              {get(content, 'htmlContent', '') !== ''
                && (
                  <div className="content-body my-3 pb-4 text-left">
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
      <RelatedArticles id={get(content, 'id')} />
    </>
  );
};

UniversalContentItem.propTypes = {
  itemId: PropTypes.string,
};

UniversalContentItem.defaultProps = {
};

export default UniversalContentItem;

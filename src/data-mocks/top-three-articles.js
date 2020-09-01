import { GET_TOP_THREE_ARTICLES } from '../articles/queries';
import { ARTICLE_TEMPLATE } from './article-details';

export const TOP_THREE_ARTICLES_MOCKS = {
  request: {
    query: GET_TOP_THREE_ARTICLES,
  },
  result: {
    data: {
      getArticles: [ARTICLE_TEMPLATE, ARTICLE_TEMPLATE, ARTICLE_TEMPLATE],
    },
  },
};

export const TOP_THREE_ARTICLES_ERROR = {
  request: {
    query: GET_TOP_THREE_ARTICLES,
  },
  error: new Error('Error loading top three articles'),
};

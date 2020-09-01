import { GET_ARTICLE_BY_TITLE } from '../articles/queries';

export const ARTICLE_TEMPLATE = {
  id: `ArticleContentItem:1`,
  title: `Article 1`,
  htmlContent:
    '<p>This is my really good article on how to be such a Godly man. Your life will be changed if you keep reading.</p>',
  summary: 'READ THIS GUYS!',
  readTime: '10',
  publishDate: '2019-09-27T04:00:00.000Z',
  images: [
    {
      sources: [
        {
          uri:
            'https://dev-rock.christfellowship.church/GetImage.ashx?guid=54ef1562-4e7b-4012-9630-115e056554e5',
        },
      ],
    },
  ],
  author: {
    firstName: 'Todd',
    lastName: 'Mullins',
    photo: {
      uri:
        'https://dev-rock.christfellowship.church/GetImage.ashx?guid=36fe5474-a72a-4d0e-8cc0-f92793ea6f73',
    },
  },
};

export const ARTICLE_DETAIL_MOCK = {
  request: {
    query: GET_ARTICLE_BY_TITLE,
    variables: {
      title: 'article-1',
    },
  },
  result: {
    data: {
      getArticleByTitle: ARTICLE_TEMPLATE,
    },
  },
};

export const ARTICLE_DETAIL_ERROR = {
  request: {
    query: GET_ARTICLE_BY_TITLE,
    variables: {
      title: 'article-1',
    },
  },
  error: new Error('Error loading article details'),
};

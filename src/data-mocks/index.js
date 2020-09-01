// Articles
import * as ArticleCategories from './article-categories';
import * as ArticleDetails from './article-details';
import * as RelatedArticles from './related-articles';
import * as TopThreeArticles from './top-three-articles';
import * as ArticleList from './article-list';

// Features
import * as EmailCapture from './email-capture';

// Login
import * as LoginMocks from './login';

//Website Blocks
import * as WebsiteBlocks from './website-block';
import * as WebsiteGroupBlocks from './website-group-block';
// Events
import * as EventConnected from './event-connected';
import * as EventListConnected from './event-list-connected';

// Card Feed
import * as CardFeedMocks from './card-feed';

export const Articles = {
  ...ArticleCategories,
  ...ArticleDetails,
  ...RelatedArticles,
  ...TopThreeArticles,
  ...ArticleList,
};

export const Features = {
  ...EmailCapture,
};

export const Login = {
  ...LoginMocks,
};

export const WebBlocks = {
  ...WebsiteBlocks,
  ...WebsiteGroupBlocks,
};

export const Events = {
  ...EventConnected,
  ...EventListConnected,
};

export const CardFeed = {
  ...CardFeedMocks,
};

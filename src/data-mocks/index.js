// Articles
import * as ArticleCategories from './article-categories'
import * as ArticleDetails from './article-details'
import * as RelatedArticles from './related-articles'
import * as TopThreeArticles from './top-three-articles'
import * as ArticleList from './article-list'

export const Articles = {
    ...ArticleCategories,
    ...ArticleDetails,
    ...RelatedArticles,
    ...TopThreeArticles,
    ...ArticleList,
}

// Features
import * as EmailCapture from './email-capture'

export const Features = {
    ...EmailCapture,
}

// Login
import * as LoginMocks from './login'

export const Login = {
    ...LoginMocks,
}

//Website Blocks
import * as WebsiteBlocks from './website-block'
import * as WebsiteGroupBlocks from './website-group-block'

export const WebBlocks ={
    ...WebsiteBlocks,
    ...WebsiteGroupBlocks
}
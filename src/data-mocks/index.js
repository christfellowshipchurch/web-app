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
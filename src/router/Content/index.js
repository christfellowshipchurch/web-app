import React from 'react'
import {
    Switch, Route, Redirect,
} from 'react-router-dom'
import { useQuery } from 'react-apollo'
import { get, last, capitalize, join, camelCase } from 'lodash'

import { GET_CATEGORY_BY_TITLE } from './queries'
import ContentSingle from '../../content-single'
import { CardFeed } from '../../content-feed'
import { Loader } from '../../ui'

const ContentSingleWithRouter = ({ match: { params: { contentTitle = '' } = {} } } = {}) => {
    const id = last(contentTitle.split('-'))
    return (
        <ContentSingle
            itemId={`UniversalContentItem:${id}`}
        />
    )
}

const CardFeedWithRouter = ({ match: { params: { collectionTitle = '' } = {} } } = {}) => {
    const id = last(collectionTitle.split('-'))
    const capitalizeWords = collectionTitle.split('-').slice(0, -1).map( n => capitalize(n))
    const title = join(capitalizeWords, ' ')

    return (
        <div
            className="container-fluid px-3"
            style={{ minHeight: '100%' }}
        >
            <div className="row align-content-center mt-6 mb-n6">
                <h2 className='col-10'>
                    {title}
                </h2>
                <a 
                 className='col-2 my-auto'
                 href='/'
                >
                    <h4 className='font-weight-normal text-sm-left text-md-right mb-0'>
                        Go Back
                    </h4>
                </a>
            </div>
            <div className="row">
                <CardFeed
                    id={`UniversalContentItem:${id}`}
                />           
            </div>
        </div>
    )
}

const CategoryUrlMapper = ({ match: { params: { category } } }) => {
    const { loading, error, data } = useQuery(
        GET_CATEGORY_BY_TITLE,
        { variables: { title: category }, fetchPolicy: 'cache-and-network' },
    )

    if (loading) return <Loader />
    if (error) return null

    const categoryData = get(data, 'getCategoryByTitle', {})

    return (
        <div
            className="container-fluid"
            style={{ minHeight: '100%' }}
        >
            <div className="row align-content-center mt-6 mb-n6">
                <h3>
                    {get(categoryData, 'title', '')}
                </h3>
            </div>
            <div className="row">
                <CardFeed id={get(categoryData, 'id', '')} />
            </div>
        </div>
    )
}

const Router = () => (
    <Switch>
        <Route exact path="/content/categories/:category" component={CategoryUrlMapper} />
        <Route exact path="/content/:contentTitle" component={ContentSingleWithRouter} />
        <Route exact path="/content/collection/:collectionTitle" component={CardFeedWithRouter} />

        <Route path="*">
            <Redirect to="/browse" />
        </Route>
    </Switch>
)

export default Router

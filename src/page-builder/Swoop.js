import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
    useQuery
} from 'react-apollo'

import {
    mapEdgesToNodes,
} from '../utils'

import { GET_BLOCK_ITEMS } from './queries'

import Loader from '../ui/Loader'
import { htmlToReactParser } from '../utils'

import {
    Block,
    GroupBlock,
    HeroSection,
    Media,
    Swoop as SwoopElement,
} from '../ui'
import { Feature } from '../features'
import { get, camelCase, lowerCase } from 'lodash'

const mapItemToVisual = (item, bg) => {
    switch (item.__typename) {
        case 'WebsiteBlockItem':
            item.contentLayout = camelCase(item.contentLayout)
            switch (get(item, 'contentLayout', '')) {
                case 'backgroundLarge':
                    return <HeroSection
                        title={get(item, 'title', '')}
                        htmlContent={get(item, 'htmlContent', '')}
                        image={{
                            uri: get(item, 'images[0].sources[0].uri', ''),
                            alt: `Christ Fellowship Church - ${get(item, 'title', '')}`,
                        }}
                        video={{ uri: get(item, 'videos[0].sources[0].uri', '') }}
                        callToAction={get(item, 'callToAction', null)}
                        secondaryCallToAction={get(item, 'secondaryCallToAction', null)}
                    />
                case 'backgroundSmall':
                    return (
                        <Media
                            videoUrl={get(item, 'videos[0].sources[0].uri', '')}
                            imageUrl={get(item, 'images[0].sources[0].uri', '')}
                            imageAlt={`Christ Fellowship Church - ${get(item, 'title', '')}`}
                            className="text-white"
                            overlay="black"
                        >
                            <Block
                                withAnimation
                                contentLayout="default"
                                title={get(item, 'title', '')}
                                htmlContent={get(item, 'htmlContent', '')}
                                callToAction={get(item, 'callToAction', null)}
                                secondaryCallToAction={get(item, 'secondaryCallToAction', null)}
                                variant="dark"
                            />
                        </Media>
                    )
                default:
                    return <Block
                        withAnimation
                        {...item}
                        variant={bg.includes('primary') ? 'dark' : 'light'}
                    />
            }
            break
        case 'WebsiteGroupItem':
            return <GroupBlock {...item} withAnimation />
        case 'WebsiteHtmlBlockItem':
            return <div>{htmlToReactParser.parse(item.htmlContent)}</div>
            break
        case 'WebsiteFeature':
            return (
                <div className={classnames("col", 'px-4')}>
                    <Feature 
                        name={get(item, 'feature', '')} 
                        background={bg}     
                        {...item}
                    />
                </div>
            )
        default:
            return <h1 className={classnames("text-center")}>{item.title}</h1>
    }
}

const Swoop = ({
    title,
    backgroundColors,
    backgroundImages,
    swoopTypes,
}) => {
    const website = process.env.REACT_APP_WEBSITE_KEY
    const { loading, error, data } = useQuery(
        GET_BLOCK_ITEMS,
        { variables: { website, title } }
    )

    if (loading) return (
        <div className="vh-100 vw-100 d-flex justify-content-center align-items-center bg-light">
            <Loader />
        </div>
    )

    if (error) {
        console.error("ERROR: ", { error })
        return <h1 className="text-center">There was an error loading the page. Please try again.</h1>
    }

    let bgIndex = 0

    const blockItems = mapEdgesToNodes(data.getWebsitePageContentByTitle.childContentItemsConnection)

    return blockItems.map((item, i) => {
        const id = lowerCase(get(item, 'title', '')).replace(/\s/g, '-')
        const index = bgIndex % backgroundColors.length
        const bg = backgroundColors[index]
        const ignoreSwoop = camelCase(get(item, 'contentLayout', '')).includes('background')
            || get(item, 'groupLayout', '') === 'tabs'

        if (!camelCase(get(item, 'contentLayout', '')).includes('background'))
            bgIndex++

        return (
            <div id={id} className={`${bg} p-relative overflow-hidden`} key={i}>
                {!!get(swoopTypes, `[${index}]`, false) && !ignoreSwoop &&
                    <SwoopElement type={swoopTypes[index]} />
                }
                {mapItemToVisual(item, bg)}
            </div>
        )
    })
}

Swoop.defaultProps = {
    title: 'home',
    backgroundColors: ['bg-transparent', 'bg-white', 'bg-primary'],
    swoopTypes: ['bottom', null, 'top'],
}

Swoop.propTypes = {
    title: PropTypes.string,
    backgroundColors: PropTypes.array,
    backgroundImages: PropTypes.array,
}

export default Swoop

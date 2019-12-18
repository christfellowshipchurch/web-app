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

import {
    Block,
    BackgroundContentBlock,
    GroupBlock,
    HeroSection,
    Media,
} from '../ui'
import { Feature } from '../features'
import { get, camelCase, lowerCase } from 'lodash'
import BottomSwoopSVG from '../images/bottom_swoop.svg'
import TopSwoopSVG from '../images/top_swoop.svg'

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
        case 'WebsiteFeature':
            return (
                <div className={classnames("col", 'px-4')}>
                    <Feature name={get(item, 'feature', '')} background={bg} />
                </div>
            )
        default:
            return <h1 className={classnames("text-center")}>{item.title}</h1>
    }
}

const BottomSwoop = () => <img
    src={BottomSwoopSVG}
    className={classnames(
        'swoop',
        'swoop-bottom'
    )}
/>

const TopSwoop = () => <img
    src={TopSwoopSVG}
    className={classnames(
        'swoop',
        'swoop-top'
    )}
/>

const Swoop = ({
    title,
    backgroundColors,
    backgroundImages,
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
            || (item.__typename === 'WebsiteGroupItem' && get(item, 'groupLayout', '') !== 'accordion')

        if (!camelCase(get(item, 'contentLayout', '')).includes('background'))
            bgIndex++

        return (
            <div id={id} className={`${bg} p-relative overflow-hidden`} key={i}>
                {!!get(backgroundImages, `[${index}]`, false) && !ignoreSwoop &&
                    React.createElement(backgroundImages[index])}
                {mapItemToVisual(item, bg)}
            </div>
        )
    })
}

Swoop.defaultProps = {
    title: 'home',
    backgroundColors: ['bg-transparent', 'bg-white', 'bg-primary'],
    backgroundImages: [BottomSwoop, null, TopSwoop],
}

Swoop.propTypes = {
    title: PropTypes.string,
    backgroundColors: PropTypes.array,
    backgroundImages: PropTypes.array,
}

export default Swoop

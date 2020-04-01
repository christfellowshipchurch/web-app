import React from 'react';
import PropTypes from 'prop-types';
import MetaTags from 'react-meta-tags';

const metaTags = ({ title, description, keywords, openGraphProtocols, twitterProtocols, image }) => {
    return (
        <MetaTags>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords.join(',')} />
            <meta property='og:image' content={image} />

            {openGraphProtocols.map((n, i) => <meta property={`og:${n.name}`} content={n.content} key={i} />)}
            {twitterProtocols.map((n, i) => <meta name={`twitter:${n.name}`} content={n.content} key={i} />)}
        </MetaTags>
    )
}

const defaultItems = {
    title: 'Christ Fellowship Church',
    description: 'At Christ Fellowship Church, our goal is to help you know God, grow in your relationships, and discover your purpose so that you can impact the world.',
    url: 'https://christfellowship.church'
}

const propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    keywords: PropTypes.arrayOf(PropTypes.string),
    openGraphProtocols: PropTypes.arrayOf(PropTypes.object),
    twitterProtocols: PropTypes.arrayOf(PropTypes.object),
    image: PropTypes.string
}
const defaultProps = {
    title: defaultItems.title,
    description: defaultItems.description,
    keywords: ['Church', 'Christ Fellowship', 'Christ Fellowship Church', 'Churches in South Florida'],
    openGraphProtocols: [
        { property: 'title', content: defaultItems.title },
        { property: 'description', content: defaultItems.description },
        { property: 'image', content: '' },
        { property: 'site_name', content: defaultItems.title },
        { property: 'url', content: 'https://christfellowship.church' },
        { property: 'type', content: 'website' },
    ],
    twitterProtocols: [
        { name: 'title', content: defaultItems.title },
        { name: 'description', content: defaultItems.description },
        { name: 'image', content: '' },
        { name: 'url', content: defaultItems.url },
    ],
    image: 'https://cloudfront.christfellowship.church/GetImage.ashx?guid=378fe8f3-9ae1-487a-9468-165f12bfef9b'
}

metaTags.propTypes = propTypes;
metaTags.defaultProps = defaultProps;

export default metaTags;
import React from 'react';
import PropTypes from 'prop-types';
import MetaTags from 'react-meta-tags';

const metaTags = ({ title, description, keywords, openGraphProtocols, twitterProtocols }) => {
    return (
        <MetaTags>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords.join(',')} />

            {openGraphProtocols.map((n, i) => <meta name={`og:${n.name}`} content={n.content} key={i} />)}
            {twitterProtocols.map((n, i) => <meta name={`twitter:${n.name}`} content={n.content} key={i} />)}
        </MetaTags>
    )
}

const defaultItems = {
    title: 'Christ Fellowship Church',
    description: 'At Christ Fellowship Church, our goal is to help you know God, grow in your relationships, and discover your purpose so that you can impact the world.',
    url: 'https://gochristfellowship.com'
}

const propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    keywords: PropTypes.arrayOf(PropTypes.string),
    openGraphProtocols: PropTypes.arrayOf(PropTypes.object),
    twitterProtocols: PropTypes.arrayOf(PropTypes.object),
}
const defaultProps = {
    title: defaultItems.title,
    description: defaultItems.description,
    keywords: ['Church', 'Christ Fellowship', 'Christ Fellowship Church', 'Churches in South Florida'],
    openGraphProtocols: [
        { name: 'title', content: defaultItems.title },
        { name: 'description', content: defaultItems.description },
        { name: 'image', content: '' },
        { name: 'site_name', content: defaultItems.title },
        { name: 'url', content: 'https://gochristfellowship.com' },
        { name: 'type', content: 'website' },
    ],
    twitterProtocols: [
        { name: 'title', content: defaultItems.title },
        { name: 'description', content: defaultItems.description },
        { name: 'image', content: '' },
        { name: 'url', content: defaultItems.url },
    ]
}

metaTags.propTypes = propTypes;
metaTags.defaultProps = defaultProps;

export default metaTags;
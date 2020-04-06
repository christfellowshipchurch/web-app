import React from 'react';
import PropTypes from 'prop-types';
import MetaTags from 'react-meta-tags';

const Metadata = ({
    tags,
}) => (
        <MetaTags>
            {tags.map((tag, i) => {
                switch (tag.name) {
                    case 'title':
                        return (
                            <>
                                <title>{tag.content}</title>
                                <meta property="og:title" content={tag.content} />
                                <meta name="twitter:title" content={tag.content} />
                            </>
                        );
                    case 'description':
                        return (
                            <>
                                <meta name="description" content={tag.content} />
                                <meta property="og:description" content={tag.content} />
                                <meta name="twitter:description" content={tag.content} />
                            </>
                        );
                    case 'image':
                        return (
                            <>
                                <meta property="og:image" content={tag.content} />
                                <meta name="twitter:image" content={tag.content} />
                            </>
                        );
                    case 'author':
                        return (
                            <>
                                <meta name="author" content={tag.content} />
                                <meta property="og:article:author" content={tag.content} />
                                <meta name="twitter:creator" content={tag.content} />
                            </>
                        );
                    case 'url':
                        return (
                            <>
                                <meta property="og:url" content={tag.content} />
                                <meta name="twitter:url" content={tag.content} />
                            </>
                        );
                    default:
                        return (
                            <meta
                                key={`${tag.name}:${i}`}
                                {...(tag.name.startsWith('og:')
                                    ? { property: tag.name }
                                    : { name: tag.name }
                                )}
                                content={tag.content}
                            />
                        );
                }
            })}
        </MetaTags>
    );

const defaultItems = {
    title: 'Christ Fellowship Church',
    description: "Christ Fellowship is a church in South Florida that helps you thrive in every area of life. Christ Fellowship Church's passion is to help you know God, grow in your relationship with God & others, and discover your purpose so that you can impact the world.",
    url: 'https://christfellowship.church',
};

Metadata.propTypes = {
    tags: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        content: PropTypes.string,
    })),
};

Metadata.defaultProps = {
    tags: [
        { name: 'title', content: 'Christ Fellowship Church' },
        { name: 'description', content: "Christ Fellowship is a church in South Florida that helps you thrive in every area of life. Christ Fellowship Church's passion is to help you know God, grow in your relationship with God & others, and discover your purpose so that you can impact the world." },
        { name: 'url', content: 'https://christfellowship.church' },
        { name: 'og:type', content: 'website' },
    ],
};

const defaultProps = {
    title: defaultItems.title,
    description: defaultItems.description,
    keywords: ['Church', 'Christ Fellowship', 'Christ Fellowship Church', 'Churches in South Florida'],
    openGraphProtocols: [
        { name: 'title', content: defaultItems.title },
        { name: 'description', content: defaultItems.description },
        { name: 'image', content: '' },
        { name: 'site_name', content: defaultItems.title },
        { name: 'url', content: 'https://christfellowship.church' },
        { name: 'type', content: 'website' },
    ],
    twitterProtocols: [
        { name: 'title', content: defaultItems.title },
        { name: 'description', content: defaultItems.description },
        { name: 'image', content: '' },
        { name: 'url', content: defaultItems.url },
    ],
};

export default Metadata;

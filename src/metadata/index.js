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
                        return [
                            <title key={`${tag.name}:${i}`}>{tag.content}</title>,
                            <meta property="og:title" content={tag.content} key={`og:${tag.name}:${i}`} />,
                            <meta name="twitter:title" content={tag.content} key={`twitter:${tag.name}:${i}`} />,
                        ];
                    case 'description':
                        return [
                            <meta name="description" content={tag.content} key={`${tag.name}:${i}`} />,
                            <meta property="og:description" content={tag.content} key={`og:${tag.name}:${i}`} />,
                            <meta name="twitter:description" content={tag.content} key={`twitter:${tag.name}:${i}`} />,
                        ];
                    case 'image':
                        return [
                            <meta property="og:image" content={tag.content} key={`og:${tag.name}:${i}`} />,
                            <meta name="twitter:image" content={tag.content} key={`twitter:${tag.name}:${i}`} />,
                        ];
                    case 'author':
                        return [
                            <meta name="author" content={tag.content} key={`${tag.name}:${i}`} />,
                            <meta property="og:article:author" content={tag.content} key={`og:${tag.name}:${i}`} />,
                            <meta name="twitter:creator" content={tag.content} key={`twitter:${tag.name}:${i}`} />,
                        ];
                    case 'url':
                        return [
                            <meta property="og:url" content={tag.content} key={`og:${tag.name}:${i}`} />,
                            <meta name="twitter:url" content={tag.content} key={`twitter:${tag.name}:${i}`} />,
                        ];
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

Metadata.propTypes = {
    tags: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        content: PropTypes.string,
    })),
};

Metadata.defaultProps = {
    tags: [
        { name: 'title', content: 'Christ Fellowship Church' },
        { name: 'keywords', content: 'Church,Christ Fellowship,Christ Fellowship Church,Churches in South Florida' },
        { name: 'description', content: "Christ Fellowship is a church in South Florida that helps you thrive in every area of life. Christ Fellowship Church's passion is to help you know God, grow in your relationship with God & others, and discover your purpose so that you can impact the world." },
        { name: 'url', content: 'https://christfellowship.church' },
        { name: 'og:type', content: 'website' },
        { name: 'image', content: 'https://rock.christfellowship.church/Content/images/CF-Worship-Generic.jpg' },
    ],
};

export default Metadata;

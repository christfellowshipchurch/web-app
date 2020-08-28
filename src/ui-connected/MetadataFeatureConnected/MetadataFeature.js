import React from 'react';
import PropTypes from 'prop-types';
import MetaTags from 'react-meta-tags';


const MetadataFeature = ({ title, meta }) => (
    <MetaTags>
            {meta.map((tag, i) => {
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

MetadataFeature.propTypes = {
    title: PropTypes.string,
    meta: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        content: PropTypes.string,
    })),
};

MetadataFeature.defaultProps = {
    meta: [],
};

export default MetadataFeature;

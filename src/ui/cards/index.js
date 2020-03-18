import { get, kebabCase } from 'lodash';

export { default as Card } from './EmptyCard';
export { default as FloatingCard } from './FloatingCard';
export { default as ContentCard } from './ContentCard';
export { default as TileRowCard } from './TileRowCard';
export { default as HighlightCard } from './HighlightCard';


export const generateUrlLink = ({
    urlBase, title, id, redirectUrl,
}) => {
    const href = {
        target: '',
        href: '#',
    };

    if (!title || title === '') return href;

    if (redirectUrl) {
        href.href = redirectUrl;
    } else {
        const prefix = kebabCase(title.toUpperCase());
        const suffix = urlBase === 'content'
            ? `-${get(id.split(':'), '[1]', '')}`
            : '';

        href.href = `/${urlBase}/${prefix}${suffix}`;
    }

    if (href.href.includes('http')) href.target = '_blank';

    return href;
};

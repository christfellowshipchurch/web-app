import { get, kebabCase } from 'lodash';

export { default as Card } from './EmptyCard';
export { default as FloatingCard } from './FloatingCard';
export { default as ContentCard } from './ContentCard';
export { default as TileRowCard } from './TileRowCard';
export { default as HighlightCard } from './HighlightCard';


export const generateUrlLink = ({ urlBase, title, id }) => {
    if (!title || title === '') return '#';

    const prefix = kebabCase(title.toUpperCase());
    const suffix = urlBase === 'content'
        ? `-${get(id.split(':'), '[1]', '')}`
        : '';

    return `/${urlBase}/${prefix}${suffix}`;
};

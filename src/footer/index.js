import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';
import {
    get,
    find,
    camelCase,
} from 'lodash';

import FooterBar from './Footer';
import { GET_WEBSITE_FOOTER } from './queries';


const Footer = ({ brandImageKey }) => {
    const website = process.env.REACT_APP_WEBSITE_KEY;
    const {
        loading,
        error,
        data,
    } = useQuery(GET_WEBSITE_FOOTER, {
        variables: { website },
        fetchPolicy: 'cache-and-network',
    });
    const footer = get(data, 'getWebsiteNavigation', {});
    const brandImage = find(get(footer, 'images', []),
        ({ name }) => camelCase(name) === camelCase(brandImageKey));
    const socialMediaLinks = get(footer, 'socialMediaLinks', []);
    const footerLinks = get(footer, 'footerLinks', []);

    if (loading || error) return <nav className="navbar navbar-expand-lg navbar-light bg-light" />;

    return (
        <FooterBar
            imgUrl={get(brandImage, 'sources[0].uri', '')}
            // footerLinks={footerLinks}
            socialMediaLinks={socialMediaLinks}
        />
    );
};

Footer.propTypes = {
    brandImageKey: PropTypes.string,
};

Footer.defaultProps = {
    brandImageKey: 'brandImageAlt',
};

export default Footer;

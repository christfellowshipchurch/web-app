import React from 'react'
import { useQuery } from 'react-apollo'
import {
    get
} from 'lodash'

import FooterBar from './Footer'
import { GET_WEBSITE_FOOTER } from './queries'


const Footer = () => {
    const website = process.env.REACT_APP_WEBSITE_KEY
    const {
        loading,
        error,
        data
    } = useQuery(GET_WEBSITE_FOOTER, {
        variables: { website },
        fetchPolicy: "cache-and-network"
    })
    const footer = get(data, 'getWebsiteNavigation', {})
    const brandImage = get(footer, 'images[0].sources[0].uri', '')
    const socialMediaLinks = get(footer, 'socialMediaLinks', [])
    const footerLinks = get(footer, 'footerLinks', [])

    if (loading || error) return <nav className="navbar navbar-expand-lg navbar-light bg-light"></nav>

    return(
        <FooterBar
            imgUrl={brandImage}
            // footerLinks={footerLinks}
            socialMediaLinks={socialMediaLinks}
        />
    )
}

export default Footer
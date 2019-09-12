import React from 'react'
import {
    Query
} from 'react-apollo'
import {
    toLower
} from 'lodash'

import getWebsiteFooter from '../../queries/getWebsiteFooter'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare, faInstagram, faYoutube, faTwitter } from '@fortawesome/free-brands-svg-icons'

const SM_ICONS = {
    facebook: faFacebookSquare,
    instagram: faInstagram,
    youtube: faYoutube,
    twitter: faTwitter
}

const Footer = () => {
    const website = process.env.REACT_APP_WEBSITE_KEY

    return (
        <Query query={getWebsiteFooter} variables={{ website }} fetchPolicy="cache-and-network">
            {({ loading, error, data }) => {

                if (loading) return <nav className="navbar navbar-expand-lg navbar-light bg-light"></nav>
                if (error) return <nav className="navbar navbar-expand-lg navbar-light bg-light"></nav>

                data = data.getWebsiteNavigation

                return (
                    <div className="container-fluid py-5 bg-black">
                        <div className="row justify-content-center">
                            <div className="col text-center">
                                {data.socialMediaLinks.map(({ call, action }, i) => (
                                    <a href={action} key={i} className="text-white mx-3">
                                        <FontAwesomeIcon icon={SM_ICONS[toLower(call)]} size='2x' />
                                    </a>
                                ))}
                            </div>
                        </div>
                        <hr className='bg-light w-75 my-3'></hr>
                        <div className="row">
                            <div className="col px-3 max-width-800">
                                <p className='text-center text-light'>
                                    {`${new Date().getFullYear()} Christ Fellowship Church. All Rights Reserved`}
                                </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col text-center max-width-800">
                                {data.footerLinks.map((link, i) => (
                                    <a key={i}
                                        href="/#"
                                        className='text-light text-uppercase font-weight-bold mx-3'
                                        onClick={() => { }}>
                                        {link.call}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                )
            }}
        </Query>
    )
}

export default Footer
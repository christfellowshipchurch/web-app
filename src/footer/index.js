import React from 'react'
import classnames from 'classnames'
import { useQuery } from 'react-apollo'
import {
    get,
    toLower
} from 'lodash'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faFacebookSquare,
    faInstagram,
    faYoutube,
    faTwitter
} from '@fortawesome/free-brands-svg-icons'

import { GET_WEBSITE_FOOTER } from './queries'

const SM_ICONS = {
    facebook: faFacebookSquare,
    instagram: faInstagram,
    youtube: faYoutube,
    twitter: faTwitter
}

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

    if (loading || error) return <nav className="navbar navbar-expand-lg navbar-light bg-light"></nav>

    const footer = get(data, 'getWebsiteNavigation', {})
    const verticalMargin = classnames(
        'my-2',
        'my-lg-4'
    )

    return (
        <div
            className={classnames(
                "container-fluid",
                "bg-dark",
                "footer",
                "py-5",
                "py-lg-6",
            )}
        >
            <div
                className={classnames(
                    "row",
                    verticalMargin
                )}
            >
                <div className="col text-center">
                    {get(footer, 'socialMediaLinks', []).map(({ call, action }, i) => (
                        <a href={action} key={i} className="text-white mx-3">
                            <FontAwesomeIcon icon={SM_ICONS[toLower(call)]} size='2x' />
                        </a>
                    ))}
                </div>
            </div>

            <hr
                className={classnames(
                    'bg-light',
                    'w-75',
                    verticalMargin
                )}
            ></hr>

            <div
                className={classnames(
                    "row",
                    verticalMargin
                )}
            >
                <div className="col px-3 max-width-800 mx-auto">
                    <p className='text-center text-light m-0'>
                        {`${new Date().getFullYear()} Christ Fellowship Church. All Rights Reserved`}
                    </p>
                </div>
            </div>

            <div
                className={classnames(
                    "row",
                    verticalMargin
                )}
            >
                <div className="col text-center max-width-800 mx-auto">
                    {get(footer, 'footerLinks', []).map((link, i) => (
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
}

export default Footer
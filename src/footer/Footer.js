import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { chunk } from 'lodash'
import { toLower} from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faFacebookSquare,
    faInstagram,
    faYoutube,
    faTwitter
} from '@fortawesome/free-brands-svg-icons'

import { useAuth } from '../auth'

const SM_ICONS = {
    facebook: faFacebookSquare,
    instagram: faInstagram,
    youtube: faYoutube,
    twitter: faTwitter
}

const Footer = ({
    imgUrl,
    phone,
    email,
    locations,
    footerLinks,
    socialMediaLinks
}) => {
    
    const { isLoggedIn, logIn } = useAuth()

    return (
        <div>
            {/* Top Dark Bar */}
            <div
                className={classnames(
                    'bg-dark',
                    'pl-3',
                    'py-2',
                    'row'
                )}
            >
                {/* Brand and Contact Info */}
                <div className={classnames(
                    'col',
                    'mt-4',
                    'mr-6',
                    'ml-md-5',
                    'pr-4',
                    'd-flex',
                    'justify-content-lg-end',
                    'justify-content-md-start'
                )}>
                    <div className={classnames(
                        'd-flex',
                        'flex-column',
                        'text-left'
                    )}>
                    <div className='mb-3'>
                        <img
                            src={imgUrl}
                            alt='Brand Image'
                            style={{ height: 60, width: 'auto' }}
                        />
                    </div>
                    <a 
                        href={`tel:${phone}`}
                        className={classnames(
                            'text-light',
                            'font-weight-light'
                        )}
                    >
                        {phone}
                    </a>
                    <a 
                        href={`mailto:${email}`}
                        target='_blank'
                        className={classnames(
                            'text-light',
                            'font-weight-light'
                        )}
                    >
                        {email}
                    </a>
                        {!isLoggedIn &&
                            <a
                                className={classnames(
                                    'text-light',
                                    'font-weight-light'
                                )}
                                href='#login'
                                onClick={() => { 
                                    logIn()
                                 }}
                            >
                                Login
                            </a>
                        }
                    </div>
                </div>
                {/* Locations Section*/}
                <div className={classnames(
                    'col-xs-12',
                    'text-left',
                    'mt-4',
                    'ml-md-5',
                    'ml-lg-0'
                )}>
                    <h4 className={classnames(
                        'text-white',
                        'text-uppercase',
                        'pb-3',
                        'mb-1'
                    )}>
                        Locations
                    </h4>
                    <div className='row'>
                    {chunk(locations, 6).map((n, i) => (
                        <div 
                            key={i}
                            className={classnames(
                                'col-xs-12',
                                'flex-column',
                                'd-flex',
                                'mr-6',
                                'pr-4'
                            )}
                        >
                            {n.map((link, i) => (
                                <a key={i}
                                    href={link.action}
                                    className={classnames(
                                        'text-light',
                                        'font-weight-light'
                                    )}
                                >
                                    {link.call}
                                </a>
                            ))}
                        </div>
                    ))}
                    </div> 
                </div>
                {/* About Section */}
                <div className={classnames(
                    'col',
                    'text-left',
                    'd-flex',
                    'flex-column',
                    'mr-6',
                    'pr-4',
                    'my-4',
                    'ml-md-5',
                    'ml-lg-0'
                )}>
                    <h4 className={classnames(
                        'text-white',
                        'text-uppercase',
                        'pb-3',
                        'mb-1'
                    )}>
                        About
                    </h4>
                    {footerLinks.map((link, i) => (
                        <a key={i}
                            href={link.action}
                            className={classnames(
                                'text-light',
                                'font-weight-light'
                            )}
                            onClick={() => { }}>
                            {link.call}
                        </a>
                    ))}
                </div>
            </div>
            {/* Bottom Light Bar */}
            <div
                className={classnames(
                    'bg-white',
                    "footer",
                    'py-3'
                )}
            >
                <div
                    className={classnames(
                        "row",
                        'my-2'
                    )}
                >
                    <div className={classnames(
                        'col',
                        'text-center'
                    )}>
                        {socialMediaLinks.map(({ call, action }, i) => (
                            <a 
                                href={action} 
                                target='_blank'
                                key={i} 
                                className="text-primary mx-3"
                            >
                                <FontAwesomeIcon
                                    icon={SM_ICONS[toLower(call)]}
                                    size='2x'
                                />
                            </a>
                        ))}
                    </div>
                </div>

                <div
                    className={classnames(
                        "row",
                        'pb-2'
                    )}
                >
                    <div className="col px-3">
                        <p className='text-center text-dark m-0'>
                            {`${new Date().getFullYear()} Christ Fellowship Church. All Rights Reserved`}
                        </p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Footer

Footer.propTypes = {
    imgUrl: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    footerLinks: PropTypes.arrayOf(
        PropTypes.shape({
            call: PropTypes.string,
            action: PropTypes.string,
        })
    ),
    locations: PropTypes.arrayOf(
        PropTypes.shape({
            call: PropTypes.string,
            action: PropTypes.string,
        })
    ),
    socialMediaLinks: PropTypes.arrayOf(
        PropTypes.shape({
            call: PropTypes.string,
            action: PropTypes.string,
        })
    ),
}

Footer.defaultProps = {
    imgUrl: '',
    phone: '(561)799-7600',
    email: 'hello@cftoday.org',
    footerLinks: [
        { call: 'Leadership', action: '/about-page' },
        { call: 'History', action: '/about-page' },
        { call: 'Core Values', action: '/about-page' },
        { call: 'Beliefs', action: '/about-page' },
        { call: 'Privacy Policy', action: '/privacy-policy' },
        { call: 'Terms of Use', action: '/terms-of-use' },
    ],
    locations: [
        { call: 'Palm Beach Gardens', action: '/palm-beach-gardens-page' },
        { call: 'Royal Palm Beach', action: '/royal-palm-beach-page' },
        { call: 'Stuart', action: '/stuart-page' },
        { call: 'Port St. Lucie', action: '/port-st-lucie-page' },
        { call: 'Jupiter', action: '/jupiter-page' },
        { call: 'Downtown WPB', action: '/downtown-wpb-page' },
        { call: 'Boyton Beach', action: '/boyton-beach-page' },
        { call: 'Okeechobee', action: '/okeechobee-page' },
        { call: 'Belle Glade', action: '/belle-glade-page' },
        { call: 'CF En Espanol', action: '/cf-en-espanol-page' },
        { call: 'Church Online', action: '/church-online-page' }
    ],
    socialMediaLinks: []
}

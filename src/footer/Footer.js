import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { chunk, toLower } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebookSquare,
    faInstagram,
    faYoutube,
    faTwitter,
} from '@fortawesome/free-brands-svg-icons';

import { useAuth } from '../auth';

const SM_ICONS = {
    facebook: faFacebookSquare,
    instagram: faInstagram,
    youtube: faYoutube,
    twitter: faTwitter,
};

const LinkColumn = ({ children }) => (
    <div
        className={classnames(
            'd-flex',
            'justify-content-lg-center',
            'my-4',
        )}
        style={{ flex: 1 }}
    >
        <div className={classnames(
            'd-flex',
            'flex-column',
        )}
        >
            {children}

        </div>
    </div>
);

const Link = ({ href, title }) => (
    <a
        href={href}
        className={classnames(
            'text-light',
            'font-weight-light',
        )}
    >
        {title}
    </a>
);

const Footer = ({
    imgUrl,
    phone,
    email,
    locations,
    footerLinks,
    socialMediaLinks,
}) => {
    const { isLoggedIn, logIn } = useAuth();

    return (
        <div className={classnames('bg-dark')}>
            {/* Top Dark Bar */}
            <div
                className={classnames(
                    'd-flex',
                    'flex-column',
                    'flex-md-row',
                    'max-width-800',
                    'mx-auto',
                    'px-4',
                )}
            >
                {/* Brand and Contact Info */}
                <LinkColumn>
                    <div className="mb-1">
                        <img
                            src={imgUrl}
                            alt="Brand Icon"
                            style={{ height: 60, width: 'auto' }}
                        />
                    </div>

                    <Link href={`tel:${phone}`} title={phone} />
                    <Link href={`mailto:${email}`} title={email} />
                </LinkColumn>

                {/* Brand and Contact Info */}
                <LinkColumn>
                    <h4 className={classnames(
                        'text-white',
                        'text-uppercase',
                        'mb-1',
                    )}
                    >
                        About
          </h4>

                    {footerLinks.map((link, i) => (
                        <Link
                            key={i}
                            href={link.action}
                            title={link.call}
                        />
                    ))}
                </LinkColumn>
            </div>
            {/* Bottom Light Bar */}
            <div
                className={classnames(
                    'bg-white',
                    'footer',
                    'py-3',
                )}
            >
                <div
                    className={classnames(
                        'row',
                        'my-2',
                    )}
                >
                    <div className={classnames(
                        'col',
                        'text-center',
                    )}
                    >
                        {socialMediaLinks.map(({ call, action }, i) => (
                            <a
                                href={action}
                                target="_blank"
                                key={i}
                                className="text-primary mx-3"
                            >
                                <FontAwesomeIcon
                                    icon={SM_ICONS[toLower(call)]}
                                    size="2x"
                                />
                            </a>
                        ))}
                    </div>
                </div>

                <div
                    className={classnames(
                        'row',
                        'pb-2',
                    )}
                >
                    <div className="col px-3">
                        <p className="text-center text-dark m-0">
                            {`${new Date().getFullYear()} Christ Fellowship Church. All Rights Reserved`}
                        </p>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Footer;

Footer.propTypes = {
    imgUrl: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    footerLinks: PropTypes.arrayOf(
        PropTypes.shape({
            call: PropTypes.string,
            action: PropTypes.string,
        }),
    ),
    locations: PropTypes.arrayOf(
        PropTypes.shape({
            call: PropTypes.string,
            action: PropTypes.string,
        }),
    ),
    socialMediaLinks: PropTypes.arrayOf(
        PropTypes.shape({
            call: PropTypes.string,
            action: PropTypes.string,
        }),
    ),
};

Footer.defaultProps = {
    imgUrl: '',
    phone: '(561)799-7600',
    email: 'hello@christfellowship.church',
    footerLinks: [
        { call: 'Leadership', action: '/about-page' },
        { call: 'History', action: '/about-page' },
        { call: 'Core Values', action: '/about-page' },
        { call: 'Beliefs', action: '/about-page' },
        { call: 'Privacy Policy', action: '/privacy-policy' },
        { call: 'Terms of Use', action: '/terms-of-use' },
    ],
    locations: [
        { call: 'Palm Beach Gardens', action: '/locations/palm-beach-gardens' },
        { call: 'Royal Palm Beach', action: '/locations/royal-palm-beach' },
        { call: 'Stuart', action: '/locations/stuart' },
        { call: 'Port St. Lucie', action: '/locations/port-st-lucie' },
        { call: 'Jupiter', action: '/locations/jupiter' },
        { call: 'Downtown WPB', action: '/locations/downtown-wpb' },
        { call: 'Boyton Beach', action: '/locations/boyton-beach' },
        { call: 'Okeechobee', action: '/locations/okeechobee' },
        { call: 'Belle Glade', action: '/locations/belle-glade' },
        { call: 'CF En Español', action: '/locations/cf-en-espanol' },
        { call: 'Church Online', action: '/locations/church-online' },
    ],
    socialMediaLinks: [],
};

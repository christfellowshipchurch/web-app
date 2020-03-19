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
            'mb-4',
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
    resourceLinks,
    connectLinks,
    aboutLinks,
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
                    'container-fluid',
                    'mx-auto',
                    'px-4',
                    'pt-4',
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

                {/* Resource Col */}
                <LinkColumn>
                    <h4 className={classnames(
                        'text-white',
                        'text-uppercase',
                        'mb-1',
                    )}
                    >
                        Resources
          </h4>

                    {resourceLinks.map((link, i) => (
                        <Link
                            key={i}
                            href={link.action}
                            title={link.call}
                        />
                    ))}
                </LinkColumn>

                {/* Connect Col */}
                <LinkColumn>
                    <h4 className={classnames(
                        'text-white',
                        'text-uppercase',
                        'mb-1',
                    )}
                    >
                        Connect
          </h4>

                    {connectLinks.map((link, i) => (
                        <Link
                            key={i}
                            href={link.action}
                            title={link.call}
                        />
                    ))}
                </LinkColumn>

                {/* About Col */}
                <LinkColumn>
                    <h4 className={classnames(
                        'text-white',
                        'text-uppercase',
                        'mb-1',
                    )}
                    >
                        About
          </h4>

                    {aboutLinks.map((link, i) => (
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
    aboutLinks: PropTypes.arrayOf(
        PropTypes.shape({
            call: PropTypes.string,
            action: PropTypes.string,
        }),
    ),
    resourceLinks: PropTypes.arrayOf(
        PropTypes.shape({
            call: PropTypes.string,
            action: PropTypes.string,
        }),
    ),
    connectLinks: PropTypes.arrayOf(
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
    aboutLinks: [
        { call: 'Our Leadership', action: '/about-page' },
        { call: 'Privacy Policy', action: '/privacy-policy' },
        { call: 'Terms of Use', action: '/terms-of-use' },
    ],
    resourceLinks: [
        { call: 'Church Online', action: '/#' },
        { call: 'Past Messages', action: '/#' },
        { call: 'Ministry Updates', action: '/#' },
    ],
    connectLinks: [
        { call: 'First Time Here', action: '/#' },
        { call: 'Submit Prayer Request', action: '/#' },
        { call: 'Join Us In Prayer', action: '/#' },
        { call: 'Give Online', action: '/#' },
    ],
    socialMediaLinks: [],
};

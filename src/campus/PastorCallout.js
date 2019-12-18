import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

import { Card, Media } from '../ui'

const PastorCallout = ({
    firstName,
    lastName,
    email,
    image,
    callToAction,
}) => {
    const fullName = `${firstName} ${lastName}`

    return (
        <Card
            className={classnames(
                "col-11",
                "col-lg-10",
                "my-6",
                "px-2",
                'bg-white',
                'max-width-1100'
            )}
        >
            <div
                className={classnames(
                    "row",
                    'align-items-center'
                )}
            >
                <div
                    className={classnames(
                        'col-12',
                        'col-md-2',
                        "p-2"
                    )}
                >
                    <Media
                        circle
                        imageAlt={`Christ Fellowship Church - ${fullName} Pastor`}
                        imageUrl={image}
                    />
                </div>
                <div
                    className={classnames(
                        'col-12',
                        'col-md-7',
                        "p-2"
                    )}
                >
                    <h2 className="">
                        Campus Pastor
                            </h2>
                    <h4
                        className={classnames(
                            'text-dark',
                            'font-weight-normal',
                        )}
                    >
                        {firstName} {lastName}
                    </h4>
                    <h4
                        style={{ textOverflow: 'ellipsis' }}
                        className={classnames(
                            'text-dark',
                            'font-weight-normal',
                        )}
                    >
                        {email}
                    </h4>
                </div>
                <div
                    className={classnames(
                        'col-12',
                        'col-md-3',
                    )}
                >
                    <a
                        href={`mailto:${email}`}
                        className={classnames(
                            'btn',
                            'btn-primary',
                            'text-uppercase',
                            'float-md-right'
                        )}
                    >
                        {callToAction}
                    </a>
                </div>
            </div>
        </Card >
    )
}

PastorCallout.propTypes = {
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    callToAction: PropTypes.string,
    image: PropTypes.string,
}

PastorCallout.defaultProps = {
    callToAction: 'Contact'
}

export default PastorCallout
import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { get, camelCase, lowerCase } from 'lodash'
import {
    useQuery
} from 'react-apollo'


import { Media, Swoop } from '../ui'
import { GET_CAMPUS } from './queries'

import PastorCallout from './PastorCallout'
import AtThisLocation from './AtThisLocation'
import CampusFAQ from './CampusFAQ'
import CampusBlockItems from './CampusBlockItems'
import { CampusTile } from '../features/CampusSelect'

const CampusPageBuilder = ({ name: campusName }) => {
    const {
        loading,
        data: {
            campus: {
                name,
                image,
                featuredImage,
                campusFeatures,
                street1,
                city,
                state,
                postalCode,
                serviceTimes,
                pastor: {
                    firstName,
                    lastName,
                    email,
                    photo: {
                        uri: pastorUri
                    } = {}
                } = {}
            } = {}
        } = {}
    } = useQuery(
        GET_CAMPUS,
        { variables: { name: campusName } }
    )
    const valueTitle = 'A Place Where You Can Belong'
    const valueProposition = `At Christ Fellowship Church in ${name}, we have weekend church services where you can experience uplifting worship, powerful messages from our pastors, special programming for your family, and an opportunity to meet other amazing people like you!`

    return (
        <div>
            <div className="row">
                <div className="col">
                    <Media
                        ratio={{ xs: '1by1', lg: '21by9' }}
                        imageUrl={get(featuredImage, 'uri', '')}
                        imageAlt={`Christ Fellowship Church - ${name}`}
                        overlay='black'
                        mediaItemStyles={{ zIndex: -100 }}
                    >
                        <div
                            className={classnames(
                                "location-banner",
                                'd-flex',
                                'justify-content-center',
                                'align-items-center',
                            )}
                        >
                            <h1 className="text-white text-center">
                                {loading
                                    ? 'Christ Fellowship Church'
                                    : `Christ Fellowship Church in ${name}`}
                            </h1>
                        </div>
                    </Media>
                </div>
            </div>
            <div
                className={classnames(
                    "row",
                    'justify-content-center',
                    'bg-white'
                )}
            >
                <div
                    className={classnames(
                        "col",
                        "col-lg-8",
                        "text-center",
                        "py-6",
                        "px-3",
                    )}
                >
                    <h2>
                        {valueTitle}
                    </h2>
                    <p>
                        {valueProposition}
                    </p>
                </div>
            </div>

            {!loading && <div className="w-100 h-100 p-relative overflow-hidden">
                <Swoop type='bottom' />
                <CampusTile
                    className={classnames(
                        'mx-auto',
                        'py-6'
                    )}
                    name={name}
                    image={image}
                    street1={street1}
                    city={city}
                    state={state}
                    postalCode={postalCode}
                    serviceTimes={serviceTimes}
                />
            </div>}

            <div className="row bg-white">
                <div className="col">
                    <CampusBlockItems campus={campusName} />
                </div>
            </div>

            <div
                className={classnames(
                    'row',
                    'py-4',
                    'p-relative',
                    'overflow-hidden',
                )}
            >
                <Swoop type='top' />
                <div className="col-12 text-center py-4">
                    <h1>
                        Available at this location
                    </h1>
                </div>
                <div className="col-12">
                    <AtThisLocation features={campusFeatures} />
                </div>
            </div>

            <div className="row max-width-1100 mx-auto my-6">
                <div className="col">
                    <CampusFAQ />
                </div>
            </div>

            {!loading && <div
                className={classnames(
                    "row",
                    'justify-content-center',
                )}
            >
                <PastorCallout
                    firstName={firstName}
                    lastName={lastName}
                    email={email}
                    callToAction='Contact'
                    image={pastorUri}
                />
            </div>}
        </div>
    )
}

CampusPageBuilder.defaultProps = {
    name: '',
}

CampusPageBuilder.propTypes = {
    name: PropTypes.string,
}

export default CampusPageBuilder

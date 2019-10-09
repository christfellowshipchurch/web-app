import React, { useState } from 'react'
import gql from 'graphql-tag'
import classnames from 'classnames'
import { get } from 'lodash'

import {
    Carousel
} from 'react-bootstrap'
import FloatingCard from '../components/ui/FloatingCard'
import Identity from './Identity'
import Passcode from './Passcode'
import ProfileInformation from './ProfileInformation'

import { useAuthQuery } from '../auth'

const GET_CURRENT_PERSON = gql`
    query {
        currentUser {
            profile {
                firstName
                lastName
            }
        }
    }
`

const LoginCard = () => {
    const { data } = useAuthQuery(GET_CURRENT_PERSON)
    const [payload, setPayload] = useState(null)
    const [index, setIndex] = useState(0)

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex)
    }

    return (
        <FloatingCard>
            <h2
                className={classnames(
                    "text-center",
                    'mb-4'
                )}
            >
                Login
            </h2>
            <h4 className="text-center">
                {`${get(data, 'currentUser.profile.firstName', 'NOPE')} ${get(data, 'currentUser.profile.lastName', 'NA UH')}`}
            </h4>

            <Carousel
                activeIndex={index}
                onSelect={handleSelect}
                controls={false}
                indicators={false}
                interval={null}
            >
                <Carousel.Item>
                    <Identity
                        update={({ identity, isExistingIdentity, type }) => {
                            setPayload({ identity, isExistingIdentity, type })
                            setIndex(1)
                        }}
                    />
                </Carousel.Item>

                <Carousel.Item>
                    <Passcode
                        identity={get(payload, 'identity', null)}
                        isExistingIdentity={get(payload, 'isExistingIdentity', false)}
                        type={get(payload, 'type', 'sms')}
                        update={({ identity, passcode, isExistingIdentity }) => {
                            console.log("Passcode Update")
                            setPayload({ identity, passcode })
                            setIndex(isExistingIdentity ? 3 : 2)
                        }}
                    />
                </Carousel.Item>

                <Carousel.Item>
                    <ProfileInformation
                        identity={get(payload, 'identity', null)}
                        passcode={get(payload, 'passcode', null)}
                        update={() => setIndex(3)}
                    />
                </Carousel.Item>

                <Carousel.Item>
                    <h2 className="text-center text-success">
                        You're now logged in!
                    </h2>
                </Carousel.Item>
            </Carousel>
        </FloatingCard>
    )
}

export default LoginCard
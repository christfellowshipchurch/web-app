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

import { useAuth, useAuthQuery } from '../auth'

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
    const { hideLogIn } = useAuth()
    const [payload, setPayload] = useState(null)
    const [index, setIndex] = useState(0)

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex)
    }

    return (
        <FloatingCard
            onPressExit={() => hideLogIn()}
        >
            <h2
                className={classnames(
                    "text-center",
                    'mb-4'
                )}
            >
                Login
            </h2>

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
                        update={(props) => {
                            const requestedEmailPin = get(props, 'requestedEmailPin', false)

                            if (requestedEmailPin) {
                                setIndex(4)
                            } else {
                                const {
                                    identity,
                                    passcode,
                                    isExistingIdentity
                                } = props
                                setPayload({ identity, passcode })

                                if (isExistingIdentity) {
                                    hideLogIn()
                                } else {
                                    setIndex(2)
                                }
                            }
                        }}
                    />
                </Carousel.Item>

                <Carousel.Item>
                    <ProfileInformation
                        identity={get(payload, 'identity', null)}
                        passcode={get(payload, 'passcode', null)}
                        update={() => hideLogIn()}
                    />
                </Carousel.Item>

                <Carousel.Item>
                    <h2 className="text-center text-success">
                        You're now logged in!
                    </h2>
                </Carousel.Item>

                <Carousel.Item>
                    <h1 className="text-center text-primary">
                        <i className="fal fa-envelope fa-3x"></i>
                    </h1>

                    <h3 className="text-center text-primary">
                        You should get an email with instructions on how to reset your password.
                    </h3>
                </Carousel.Item>
            </Carousel>
        </FloatingCard>
    )
}

export default LoginCard
import React from 'react'
import gql from 'graphql-tag'
import { get } from 'lodash'
import { Loader, Media } from '@christfellowshipchurch/web-ui-kit'

import { useAuthQuery } from '../../auth'

const GET_CURRENT_PERSON = gql`
    query {
        currentUser {
            profile {
                firstName
                lastName
                
                photo {
                    uri
                }
            }
        }
    }
`

const AuthHomePage = () => {
    const { loading, error, data } = useAuthQuery(GET_CURRENT_PERSON)

    if (error) return <h1 className="text-danger">...oops</h1>

    if (loading) return (
        <div className="w-100 h-100">
            <Loader />
        </div>
    )

    return (
        <div className="container my-6">
            <div className="row">
                <div className="col text-center">
                    <h2 className="text-success">
                        Welcome to your internal Christ Fellowship Church account
                    </h2>
                </div>
            </div>

            <div className="row justify-content-center my-4">
                <div className="col-3">
                    <Media
                        imageUrl={get(data, 'currentUser.profile.photo.uri', '')}
                        imageAlt={`Christ Fellowship Church - ${get(data, 'currentUser.firstName', '')}`}
                        circle
                    />
                </div>
            </div>

            <div className="row">
                <div className="col text-center">
                    <h1>
                        {`${get(data, 'currentUser.profile.firstName')} ${get(data, 'currentUser.profile.lastName')}`}
                    </h1>
                </div>
            </div>
        </div>
    )
}

export default AuthHomePage

import React, { useState } from 'react'
import { get } from 'lodash'
import { Carousel } from 'react-bootstrap'

import { Loader } from '../ui'
import { useAuthQuery } from '../auth'

import { GET_CURRENT_PERSON } from './queries'
import CurrentProfile from './CurrentProfile'
import EditCurrentProfile from './EditCurrentProfile'
import EditUserProfile from './EditUserProfile'
import ProfileBanner from './ProfileBanner'

const Profile = () => {
    const [on, setOnSave] = useState(false)
    const [index, setIndex] = useState(0)

    const { loading, error, data } = useAuthQuery(GET_CURRENT_PERSON)

    if (loading) return (
        <Loader />
    )

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex)
    }

    return (
        <>
            <ProfileBanner
                coverImage={
                    get(data, 'currentUser.profile.campus.featuredImage.uri', '')
                }
                profileImage={
                    get(data, 'currentUser.profile.photo.uri', 'https://i0.wp.com/acaweb.org/wp-content/uploads/2018/12/profile-placeholder.png?fit=300%2C300&ssl=1')
                }
                name={`${get(data, 'currentUser.profile.firstName')} ${get(data, 'currentUser.profile.lastName')}`}
                campus={get(data, 'currentUser.profile.campus.name', 'Campus Name')}
                onEdit={() => {
                    //Edit Profile not completed
                    handleSelect(1)
                }}
                onSave={() => {
                    handleSelect(0)
                }}
                onCancel={() => {
                    handleSelect(0)
                }}
            />

            <Carousel
                activeIndex={index}
                onSelect={handleSelect}
                controls={false}
                indicators={false}
                interval={null}
                touch={false}
            >
                <Carousel.Item>
                    <CurrentProfile />
                </Carousel.Item>
                <Carousel.Item>
                    <EditUserProfile />
                    {/* <EditCurrentProfile /> */}
                </Carousel.Item>
                <Carousel.Item />
            </Carousel>
        </>
    )
}


export default Profile

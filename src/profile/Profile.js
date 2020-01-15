import React, { useState } from 'react'

import EditUserProfile from './EditUserProfile'
import UserProfile from './UserProfile'

const Profile = ({ edit }) => {
    const [index, setIndex] = useState(0)
    
    const [ editMode, setEditMode] = useState(false)

    return editMode
    ? <EditUserProfile
        onChange={() => setEditMode(false)}
    />
    : <UserProfile
        onChange={() => setEditMode(true)}
    />}

export default Profile

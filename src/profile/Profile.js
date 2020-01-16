import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import EditUserProfile from './EditUserProfile'
import UserProfile from './UserProfile'

const Profile = ({ edit }) => {
    const [editMode, setEditMode] = useState(edit)

    return <div
        style={{ display: 'grid' }}
    >
        <div
            className={classnames({
                'opacity-100': editMode,
                'opacity-0': !editMode,
            })}
            style={{
                gridColumn: 1,
                gridRow: 1,
                pointerEvents: editMode ? 'all' : 'none'
            }}
        >
            <EditUserProfile
                onChange={() => setEditMode(false)}
            />
        </div>

        <div
            className={classnames({
                'opacity-0': editMode,
                'opacity-100': !editMode,
            },
            )}
            style={{
                gridColumn: 1,
                gridRow: 1,
                pointerEvents: editMode ? 'none' : 'all'
            }}
        >
            <UserProfile
                onChange={() => setEditMode(true)}
            />
        </div>
    </div>
}

Profile.propTypes = {
    edit: PropTypes.bool,
}

Profile.defaultProps = {
    edit: false,
}

export default Profile

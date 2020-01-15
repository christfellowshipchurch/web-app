import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { get } from 'lodash'
import { useAuthQuery } from '../auth'

import { GET_CURRENT_PERSON } from './queries'
import { Media, Button, Loader } from '../ui'

const ProfileBanner = ({
  coverImage,
  profileImage,
  name,
  campus,
  editMode,
  onEdit,
  onSave,
  onCancel
}) => {

  const [edit, setEdit] = useState(editMode)

  const { loading, error, data } = useAuthQuery(GET_CURRENT_PERSON)

  return (
    <div>
      <div className='row'>
        <div className={classnames(
          'col-12',
        )}
        >
          {loading
            ? <div
                className={
                  'w-100'
                }
                style={{
                  height: '300px',
                }}
              >
                <Loader />
              </div>
            :
            < Media
              imageUrl={get(data, 'currentUser.profile.campus.featuredImage.uri', '')}
              imageAlt='cover-photo'
              ratio={{ xs: "1by1", sm: "16by9", md: '16by9', lg: '21by9' }}
              gradient="black"
              style={{ maxHeight: 350 }}
              className='w-100'
              forceRatio
            >
              <div
                className={classnames(
                  'd-flex',
                  'flex-column',
                  'align-items-center',
                )}
              >
                {/* Profile Image */}
                <Media
                  imageUrl={
                    get(data, 'currentUser.profile.photo.uri', 'https://i0.wp.com/acaweb.org/wp-content/uploads/2018/12/profile-placeholder.png?fit=300%2C300&ssl=1')
                  }
                  imageAlt='profile-photo'
                  circle
                  className='w-75 m-auto shadow-lg'
                />
                <h1 className={classnames(
                  'text-white',
                  'text-center',
                  'mt-3',
                  'mb-0'
                )}>
                  {/* Profile Name */}
                  {`${get(data, 'currentUser.profile.firstName')} ${get(data, 'currentUser.profile.lastName')}`}
                </h1>
                <p
                  className={classnames(
                    'text-white',
                    'text-center',
                    'font-weight-light',
                    'mb-2'
                  )}
                >
                  {/* Campus Name */}
                  {get(data, 'currentUser.profile.campus.name', 'Campus Name')}
                </p>
                {edit
                  ?
                  <>
                    <Button
                      className='p-2 w-75'
                      title='Save'
                      size='sm'
                      onClick={
                        (e) => {
                          e.preventDefault()
                          onSave()
                          setEdit(false)
                        }}
                    />
                    <Button
                      className='text-white text-upper'
                      title='cancel'
                      type='link'
                      size='sm'
                      onClick={
                        (e) => {
                          e.preventDefault()
                          onCancel()
                          setEdit(false)
                        }}
                    />
                  </>
                  :
                  <Button
                    className='p-2 w-75'
                    title='Edit Profile'
                    onClick={
                      (e) => {
                        e.preventDefault()
                        onEdit()
                        setEdit(true)
                      }}
                    type='light'
                    size='sm'
                  />
                }
              </div>
            </Media>}
        </div>
    </div>
    </div >
  )
}

ProfileBanner.propTypes = {
  coverImage: PropTypes.string,
  profileImage: PropTypes.string,
  name: PropTypes.string,
  campus: PropTypes.string,
  editMode: PropTypes.bool,
  onEdit: PropTypes.func,
  onSave: PropTypes.func,
  onCancel: PropTypes.func
}

ProfileBanner.defaultProps = {
  coverImage: '',
  profileImage: 'https://i0.wp.com/acaweb.org/wp-content/uploads/2018/12/profile-placeholder.png?fit=300%2C300&ssl=1',
  name: 'Abiding Aaron',
  campus: 'Royal Palm Beach',
  edit: false,
  onEdit: () => true,
  onSave: () => true,
  onCancel: () => true
}

export default ProfileBanner

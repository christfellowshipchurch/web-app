import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { Media, Button } from '../ui'

const ProfileBanner = ({
  coverImage,
  profileImage,
  name,
  campus,
  onEdit,
  onSave,
  onCancel
}) => {

  const [ edit, setEdit ] = useState()

  return (
    <div 
      className='container-fluid'
    >
      <div className='row'>
        <div className={classnames(
          'col-12',
        )}
        >
          <Media
            imageUrl={coverImage}
            imageAlt='cover-photo'
            className='profile-banner'
            ratio="1by1"
            gradient="black"
          >
            <div 
              className={classnames(
                'd-flex',
                'flex-column',
                'align-items-center',
              )}
            >
              <Media
                imageUrl={profileImage}
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
                {name}
              </h1>
              <p
                className={classnames(
                  'text-white',
                  'text-center',
                  'font-weight-light',
                  'mb-2'
                )}
              >
                {campus}
              </p>
              {edit
              ?               
                <>
                  <Button 
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
                    //Edit Profile not completed
                    // onClick={
                    //   (e) => {
                    //     e.preventDefault()
                    //     onEdit()
                    //     setEdit(true)
                    //   }}
                    type='light'
                    size='sm'
                />        
              }
            </div>
            

          </Media>
        </div>
      </div>
    </div>
  )
}

ProfileBanner.propTypes = {
  coverImage: PropTypes.string,
  profileImage: PropTypes.string,
  name: PropTypes.string,
  campus: PropTypes.string,
  onEdit: PropTypes.func,
  onSave: PropTypes.func,
  onCancel: PropTypes.func
}

ProfileBanner.defaultProps = {
  coverImage: '',
  profileImage: 'https://i0.wp.com/acaweb.org/wp-content/uploads/2018/12/profile-placeholder.png?fit=300%2C300&ssl=1',
  name: 'Abiding Aaron',
  campus: 'Royal Palm Beach',
  onEdit: () => true,
  onSave: () => true,
  onCancel: () => true
}

export default ProfileBanner

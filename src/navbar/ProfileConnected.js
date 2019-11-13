import React from 'react'
import { Query, useQuery } from 'react-apollo'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { get, has } from 'lodash'

import { Dropdown } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/pro-light-svg-icons'
import { faBell } from '@fortawesome/pro-regular-svg-icons'
import { Media } from '@christfellowshipchurch/web-ui-kit'

import { useAuth, useAuthQuery } from '../auth'
import { GET_PROFILE_IMAGE } from './queries'

const ProfileConnected = () => {
  const { logout } = useAuth()
  const { loading, error, data } = useAuthQuery(GET_PROFILE_IMAGE)

  if (has(data, 'currentUser.profile')) return (
      <>
                                {/* ------------------- Desktop Profile ------------------- */}
        <div
          className={classnames(
            'd-none',
            'd-lg-block'
          )}
        >
          <div
            className={classnames(
              'd-flex',
              'align-items-center',
              'flex-row',
              'flex-lg-row-reverse',
              'mx-3'
            )}
          >
            <Dropdown
              alignRight
              style={{ minWidth: 0 }}
            >
              <Dropdown.Toggle
                variant='none'
                style={{ fontSize: '35px' }}
                // onClick={
                //   ()=> setMenuIcon(!menuIcon)
                // }
                className={classnames(
                  "px-2",
                  "px-lg-3",
                )}
              >
                <FontAwesomeIcon
                  icon={faTimes
                    // menuIcon
                    //   ? faTimes
                    //   : faBars
                  }
                  color='grey'
                />
              </Dropdown.Toggle>

              <Dropdown.Menu
                className={classnames(
                  'border-0',
                  'shadow',
                  'rounded',
                  'py-4',
                )}
                style={{ minWidth: 0 }}
              >
                <Dropdown.Item>
                  About Christ Fellowship
                </Dropdown.Item>
                <Dropdown.Item>
                  Church Locations
                </Dropdown.Item>
                <Dropdown.Item>
                  Contact
                </Dropdown.Item>
                <Dropdown.Divider
                  className='mx-3'
                  style={{ color: 'grey' }}
                />
                <Dropdown.Item
                  href="#"
                  onClick={() => logout()}
                  style={{ minWidth: 0 }}
                >
                  Logout
                  </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            {get(data, 'currentUser.profile.photo.uri', '') !== ''
              ? (
                <div
                  style={{ width: 48, height: 48 }}
                  className='mx-2'
                >
                  <Media
                    imageUrl={get(data, 'currentUser.profile.photo.uri', '')}
                    imageAlt={`Christ Fellowship Church - ${get(data, 'currentUser.profile.firstName')}`}
                    ratio="1by1"
                    circle
                  />
                </div>
              )
              : <i className="fal fa-user-circle fa-2x"></i>
            }

            <p
              className={classnames(
                "font-weight-normal",
                'mb-0',
                'ml-4',
              )}
            >
              {get(data, 'currentUser.profile.firstName')}
            </p>

            {/* Notification Bell */}
            <FontAwesomeIcon
              style={{ fontSize: '28px' }}
              icon={faBell}
              className='ml-5'
            />

          </div>
        </div>

                                {/* ------------------- Mobile Profile ------------------- */}

        <div
          className={classnames(
            'd-lg-none',
            'ml-3',
            'mt-5'
          )}
        >
          <div
            className={classnames(
              'd-flex',
              'align-items-center',
              'pb-3'
            )}
          >
            {get(data, 'currentUser.profile.photo.uri', '') !== ''
              ? (
                <div
                  style={{ width: 48, height: 48 }}
                  className='mx-2'
                >
                  <Media
                    imageUrl={get(data, 'currentUser.profile.photo.uri', '')}
                    imageAlt={`Christ Fellowship Church - ${get(data, 'currentUser.profile.firstName')}`}
                    ratio="1by1"
                    circle
                  />
                </div>
              )
              : <i className="fal fa-user-circle fa-2x"></i>
            }
            <p
              className={classnames(
                'font-weight-bold',
                'text-dark',
                'mb-0'
              )}
            >{get(data, 'currentUser.profile.firstName')}</p>
          </div>
        
          <div
            className={classnames(
              'd-flex',
              'flex-column',
              'font-weight-bold',
              'text-dark',
              'ml-2'
            )}
          >
            <a className='pb-1'>
                My Profile
            </a>
            <a className='pb-2'>
                Preferences
            </a>
          </div>   
        </div>
      </>
      )

  // log out on error

  if (loading) return <i className="fal fa-user-circle fa-2x"></i>
}

export default ProfileConnected

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { get, has } from 'lodash'

import { Dropdown } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/pro-light-svg-icons'
import { Media } from '@christfellowshipchurch/web-ui-kit'

import { useAuth, useAuthQuery } from '../../auth'
import { GET_PROFILE_IMAGE } from '../queries'
import ContactUsButton from './ContactUsButton'

const ProfileConnected = ({ dropDownLinks }) => {
  const { logout } = useAuth()
  const { loading, error, data } = useAuthQuery(GET_PROFILE_IMAGE)
  const [menuIcon, setMenuIcon] = useState(false)

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
            onToggle={(isOpen) => setMenuIcon(isOpen)}
          >
            <Dropdown.Toggle
              variant='none'
              style={{ fontSize: '35px' }}
              className={classnames(
                "px-2",
                "px-lg-3",
              )}
            >
              <FontAwesomeIcon
                icon={
                  menuIcon
                    ? faTimes
                    : faBars
                }
                color="#525252"
                style={{ minWidth: '32px' }}
              />
            </Dropdown.Toggle>


            <Dropdown.Menu
              className={classnames(
                'border-0',
                'shadow',
                'rounded',
                'py-4',
                'my-2',
                'px-3'
              )}
            >
              {dropDownLinks.map((link, i) => (
                <Dropdown.Item
                  key={i}
                  href={link.action}
                  className={classnames(
                    'py-2',
                    'pl-3',
                    'pr-4',
                    'nav-link',
                    'text-dark',
                    'no-decoration',
                  )}
                >
                  {link.call}
                </Dropdown.Item>
              ))}
              <ContactUsButton
                className={classnames(
                  'dropdown-item',
                  'py-2',
                  'pl-3',
                  'pr-4',
                  'nav-link',
                  'text-dark',
                  'no-decoration',
                )}
              >
                Contact Us
              </ContactUsButton>

              <Dropdown.Divider
                className='w-100'
                style={{ color: 'grey' }}
              />
              <Dropdown.Item
                className={classnames(
                  'py-2',
                  'pl-3',
                  'pr-4',
                  'nav-link',
                  'text-dark',
                  'no-decoration',
                )}
                onClick={() => logout()}
              >
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <a
            href='/profile'
            className={classnames(
              'd-flex',
              'align-items-center',
              'cursor-hover',
              'text-dark',
            )}
          >
            <p
              className={classnames(
                'mb-0',
                'ml-4',
                'p-1',
                'nav-link',
              )}
            >
              {get(data, 'currentUser.profile.firstName')}
            </p>
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
          </a>


        </div>
      </div>

      {/* ------------------- Mobile Profile ------------------- */}

      <div
        className={classnames(
          'd-lg-none',
          'mt-5',
          'pl-4'
        )}
      >
        <a
          href='/profile'
          className={classnames(
            'd-flex',
            'align-items-center',
            'pb-3',
            'nav-link',
            'text-dark',
            'px-0'
          )}
        >
          {get(data, 'currentUser.profile.photo.uri', '') !== ''
            ? (
              <div
                style={{ width: 48, height: 48 }}
                className='mr-2'
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
          {get(data, 'currentUser.profile.firstName')}
        </a>

        <div
          className={classnames(
            'd-flex',
            'flex-column',
            'nav-link',
            'text-dark',
            'px-0'
          )}
        >
          <a
            href='/profile'
            className='my-1 text-dark'
          >
            My Profile
          </a>
          <a
            href='/profile'
            className='my-1 text-dark'
          >
            Preferences
          </a>
        </div>
      </div>
    </>
  )

  // log out on error

  if (loading) return <i className="fal fa-user-circle fa-2x"></i>
}

ProfileConnected.propTypes = {
  dropDownLinks: PropTypes.arrayOf(
    PropTypes.shape({
      call: PropTypes.string,
      action: PropTypes.string,
    }))
}

ProfileConnected.defaultProps = {
  dropDownLinks: [
    {
      call: 'About Christ Fellowship',
      action: ''
    },
    {
      call: 'Church Locations',
      action: ''
    },
    {
      call: 'Request Prayer',
      action: ''
    },
    {
      call: 'Contact',
      action: ''
    }
  ]
}

export default ProfileConnected

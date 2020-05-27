import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { get } from 'lodash'

import { Dropdown } from 'react-bootstrap'
import { Bars, Times } from '../../ui/Icons'

import { useAuth, useAuthQuery } from '../../auth'
import { GET_PROFILE_IMAGE, GET_WEBSITE_HEADER_LOGGED_IN } from '../queries'
import ContactUsButton from './ContactUsButton'

import { Media } from '../../ui'

import { Icon } from '../../ui/Icons'
import { redirectTo } from '../../utils'

const ProfileConnected = ({ dropDownLinks }) => {
  const { logout, logIn, isLoggedIn } = useAuth()
  const { loading, error, data } = useAuthQuery(GET_PROFILE_IMAGE, GET_WEBSITE_HEADER_LOGGED_IN)
  const [menuIcon, setMenuIcon] = useState(false)

  return (
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
              style={{ fontSize: '32px' }}
              className={classnames(
                "px-2",
                "px-lg-3",
              )}
            >
              {React.createElement(
                menuIcon
                ? Times
                : Bars,
                {
                  fill:"#525252"
                }
              )}
            </Dropdown.Toggle>


            <Dropdown.Menu
              style={{ border: '1px solid rgba(0,0,0,.05)' }}
              className={classnames(
                'shadow',
                'rounded',
                'py-3',
                'px-2',
                'mt-1'
              )}
              show={menuIcon}
            >
              {dropDownLinks.map((link, i) => (
                <Dropdown.Item
                  key={i}
                  href={link.action}
                  className={classnames(
                    'mb-1',
                    'mr-3',
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
                  'mb-2',
                  'nav-link',
                  'text-dark',
                  'no-decoration',
                )}
              >
                Contact Us
              </ContactUsButton>

              <Dropdown.Divider
                className='w-100 my-0 mx-2'
                style={{ color: 'grey' }}
              />
              <Dropdown.Item
                className={classnames(
                  'mt-1',
                  'pl-3',
                  'pr-4',
                  'nav-link',
                  'text-dark',
                  'no-decoration',
                )}
                onClick={() => isLoggedIn
                  ? logout()
                  : logIn()
                }
              >
                {isLoggedIn
                  ? 'Logout'
                  : 'Login'
                }
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <a
            onClick={() => isLoggedIn
              ? redirectTo('/profile')
              : logIn()
            }
            className={classnames(
              'd-flex',
              'align-items-center',
              'cursor-hover',
              'text-dark',
            )}
          >
            {loading && <Icon name='user-circle' size={30} />}
            {get(data, 'currentUser.profile.photo.uri', '') !== ''
              ? (
                <div
                  style={{ width: 48, height: 48 }}
                >
                  <Media
                    imageUrl={get(data, 'currentUser.profile.photo.uri', '')}
                    imageAlt={`Christ Fellowship Church - ${get(data, 'currentUser.profile.firstName')}`}
                    ratio="1by1"
                    circle
                    className='opacity-hover'
                  />
                </div>
              )
              : <Icon 
                  name='user-circle'
                  size={30}
                  fill='#353535'
                />
            }
          </a>


        </div>
      </div>

      {/* ------------------- Mobile Profile ------------------- */}

      <div
        className={classnames(
          'd-lg-none',
          'mt-3',
          'pt-1',
          'pl-4'
        )}
      >
        <div
          onClick={() => isLoggedIn
            ? redirectTo('/profile')
            : logIn()
          }
          className={classnames(
            'd-flex',
            'align-items-center',
            'pb-0',
            'nav-link',
            'text-dark',
            'px-0',
            'pt-2'
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
            : <Icon 
                name='user-circle'
                size={48}
                fill='#353535'
              />
          }
          <p
            className={classnames(
              'mb-0',
              'ml-2'
            )}
          >
            {isLoggedIn
                ? get(data, 'currentUser.profile.firstName')
                : 'Sign In'
            }
          </p>
        </div>
      </div>
    </>
  )
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

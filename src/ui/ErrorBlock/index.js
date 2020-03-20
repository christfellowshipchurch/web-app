import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  bookImage,
  onlineIcon,
  contactIcon,
  homeIcon,
  sermonIcon
} from './images'

const ErrorLink = ({ icon, call, action }) => (
  <div className={classnames(
    'row',
    'my-3',
    'd-flex',
    'align-items-center'
  )}>
    <img
      src={icon}
      style={{
        height: 40,
        width: 'auto',
      }}
    />
    <a href={action}>
      <h4 className='mb-0 pl-2'>{call}</h4>
    </a>
  </div>
)

const ErrorBlock = ({
}) => {

  return (
    <div
      className={classnames(
        'container',
        'd-flex',
        'flex-column',
        'align-items-center',
        'my-6'
      )}
    >
      <img
        src={bookImage}
        style={{
          maxWidth: 700,
        }}
      />
      <h1
        className={classnames(
          'mt-4'
        )}
      >
        Page Not Found
      </h1>
      <h4
        className={classnames(
          'font-weight-normal',
          'my-2'
        )}
      >
        The page you’re looking for doesn’t exist, or is unavailable. Here’s some helpful links instead:
      </h4>
      <div className={classnames(
        'row',
        'my-4',
        'w-75'
      )}>
        <div className='col-6'>
          <ErrorLink
            icon={onlineIcon}
            call='Watch Church Online'
            action='https://christfellowshipchurch.online.church/'
          />
          <ErrorLink
            icon={homeIcon}
            call='Go to Home Page'
            action='/'
          />
        </div>
        <div className='col-6'>
            <ErrorLink
              icon={sermonIcon}
              call='Watch the Latest Sermon'
              action='/browse'
            />
            <ErrorLink
              icon={contactIcon}
              call='Contact Us'
              action={`mailto:hello@christfellowship.church`} 
            />
        </div>
      </div>
    </div>
  )
}

ErrorBlock.propTypes = {

}

ErrorBlock.defaultProps = {

}

export default ErrorBlock
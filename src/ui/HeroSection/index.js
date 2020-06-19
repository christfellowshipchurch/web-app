import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import VisibilitySensor from 'react-visibility-sensor'
import { get } from 'lodash'
import { 
  Users, 
  BookAlt,
  Search
} from '../Icons'

import {
  Media
} from '../../ui'
import {
  htmlToReactParser,
} from '../../utils'

import SwoopImg from '../../images/cyan_hole_punch.svg'

const Swoop = () => {
  return (
    <img
      src={SwoopImg}
      style={{
        zIndex: 0,
        width: '100%'
      }}
      alt='hero swoop'
      className={classnames(
        'absolute-center',
        'h-100',
        'large-background-swoop'
      )}
    />
  )
}



const HeroSection = ({
  title,
  htmlContent,
  callToAction,
  secondaryCallToAction,
  openLinksInNewTab,
  image,
  video,
  icons
}) => {
  return (
    <VisibilitySensor
      active
      partialVisibility
      minTopValue={0}
    >
      {({ isVisible }) => {
        return (
          <>
          <Media
            ratio="16by9"
            overlay='black'
            videoUrl={get(video, 'uri', null)}
            imageUrl={get(image, 'uri', '')}
            imageAlt={get(image, 'alt', '')}
            fill="screen"
            className={classnames(
              'vw-100',
              'vh-100',
              "d-flex",
              "justify-content-center",
              "align-items-center",
            )}
          >
            <Swoop />

            <div
              className={classnames(
                'w-100',
                'max-width-1100',
                'text-center',
                'd-flex',
                'justify-content-center'
              )}
              style={{ zIndex: 1000 }}
            >
              <div
                className={classnames(
                  'hero',
                  "max-width-800",
                  'p-3',
                  'pt-5',
                  {
                    'opacity-0': !isVisible,
                    'opacity-100': isVisible,
                    'animate-slide-left-right': isVisible,
                  }
                )}
              >
                <h1 className="text-white">
                  {title}
                </h1>

                <p className="my-2 pl-0 text-white font-weight-light">
                  {htmlToReactParser.parse(htmlContent)}
                </p>

                <div className="my-3">
                  {callToAction && <a
                    href={get(callToAction, 'action', '#')}
                    target={openLinksInNewTab ? '_blank' : ''}
                    className={classnames(
                      "btn",
                      'btn-primary',
                      "min-width-250",
                    )}
                  >
                    {get(callToAction, 'call', '')}
                  </a>}
                </div>

                <div className="my-3">
                  {secondaryCallToAction && <a
                    href={get(secondaryCallToAction, 'action', '#')}
                    target={openLinksInNewTab ? '_blank' : ''}
                    className={classnames(
                      "text-white",
                    )}
                    style={{ fontSize: 16 }}
                  >
                    {get(secondaryCallToAction, 'call', '')}
                  </a>}
                </div>
              </div>
            </div>
          </Media>
          <div 
            className={classnames(
              'width-100', 
              'bg-primary'
            )}
            style={{
              height: 70,
            }}
          />
          {/* <div 
            className={classnames(
              'width-100', 
              'bg-primary',
              'd-flex',
              'justify-content-center'
            )}
          >
             <div 
              className={classnames(
                'row',
                'container-fluid',
                'mb-4'
              )}
            >
             {icons.map((n, i) => (
               <div 
                className={classnames(
                  'col-12',
                  'col-md-4',
                  'd-flex',
                  'flex-column',
                  'align-items-center',
                  'mt-4'
                )}
                key={i}
              >
                <Media
                  imageUrl={n.icon}
                  rounded
                  circle
                  style={{
                    height: 100,
                    width: 100
                  }}
                />
                <h4
                  className={classnames(
                    'text-white',
                    'pt-3',
                    'mb-0',
                  )}
                >
                  {n.title}
                </h4>
               </div>
              ))}
              </div>   
          </div> */}
          </>
        )
      }}
    </VisibilitySensor>
  )
}

HeroSection.propTypes = {
  title: PropTypes.string.isRequired,
  htmlContent: PropTypes.string,
  callToAction: PropTypes.shape({
    call: PropTypes.string.isRequired,
    action: PropTypes.string.isRequired,
  }),
  secondaryCallToAction: PropTypes.shape({
    call: PropTypes.string.isRequired,
    action: PropTypes.string.isRequired,
  }),
  image: PropTypes.shape({
    uri: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }),
  video: PropTypes.shape({
    uri: PropTypes.string.isRequired,
  }),
  icons: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string,
      title: PropTypes.string
    })
  )
}

HeroSection.defaultProps = {
  htmlContent: '',
  callToAction: null,
  secondaryCallToAction: null,
  image: null,
  video: null,
  icons: [
    {
      icon: Users,
      title: 'Find Community'
    },
    {
      icon: BookAlt,
      title: 'Grow in Your Faith'
    },
    {
      icon: Search,
      title: 'Discover Your Purpose'
    },
  ]
}

export default HeroSection
import React from 'react'
import PropTypes from 'prop-types'
import { lowerCase, includes } from 'lodash'
import Media from '../Media'


//This component handels the Default, Inverted, Left, Right Block layouts


const MEDIA_COL_12 = ['default', 'inverted']
const MEDIA_COL_FIRST = ['default', 'right']
const TEXT_CENTER = ['default', 'inverted']

const Layout = ({
  layout, imageUrl, imageAlt, videoUrl, ratio, children, className, rounded, media
}) => {
  layout = lowerCase(layout)
  const mediaColSize = includes(MEDIA_COL_12, layout) ? 'col-md-12' : 'col-md-6'
  const mediaColOrder = layout === 'inverted'
    ? 'order-last'
    : (includes(MEDIA_COL_FIRST, layout) ? 'order-first' : 'order-first order-md-last')

  const textAlignment = (includes(TEXT_CENTER, layout) ? 'text-center' : 'text-left')

  const mediaItem = media
    ? (
      <div>
        <Media {...media} />
      </div>
    )
    : imageUrl || videoUrl
      ? (
        <div>
          <Media
            ratio={ratio}
            imageUrl={imageUrl}
            imageAlt={imageAlt}
            videoUrl={videoUrl}
            rounded />
        </div>
      )
      : null

  return (
    <div className={`container-fluid ${className}`}>
      <div className="row align-items-center">
        <div className={`col-12 ${mediaColSize} ${mediaColOrder} px-3`}>
          {mediaItem}
        </div>
        <div className={`col-12 col-md ${textAlignment} px-3`}>
          {children}
        </div>
      </div>
    </div>
  )
}


const defaultProps = {
  layout: 'default',
  className: '',
}

const propTypes = {
  layout: PropTypes.string,
  className: PropTypes.string,
}

Layout.defaultProps = defaultProps
Layout.propTypes = propTypes

export default Layout































































// import React from 'react'
// import classnames from 'classnames'
// import { toLower } from 'lodash'
// import Block from '../Block'

// import ButtonRow from '../ButtonRow'

// const titleClasses = classnames(
//   'font-weight-bold'
// )
// const subtitleClasses = classnames(
//   'pt-1'
// )

// // const block = {
// //   contentLayout: 'default',
// //   images,
// //   videos,
// //   imageAlt,
// //   imageRatio,
// //   subtitle: 'subtitle',
// //   title: 'title',
// //   htmlContent: 'html content',
// //   callToAction: {call:'call', action: 'action'},
// //   secondaryCallToAction,
// //   openLinksInNewTab,
// //   className


// const Layout = ({ type, children }) => {
//   return (
//     <div className='container'>
//       <div className='row'>
//         <div className='col'>
//           { children.map((n, i) => {
//             switch (type) {
//               case 'default':
//                 return { children }
//               case 'inverted':
//                 return (
//                   <div>
                    
//                   </div>
//                 )
//               case 'left':
//                 return (
//                   <div>
                    
//                   </div>
//                 )
//               case 'right':
//                 return (
//                   <div>
                    
//                   </div>
//                 )
//             }
//           })}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Layout
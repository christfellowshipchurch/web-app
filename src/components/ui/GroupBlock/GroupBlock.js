import React from 'react'
import {
  useQuery
} from 'react-apollo'
import PropTypes from 'prop-types'
import {
  lowerCase, get, camelCase
} from 'lodash'
import {
  mapEdgesToNodes,
} from '../../../utils'
import getGroupContentItems from '../../../queries/getGroupContentItems'

import { Loader } from '@christfellowshipchurch/web-ui-kit'
import ContentBlock from '../ContentBlock'
import BackgroundContentBlock from '../BackgroundContentBlock'
import FormattedCarousel from '../FormattedCarousel'
import Accordion from '../Accordion'
import { Feature } from '../../features'


const GroupBlock = ({
  id,
  groupLayout,
  accordionType
}) => {
  const { loading, error, data } = useQuery(getGroupContentItems, { variables: { id } })

  if (loading) return (
    <div className="vh-100 vw-100 d-flex justify-content-center align-items-center bg-light">
      <Loader />
    </div>
  )
  if (error) {
    console.error("ERROR: ", error)
    return <h1 className="text-center">There was an error loading block. Please try again.</h1>
  }

  const groupTitle = get(data, 'node.title', '')
  const groupBody = get(data, 'node.htmlContent', '')
  const blockItems = mapEdgesToNodes(data.node.childContentItemsConnection)

  if (!blockItems || !blockItems.length) return null

  switch (lowerCase(groupLayout)) {
    case 'row':
      return (
        <div className="row justify-content-center">
          {blockItems.map((n, i) => {
            switch (get(n, '__typename', '')) {
              case 'WebsiteBlockItem':
                if (camelCase(get(n, 'contentLayout', '')).includes('background')) {
                  return (
                    <BackgroundContentBlock
                      {...n}
                      className="col-md-6 d-flex align-items-center"
                      key={i} />
                  )
                } else {
                  return (
                    <ContentBlock
                      {...n}
                      className="col-md-6"
                      key={i} />
                  )
                }
              case 'WebsiteFeature':
                return (
                  <div key={i} className="col col-md-6 w-100 py-6 px-4">
                    <Feature name={get(n, 'feature', '')} />
                  </div>
                )
              default:
                return null
            }
          })}
        </div>
      )
    case 'accordion':
      const paginate = accordionType === 'paginate'
      return (
        <div className="row py-6">
          <div className="col-12 text-center mb-2">
            <div className="max-width-800">
              <h2>
                {groupTitle}
              </h2>
              {groupBody}
            </div>
          </div>
          <div className="col-12 max-width-1100">
            <Accordion paginate={paginate}>
              {blockItems.map((n, i) => {
                switch (get(n, '__typename', '')) {
                  case 'WebsiteBlockItem':
                    if (camelCase(get(n, 'contentLayout', '')).includes('background')) {
                      return (
                        <BackgroundContentBlock
                          {...n}
                          className="d-flex align-items-center"
                          key={i}
                        />
                      )
                    } else {
                      return (
                        <ContentBlock
                          {...n}
                          contentLayout="default"
                          key={i}
                        />
                      )
                    }
                  case 'WebsiteFeature':
                    return (
                      <div key={i} className="w-100 py-6 px-4">
                        <Feature name={get(n, 'feature', '')} />
                      </div>
                    )
                  default:
                    return null
                }
              })}
            </Accordion>
          </div>
        </div>
      )
    case 'carousel':
      return (
        <FormattedCarousel>
          {blockItems}
        </FormattedCarousel>
      )
    default:

      return null
  }
}

GroupBlock.propTypes = {
  groupLayout: PropTypes.oneOf([
    'row', 'accordion', 'carousel',
    'Row', 'Accordion', 'Carousel',
    'none',
  ]),
  accordionType: PropTypes.oneOf(['default', 'paginate'])
}

GroupBlock.defaultProps = {
  groupLayout: 'none',
  accordionType: 'default'
}

export default GroupBlock
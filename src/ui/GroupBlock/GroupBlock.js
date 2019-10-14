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
} from '../../utils'
import getGroupContentItems from '../../queries/getGroupContentItems'

import Loader from '../Loader'
import Block from '../Block'
import BackgroundContentBlock from '../BackgroundContentBlock'
import Carousel from '../Carousel'
import Accordion from '../Accordion'
import Tabs, { TabContent } from '../Tabs'
import { Feature } from '../../components/features'


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
                    <Block
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
                        <Block
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
        <Carousel>
          {blockItems}
        </Carousel>
      )
    case 'tabs':
      return (
        <Tabs className="py-4">
          {blockItems.map((n, i) => <TabContent
            key={i}
            id={n.id}
            title={get(n, 'title', 'Click here')}
            icon={get(n, 'icon', null)}
          />)}
        </Tabs>
      )
    default:
      return null
  }
}

GroupBlock.propTypes = {
  groupLayout: PropTypes.oneOf([
    'row', 'accordion', 'carousel', 'tabs',
    'Row', 'Accordion', 'Carousel', 'Tabs',
    'none',
  ]),
  accordionType: PropTypes.oneOf(['default', 'paginate'])
}

GroupBlock.defaultProps = {
  groupLayout: 'none',
  accordionType: 'default'
}

export default GroupBlock
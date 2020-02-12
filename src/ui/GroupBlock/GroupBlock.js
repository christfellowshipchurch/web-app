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
import GET_GROUP_BLOCK from './queries'

import Loader from '../Loader'
import Block from '../Block'
import BackgroundContentBlock from '../BackgroundContentBlock'
import Carousel from '../Carousel'
import Accordion from '../Accordion'
import Tabs, { TabContent } from '../Tabs'
import { Feature } from '../../features'


const GroupBlock = ({
  id,
  title,
  groupLayout,
  accordionType,
  withAnimation,
}) => {
  const { loading, error, data } = useQuery(GET_GROUP_BLOCK, { variables: { id } })

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

  const multipleBlocks = blockItems.length > 2

  switch (lowerCase(groupLayout)) {
    case 'row':
      return (
        <div className='container-fluid py-4'>
          <div className='row py-4'>
            <div className='col'>
              <h2 className='text-center mb-0'>{multipleBlocks ? title : null}</h2>
            </div>
          </div>
          <div className='row'>
          {blockItems.map((n, i) => {
            switch (get(n, '__typename', '')) {
              case 'WebsiteBlockItem':
                if (camelCase(get(n, 'contentLayout', '')).includes('background')) {
                  return (
                    <BackgroundContentBlock
                      {...n}
                      className={`col-12 col-md-${multipleBlocks ? '6' : '4'} d-flex align-items-center`}
                      key={i}
                      withAnimation={withAnimation}
                    />
                  )
                } else {
                  return (
                    <Block
                      {...n}
                      grouped={multipleBlocks}
                      className={`col-12 col-md-${multipleBlocks? '4' : '6'} py-0`}
                      key={i}
                      withAnimation={withAnimation}
                    />
                  )
                }
              case 'WebsiteFeature':
                return (
                  <div key={i} className="col-12 col-md-6 w-100 py-6 px-4">
                    <Feature name={get(n, 'feature', '')} />
                  </div>
                )
              default:
                return null
            }
          })}
          </div>
        </div>
      )
    case 'accordion':
      const paginate = accordionType === 'paginate'
      return (
        <div className="row py-6">
          <div className="col-12 text-center mb-2">
            <div className="max-width-800 mx-auto">
              <h2>
                {groupTitle}
              </h2>
              {groupBody}
            </div>
          </div>
          <div className="col-12 max-width-1100 mx-auto">
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
  accordionType: PropTypes.oneOf(['default', 'paginate']),
  withAnimation: PropTypes.bool,
}

GroupBlock.defaultProps = {
  groupLayout: 'none',
  accordionType: 'default',
  withAnimation: false,
}

export default GroupBlock
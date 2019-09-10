import React from 'react'
import {
  useQuery
} from 'react-apollo'
import {
  lowerCase, get
} from 'lodash'
import {
  mapEdgesToNodes,
} from '../../../utils'
import getGroupContentItems from '../../../queries/getGroupContentItems'

import { Accordion, Row, Loader } from '@christfellowshipchurch/web-ui-kit'
import ContentBlock from '../ContentBlock'
import FormattedCarousel from '../FormattedCarousel'
import { Feature } from '../../features'


const GroupBlock = ({ id, groupLayout }) => {
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

  const groupTitle = data.node.title
  const groupBody = data.node.htmlContent
  const blockItems = mapEdgesToNodes(data.node.childContentItemsConnection)

  if (!blockItems || !blockItems.length) return null

  switch (lowerCase(groupLayout)) {
    case 'row':
      return (
        <Row>
          {blockItems.map((n, i) => {
            switch (get(n, '__typename', '')) {
              case 'WebsiteBlockItem':
                return <ContentBlock {...n} key={i} />
              case 'WebsiteFeature':
                return (
                  <div key={i} className="w-100 px-5">
                    <Feature name={get(n, 'feature', '')} />
                  </div>
                )
              default:
                return null
            }
          })}
        </Row>
      )
    case 'accordion':
      return null
    // return (
    //   <Accordion
    //     blockTitle={groupTitle}
    //     blockBody={groupBody}
    //   >
    //     {blockItems.map((accordionItem, j) => {
    //       return (
    //         <div key={j} title={accordionItem.title}>
    //           <h2>{accordionItem.title}</h2>
    //           {accordionItem.htmlContent}
    //         </div>
    //       )
    //     }
    //     )}
    //   </Accordion>
    // )
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

export default GroupBlock
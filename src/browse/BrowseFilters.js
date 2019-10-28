import React, { useState } from 'react'
import { useQuery } from 'react-apollo'
import PropTypes from 'prop-types'
import {
    toLower,
    get
} from 'lodash'

import {
    Button,
    Loader,
    ContentContainer
} from '../ui'
import {mapEdgesToNodes} from '../utils'
import {GET_BROWSE_FILTERS} from './queries'
import BrowseCategories from './BrowseCategories'


const BrowseFilters = ({ children }) => {

    const [filterId, setFilterId] = useState('')


    const { loading, error, data } = useQuery(GET_BROWSE_FILTERS)
    
      if (loading) return (
          <ContentContainer>
              <Loader/>
          </ContentContainer>
      )
    
      if (error) {
        console.log({ error })
        return null
      }
        
    const filters = mapEdgesToNodes(get(data, 'contentChannels[0].childContentItemsConnection', null))
    
    return (
        <>
            <div>
                {filters.map(n => (
                    <Button 
                        key={n.id}
                        title={n.title}
                        type='link'
                        onClick={() => setFilterId(n.id)}
                    />
                ))}
            </div> 
            <div>
                <BrowseCategories
                    filterId={filterId}
                />
            </div>
        </>   
        )
}

BrowseFilters.propTypes = {
    filter: PropTypes.string,
    title: PropTypes.string,
}

BrowseFilters.defaultProps = {
    filter: null,
    title: null,
}

export default BrowseFilters
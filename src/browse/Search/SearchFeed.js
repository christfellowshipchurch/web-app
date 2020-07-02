import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { get } from 'lodash';

import { TileRowCard } from '../../ui'
import ContentCardConnected from '../../content-card-connected';

import { GET_SEARCH_RESULTS } from '../queries'

import { LoadingFeed, ErrorFeed } from './OtherFeeds'

const mapSearchData = (data) => 
  get(data, 'search.edges', []).map(({ node }) => ({ ...node }));
  

const SearchFeed = ({ content }) => {

  //splits content into two columns
  const half = Math.ceil(content.length / 2);
  const firstHalf = content.splice(0, half)
  const secondHalf = content.splice(-half)

  if(content && firstHalf) return (
    <div className='row'>
        <div className='col-12 col-md-6'>
          {firstHalf.map((n, i) => (
            <ContentCardConnected
              key={i}
              contentId={n.id}
              card={TileRowCard}
            />
          ))}      
        </div>
        {secondHalf &&
          <div className='col-12 col-md-6'>
            {secondHalf.map((n, i) => (
              <ContentCardConnected
                key={i}
                contentId={n.id}
                card={TileRowCard}
              />
          ))}
          </div>
        }
    </div>
  )
}


const SearchFeedConnected = ({ searchText }) => {

    const { data, loading, error } = useQuery(GET_SEARCH_RESULTS, {
        variables: { searchText },
        fetchPolicy: 'cache-and-network',
        skip: !searchText || searchText === '',
    });

    const content = mapSearchData(data)

    if(loading) return <LoadingFeed />

    if(error || data === undefined || content.length < 1 ) return (
        <ErrorFeed 
          searchText={searchText} 
        />
      )
  
    return <SearchFeed
              content={content}
            />

  };

export default SearchFeedConnected
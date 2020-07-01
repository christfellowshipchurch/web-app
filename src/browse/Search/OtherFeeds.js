import React from 'react'
import classnames from 'classnames'
import { TileRowCard } from '../../ui'
import ContentCardConnected from '../../content-card-connected';

const blankCards = ['', '', '', '', '', '', '']

export const PreSearchFeed = ({ hide }) => (
  <div 
    className={classnames(
      'text-center',
      'p-6', 
      'vh-100',
      {'d-none': hide}
    )}
  >
      <h3 className='text-secondary'>
          Let's get started!
      </h3>
      <p>Start typing above to find exactly what you're looking for</p>
  </div>
)

export const LoadingFeed = () => (
    <div className='row p-2'>
        <div className='col-12 col-md-6'>
            {blankCards.map((n, i) => (
              <ContentCardConnected
                key={i}
                isLoading
                card={TileRowCard}
              />
            ))}  
        </div>
          <div className='col-12 col-md-6'>
            {blankCards.map((n, i) => (
              <ContentCardConnected
                key={i}
                isLoading
                card={TileRowCard}
              />
            ))}  
          </div>
    </div>
  )

export const ErrorFeed = ({ searchText }) => (
  <div 
    className={classnames(
      'text-center',
      'p-6', 
      'vh-100',
    )}
  >
      <h3 className='text-secondary'>
          Uh Oh!
      </h3>
      <p></p>
      <p>Looks like we couldn't find anything for "<b>{searchText}</b>." 
      Try searching for something else!</p>
  </div>
)
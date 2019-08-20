import React, { useState } from 'react'
import { Query, useQuery } from 'react-apollo'
import { toLower, get, has, find } from 'lodash'
import getWebsiteHeader from '../../queries/getWebsiteHeader'

import { Button } from '@christfellowshipchurch/web-ui-kit'

const Navbar = () => {
  const website = process.env.REACT_APP_WEBSITE_KEY
  const title = window.location.pathname

  let [isHome, setIsHome] = useState(true)

  if (title === '/home-page') {
    isHome = true
  } else {
    isHome = false
  }

  // const navPosition = isHome ? 'fixed-top' : ''

  return (
    <Query
      query={getWebsiteHeader}
      variables={{ website }}
      fetchPolicy='cache-and-network'
    >
      {({ loading, error, data }) => {
        if (loading)
          return (
            <nav className='navbar navbar-expand-lg navbar-light bg-light' />
          )
        if (error)
          return (
            <nav className='navbar navbar-expand-lg navbar-light bg-light' />
          )

        data = data.getWebsiteNavigation

        const quickAction = {
          display: has(data, 'quickAction.call') && has(data, 'quickAction.action'),
          call: get(data, 'quickAction.call', ''),
          action: get(data, 'quickAction.action', '')
        }

        const img = data.images[0].sources[0].uri       

        const navColor = isHome ? 'transparent' : 'white'
        const linkColor = isHome ? 'white' : 'dark'

        return (
          <div className={`fixed-top`} >
            <nav
              className={`navbar navbar-expand-lg navbar-light bg-${navColor}`}
            >
              {img ? (
                <div className='pl-4'>
                  <a href='/'>
                    <img
                      src={img}
                      style={{ height: '80px', width: 'auto' }}
                      alt='Christ Fellowship Brand Image'
                    />
                  </a>
                </div>
              ) : null}
              <div className='ml-auto d-flex align-items-center'>
                {data.navigationLinks.map((link, i) => (
                  <div key={i} className='mx-4'>
                    <a
                      className={`text-${linkColor} my-auto`}
                      href={link.action}
                    >
                      {link.call}
                    </a>
                  </div>
                ))}
                {quickAction.display ? (
                  <div className='px-4'>
                    <Button
                      call={quickAction.call}
                      action={quickAction.action}
                      />
                  </div>
                ) : null}
              </div>
            </nav>
          </div>
        )
      }}
    </Query>
  )
}

export default Navbar

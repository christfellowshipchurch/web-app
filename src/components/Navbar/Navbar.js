import React from 'react'
import {
    Query
} from 'react-apollo'
import {
    toLower, get, has, find
} from 'lodash'
import getWebsiteHeader from '../../queries/getWebsiteHeader'
import {Button} from '@christfellowshipchurch/web-ui-kit'

const Navbar = () => {
    const website = process.env.REACT_APP_WEBSITE_KEY

    return (
        <Query query={getWebsiteHeader} variables={{ website }} fetchPolicy="cache-and-network">
            {({ loading, error, data }) => {

                if (loading) return <nav className="navbar navbar-expand-lg navbar-light bg-light"></nav>
                if (error) return <nav className="navbar navbar-expand-lg navbar-light bg-light"></nav>

                data = data.getWebsiteNavigation

                const quickAction = {
                    display: has(data, 'quickAction.call') && has(data, 'quickAction.action'),
                    call: get(data, 'quickAction.call', ''),
                    action: get(data, 'quickAction.action', ''),
                }

                const img = data.images[0].sources[0].uri
                console.log('images:', {img})

                return (
                    <div className='fixed-top'>
                        <nav className="navbar navbar-expand-lg navbar-light bg-white">
                                {img
                                    ? (
                                        <div className='pl-4'>
                                            <a href="/">
                                                <img src={img}
                                                    style={{ height: '80px', width: 'auto' }}
                                                    alt="Christ Fellowship Brand Image" />
                                            </a>
                                        </div>
                                    )
                                    : null}
                                <div className='ml-auto d-flex align-items-center'>
                                {data.navigationLinks.map((link, i) => (
                                    <div className='mx-4'>
                                        <a key={i}
                                            className='text-muted my-auto'
                                            href={link.action}
                                        >
                                            {link.call}
                                        </a>
                                    </div>                                   
                                ))}
                                {quickAction.display
                                    ?   <div className='px-4'>
                                            <Button call={quickAction.call} action={quickAction.action}  />
                                        </div>
                                    : null
                                }
                                </div>                            
                        </nav>
                    </div>
                )
            }}
        </Query>
    )
}

export default Navbar
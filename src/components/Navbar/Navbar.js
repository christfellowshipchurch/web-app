import React, { useState } from 'react'
import {
    Query
} from 'react-apollo'
import {
    get, has, find
} from 'lodash'
import getWebsiteHeader from '../../queries/getWebsiteHeader'

import { Nav, NavItem, NavLink, UncontrolledCollapse } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { buttonClick } from '../../utils'
import Footer from '../Footer'


// body is a react component
const Navbar = () => {
    const [isExpanded, setIsExpanded] = useState(false)
    const website = process.env.REACT_APP_WEBSITE_KEY
    const title = {
        quickAction: 'QuickAction',
        navbar: 'Navbar'
    }

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

                const img = find(data.images, (n) => n.name === 'Brand Image')

                return (
                    <div className='fixed-top'>
                        <Nav vertical className='header-footer-color'>
                            <div className="d-flex">
                                {img && get(img, 'sources', null)
                                    ? (
                                        <div className='navbarPadding py-3'>
                                            <a href="/">
                                                <img src={get(img, 'sources[0].uri', '')}
                                                    style={{ height: '50px', width: 'auto' }}
                                                    alt="Christ Fellowship Conference" />
                                            </a>
                                        </div>
                                    )
                                    : null}

                                <div className="ml-auto d-flex align-items-center">
                                    {quickAction.display
                                        ? <div className='d-none d-sm-block'>
                                            <h5 className="mb-0">
                                                <NavLink
                                                    href="/#"
                                                    onClick={() => buttonClick(quickAction.call, quickAction.action, title.quickAction, 'True')}
                                                    className='py-4 text-white text-uppercase font-weight-bold'>
                                                    {quickAction.call}
                                                </NavLink>
                                            </h5>
                                        </div>
                                        : null
                                    }
                                    <div className='navbarPadding'>
                                        <FontAwesomeIcon
                                            id="toggler"
                                            icon={isExpanded ? faTimes : faBars}
                                            size='5x'
                                            color="white"
                                            className='py-4'
                                            onClick={() => setIsExpanded(!isExpanded)} />
                                    </div>
                                </div>
                            </div>
                            <UncontrolledCollapse toggler="#toggler" className='navbarExtend p-5 mt-5'>
                                {data.navigationLinks.map((link, i) => (
                                    <NavItem key={i}>
                                        <h1 className='d-none d-lg-block'>
                                            <NavLink href="/#"
                                                onClick={() => buttonClick(link.call, link.action, title.navbar)}
                                                className='text-white text-uppercase font-weight-bold'>
                                                {link.call}
                                            </NavLink>
                                        </h1>
                                        <h2 className='d-lg-none'>
                                            <NavLink href="/#"
                                                onClick={() => buttonClick(link.call, link.action, title.navbar)}
                                                className='text-white text-uppercase font-weight-bold'>
                                                {link.call}
                                            </NavLink>
                                        </h2>
                                    </NavItem>
                                ))}
                                <div className='navbarFooter'>
                                    <Footer></Footer>
                                </div>
                            </UncontrolledCollapse>
                        </Nav>
                    </div>
                )
            }}
        </Query>
    )
}
export default Navbar;
import React from 'react'
import {
    Query
} from 'react-apollo'
import {
    toLower
} from 'lodash'

import { buttonClick } from '../../utils'
import getWebsiteFooter from '../../queries/getWebsiteFooter'

import { Container, Row, Col } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopyright } from '@fortawesome/pro-light-svg-icons'
import { faFacebookSquare, faInstagram, faYoutube, faTwitter } from '@fortawesome/free-brands-svg-icons'

const SM_ICONS = {
    facebook: faFacebookSquare,
    instagram: faInstagram,
    youtube: faYoutube,
    twitter: faTwitter
}

const Footer = () => {
    const website = process.env.REACT_APP_WEBSITE_KEY

    return (
        <Query query={getWebsiteFooter} variables={{ website }} fetchPolicy="cache-and-network">
            {({ loading, error, data }) => {

                if (loading) return <nav className="navbar navbar-expand-lg navbar-light bg-light"></nav>
                if (error) return <nav className="navbar navbar-expand-lg navbar-light bg-light"></nav>

                data = data.getWebsiteNavigation

                return (
                    <Container fluid className='header-footer-color py-5' style={{ backgroundColor: '#353535' }}>
                        <Row className='d-flex justify-content-center'>
                            <Col xs="12" md="11" className="pt-4 pb-3 footerPadding">
                                <div className='d-flex justify-content-center mb-3'>
                                    {data.socialMediaLinks.map(({ call, action }, i) => (
                                        <button
                                            key={i}
                                            href="/#"
                                            className='btn btn-link ml-4'
                                            onClick={() => { }}>
                                            <FontAwesomeIcon icon={SM_ICONS[toLower(call)]} size='2x' />
                                        </button>
                                    ))}
                                </div>

                                <hr className='bg-light w-75 my-3'></hr>

                                <p className='d-flex justify-content-center align-items-center text-light'>
                                    <FontAwesomeIcon icon={faCopyright} />
                                    <span className="pl-1">
                                        {`${new Date().getFullYear()} Christ Fellowship Church. All Rights Reserved`}
                                    </span>
                                </p>

                                <div className='d-flex justify-content-center'>
                                    {data.footerLinks.map((link, i) => (
                                        <a key={i}
                                            href="/#"
                                            className='text-light text-uppercase font-weight-bold ml-4'
                                            onClick={() => { }}>
                                            {link.call}
                                        </a>
                                    ))}
                                </div>
                            </Col>
                        </Row>
                    </Container>
                )
            }}
        </Query>
    )
}

export default Footer
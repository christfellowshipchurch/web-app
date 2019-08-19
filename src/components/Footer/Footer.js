import React from 'react'
import {
    Query
} from 'react-apollo'
import {
    get, find
} from 'lodash'

import { buttonClick } from '../../utils'
import getWebsiteFooter from '../../queries/getWebsiteFooter'

import { Container, Row, Col } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'

const title = {
    socialMedia: 'Social Media Icon',
    footerLink: 'Footer Links'
}

const SocialMediaButton = ({ link, icon, call }) => link && link !== ''
    ? (
        <a href="/#">
            <FontAwesomeIcon
                color='white'
                icon={icon}
                size='2x'
                className='mr-4'
                onClick={() => buttonClick(call, link, title.socialMedia, 'True')}>
            </FontAwesomeIcon>
        </a>
    ) : null

const Footer = () => {
    const website = process.env.REACT_APP_WEBSITE_KEY

    return (
        <Query query={getWebsiteFooter} variables={{ website }} fetchPolicy="cache-and-network">
            {({ loading, error, data }) => {

                if (loading) return <nav className="navbar navbar-expand-lg navbar-light bg-light"></nav>
                if (error) return <nav className="navbar navbar-expand-lg navbar-light bg-light"></nav>

                data = data.getWebsiteNavigation

                return null

                return (
                    <Container fluid className='header-footer-color py-5' style={{ backgroundColor: '#353535' }}>
                        <Row className='d-flex justify-content-center'>
                            <Col xs="12" md="11" className="pt-4 pb-3 footerPadding">
                                <div className='d-flex justify-content-center mb-3'>
                                    {/* <SocialMediaButton link={data.youtubeUrl} icon={faYoutube} call='YouTube' />
                                    <SocialMediaButton link={data.instagramUrl} icon={faInstagram} call='Instagram' />
                                    <SocialMediaButton link={data.facebookUrl} icon={faFacebook} call='Facebook' />
                                    <SocialMediaButton link={data.twitterUrl} icon={faTwitter} call='Twitter' /> */}
                                </div>

                                <div className='dropdown-divider m-auto px-5' style={{ maxWidth: '900px', borderTop: '2px solid #595959' }} />
                                <br />

                                <a className='d-flex justify-content-center' style={{ color: '#c1c1c1', fontSize: '14px' }}>
                                    © {new Date().getFullYear()} Christ Fellowship Church. All Rights Reserved
                                </a>

                                <div className='d-flex justify-content-center'>
                                    {data.footerLinks.map((link, i) => (
                                        <a key={i}
                                            href="/#"
                                            className='text-light text-uppercase ml-4'
                                            onClick={() => buttonClick(link.call, link.action, title.footerLink, 'True')}>
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
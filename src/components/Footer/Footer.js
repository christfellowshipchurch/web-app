import React from 'react'
import {
    Query
} from 'react-apollo'
import {
    get, find
} from 'lodash'

import getWebsiteFooter from '../../queries/getWebsiteFooter'

import { Container, Row, Col } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'
import {buttonClick} from '../../utils'

const title ={
    socialMedia: 'Social Media Icon',
    footerLink: 'Footer Links'
}

const socialMediaButton = (link, icon, call) => {
    if (link && link !== '') {
        return (
            <a href="/#">
                <FontAwesomeIcon 
                    color='white' 
                    icon={icon} 
                    size='2x' 
                    className='mr-3'
                    onClick={() => buttonClick(call, link, title.socialMedia, 'True')}>
                </FontAwesomeIcon>
            </a>
        )
    }
}

const Footer = () => {
    const website = process.env.REACT_APP_WEBSITE_KEY

    return (
        <Query query={getWebsiteFooter} variables={{ website }} fetchPolicy="cache-and-network">
            {({ loading, error, data }) => {

                if (loading) return <nav className="navbar navbar-expand-lg navbar-light bg-light"></nav>
                if (error) return <nav className="navbar navbar-expand-lg navbar-light bg-light"></nav>

                data = data.getWebsiteNavigation

                const img = find(data.images, (n) => n.name === 'Brand Icon')

                return (
                    <Container fluid className='header-footer-color'>
                        <Row className='m-auto align-items-center'>
                            <Col xs="12" md="11" className="text-left pt-4 pb-3 footerPadding">
                                <div>
                                    {socialMediaButton(data.instagramUrl, faInstagram, 'Instagram')}
                                    {socialMediaButton(data.facebookUrl, faFacebook, 'Facebook')}
                                    {socialMediaButton(data.twitterUrl, faTwitter, 'Twitter')}
                                </div>

                                <p className='mb-0 font-weight-light text-light'>
                                    &copy; {new Date().getFullYear()} Christ Fellowship Church. All Rights Reserved
                                </p>

                                <div className='d-flex'>
                                    {data.footerLinks.map((link, i) => (
                                        <a  key={i}
                                            href="/#"
                                            className='pr-3 text-white font-weight-bold'
                                            onClick={() => buttonClick(link.call, link.action, title.footerLink, 'True')}>
                                            {link.call}
                                        </a>
                                    ))}
                                </div>
                            </Col>
                            <Col xs="12" md="1" className='py-4 d-none d-sm-block'>
                                {img && get(img, 'sources', null)
                                    ? (
                                        <div className='pr-4'>
                                            <a href="/">
                                                <img src={get(img, 'sources[0].uri', '')}
                                                    style={{ height: '50px', width: 'auto' }}
                                                    alt="Christ Fellowship Conference" />
                                            </a>
                                        </div>
                                    )
                                    : null}
                            </Col>
                        </Row>
                    </Container>
                )
            }}
        </Query>
    )
}

export default Footer;
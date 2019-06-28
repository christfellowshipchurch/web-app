import React from 'react';
import {
    lowerCase
} from 'lodash';

import { Content, Media } from '@christfellowshipchurch/flat-ui-web'
import { Container, Row, Col, Button } from 'reactstrap'
import PixelManager from './components/PixelManager'


export const mapEdgesToNodes = (data) => data.edges.map(n => n.node);
export const redirectTo = (uri) => window.location.href = uri;

export const hexToRGB = (hex) => {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
export const getTextColorClass = (backgroundColor) => {
    var rgb = hexToRGB(backgroundColor)
    var o = Math.round(((parseInt(rgb.r) * 299) +
        (parseInt(rgb.g) * 587) +
        (parseInt(rgb.b) * 114)) / 1000);
    // return (o > 125) ? 'text-dark' : 'text-light';
    return (o > 175) ? 'text-dark' : 'text-light';
}


// Content Rendering Utils
export const renderContent = (content) => {
    //Checks for # in hex value for background color
    let textColor = 'text-dark'
    let containerStyles = {}
    if (content.backgroundColor && content.backgroundColor !== '') {
        containerStyles = {
            backgroundColor: content.backgroundColor
        }
        textColor = getTextColorClass(content.backgroundColor)
    }

    const layout = lowerCase(content.contentLayout)

    if (layout === "background") {
        return (
            <Container fluid>
                <Row>
                    <Col className={textColor}>
                        <Media
                            imageUrl={content.coverImage ? content.coverImage.sources[0].uri : null}
                            imageAlt={content.imageAlt}
                            videoUrl={content.videos && content.videos[0].sources.length
                                ? content.videos[0].sources[0].uri
                                : null}
                            ratio={content.imageRatio}
                        >

                            <Content.Title>
                                {content.title}
                            </Content.Title>

                            <Content.Body>
                                {content.htmlContent}
                            </Content.Body>

                            {renderButtons(content.callsToAction)}
                        </Media>
                    </Col>
                </Row>

            </Container>
        )
    } else {
        return (
            <Container style={containerStyles} className="py-5" fluid>
                <Container>
                    <Row>
                        <Col className={textColor}>
                            {renderContentWithImgSizing(content)}
                        </Col>
                    </Row>
                </Container>
            </Container>
        )
    }
}

const renderContentWithImgSizing = (content) => {
    const layout = lowerCase(content.contentLayout)
    const imageUrl = content.coverImage && layout !== 'original'
        ? content.coverImage.sources[0].uri
        : null
    const videoUrl = content.videos && content.videos[0].sources.length && layout !== 'original'
        ? content.videos[0].sources[0].uri
        : null

    let textAlign
        layout === 'right' || layout === 'left'
            ? textAlign = 'text-left' : textAlign = ''

    let header
        layout === 'right' || layout === 'left'
            ? header = 'h2' : header = 'h1'
            
    return (
        <div>
            {layout === 'original'
                ? (
                    <div className="w-100">
                        <video playsInline autoPlay loop muted className="w-100">
                            <source type="video/mp4" src={videoUrl} />
                        </video>

                        <img src={imageUrl} alt={content.imageAlt} className="w-100" />
                    </div>
                )
                : null}

            <Content
                layout={layout}
                imageUrl={imageUrl}
                imageAlt={content.imageAlt}
                videoUrl={videoUrl}
                ratio={content.imageRatio}
            >

                <Content.Subtitle className={`text-uppercase text-muted font-weight-bold ${textAlign}`}>
                    {content.subtitle}
                </Content.Subtitle>

                <Content.Title className={`text-uppercase titleWeight ${textAlign} ${header}`}>
                    {content.title}
                </Content.Title>

                <Content.Body className={`pt-1 ${textAlign}`}>
                    {content.htmlContent}
                </Content.Body>

                {renderButtons(content.callsToAction, content.buttonColor, content.title, content.openLinksInNewTab)}
            </Content>
        </div>
    )
}

export const buttonClick = (call, action, title, openLinksInNewTab) => {
    PixelManager.reportButtonClick({ call: `${title} - ${call}`, action })

    if(openLinksInNewTab){
        const win = window.open(action,'_blank')
        win.focus()
    }
    else { 
        redirectTo(action)
    }

}

export const renderButtons = (callsToAction, buttonColor, title, openLinksInNewTab) => (
    <Container className="px-0">
        {callsToAction.map((n, i) => {
            const styles = {
                backgroundColor: buttonColor,
                borderColor: buttonColor
            }
            return (
                <Row className="my-2" key={i}>
                    <Col size="12">
                        <Button style={styles} onClick={() => buttonClick(n.call, n.action, title, openLinksInNewTab)}>
                            {console.log(openLinksInNewTab)}
                            {n.call}
                        </Button>
                    </Col>
                </Row>
            )
        })}
    </Container>
)
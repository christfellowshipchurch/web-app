import React from 'react'
import classnames from 'classnames'
import { Parser } from 'html-to-react';
import { Container, Row, Col } from 'reactstrap'
import {
    pattern, patternLeft, patternRight
} from '../../styles/grid.module.css'

import {
    getTextColorClass
} from '../../utils'

const htmlToReactParser = new Parser()


// body is a react component
const Grid = ({ children, title, body, backgroundImg, backgroundColor, backgroundImgReverse = false }) => {

    const backgroundStyle = {
        backgroundColor: backgroundColor,
        position: 'relative',
        overflowX: 'hidden'
    }

    const backgroundClasses = classnames(
        getTextColorClass(backgroundColor)
    )

    const patternStyle = {
        backgroundImage: `url(${backgroundImg})`
    }

    const patternClasses = classnames(
        pattern,
        backgroundImgReverse ? patternRight : patternLeft
    )

    let colStyles = {
        backgroundColor: children.backgroundcolor
    }

    return (
        <Container fluid style={backgroundStyle} className={backgroundClasses}>
            <div style={patternStyle} className={patternClasses}>
            </div>
            <Row className="m-0">
                <Col>
                    <Container className='gridPadding'>
                        <Row>
                            <Col>
                                <h1 className='text-uppercase titleWeight'>{title}</h1>
                                <div>
                                    {htmlToReactParser.parse(body)}
                                </div>
                            </Col>
                        </Row>
                        <Row className="justify-content-center">
                            {children.length
                                ? children.map((child, i) => {
                                    colStyles = {
                                        backgroundColor: child.props.backgroundcolor
                                    }

                                    return (
                                        <Col xs="12" md="6" lg="4" className='p-3 text-center' key={i}>
                                            <div style={colStyles}>
                                                {child}
                                                <h1>{child.backgroundcolor}</h1>
                                            </div>
                                        </Col>
                                    )
                                })
                                : (
                                    <Col xs="12" md="6" lg="4" className='p-3 text-center'>
                                        <div style={colStyles}>
                                            {children}
                                            <h1 className="text-white">{children.backgroundcolor}</h1>
                                        </div>
                                    </Col>
                                )
                            }
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
    )
}

export default Grid;
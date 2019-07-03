import React from 'react'
import { Container, Row } from 'reactstrap'
import { Content } from '@christfellowshipchurch/flat-ui-web'

const DefaultPage = () => {

  return (
    <Container fluid className="bg-dark text-light">
    <Row>
    <Content
    layout="right"
    imageUrl="https://rock.gocf.org/GetImage.ashx?id=2168538"
    imageAlt="Alt text for my image"
    ratio="1by1"
>
    <Content.Title>
        This is Rob's Page
    </Content.Title>

    <Content.Body>
        Here is our first page for our new website!
    </Content.Body>
</Content>
    </Row>
  </Container>
  )
};

DefaultPage.defaultProps = {
};

DefaultPage.propTypes = {
};

export default DefaultPage;
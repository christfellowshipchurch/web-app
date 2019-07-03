import React from 'react'
import { Container, Row } from 'reactstrap'
import { Content } from '@christfellowshipchurch/flat-ui-web'

const DefaultPage = () => {

  return (
    <Container fluid className="bg-dark text-light">
    <Row>
    <Content
    layout="right"
    imageUrl="https://lh5.googleusercontent.com/-EUNlbMBrBQE/AAAAAAAAAAI/AAAAAAAAAA8/dFvOtPyXv4I/photo.jpg"
    imageAlt="Alt text for my image"
    ratio="1by1"
>
    <Content.Title>
        This is Rob's Page
    </Content.Title>

    <Content.Body>
      Hello Rob, this is your fully automated, cloud-hosted, personalized, agile kanbam webpage

      
    </Content.Body>
    <br/>
    <i>Sponsored by Elastic Beanstock, Atlassian, Jenkins, AWS, ADT, Settop Boxes</i>

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
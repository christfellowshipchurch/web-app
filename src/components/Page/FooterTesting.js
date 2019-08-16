import React from 'react'
import {Loader, Content } from '@christfellowshipchurch/flat-ui-web'
import Footer from '../Footer'
import Navbar from '../Navbar'
import Grid from '../Grid'

const DefaultPage = () => {
   const demoLinks = [
    {call: 'Privacy Policy',
    action: '/privacypolicy' },
    {call: 'Another Item',
    action: '/anotheritem' },
  ]   
  const demoRegister = [
    {call: 'Register Now',
    action: '/registration'}
  ]

  const demoIcon = 'https://cdn.iconscout.com/icon/premium/png-256-thumb/demo-2-820993.png'

  return (
    <div>
      <Content>
        <br/>
        <br/>
        <br/>
        <Content.Title>Testing Footer</Content.Title>
        test and display footer changes
        <br/>
        <br/>
        <br/>
      </Content>
    </div>
  )
};

DefaultPage.defaultProps = {
};

DefaultPage.propTypes = {
};

export default DefaultPage;

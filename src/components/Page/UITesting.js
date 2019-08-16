import React from 'react'
import { Carousel, Row, TextInput, TextArea, Dropdown, Accordion, Button } from '@christfellowshipchurch/web-ui-kit'

const multipleContent =[
  {
    backgroundColor: '#353535',
    contentLayout: 'right',
    callsToAction: {call: 'learn more', action: '#action'},
    coverImage: {sources: {0:{uri: 'https://rock.christfellowshipconference.com/GetImage.ashx?guid=2550f1e3-271d-4156-96ff-cfcac1345731'}}},
    imageRatio: "1by1",
    htmlContent: 'Discover more about our pastors, beliefs, and history',
    // subtitle: 'Subtitle',
    title: 'Want to learn more about Christ Fellowship?'
  },
  {
    backgroundColor: '#ffffff',
    contentLayout: 'right',
    // callsToAction: {call: 'learn more', action: '#action'},
    // coverImage: {sources: {0:{uri: 'https://rock.christfellowshipconference.com/GetImage.ashx?guid=2550f1e3-271d-4156-96ff-cfcac1345731'}}},
    // imageRatio: "16:9",
    title: '5 Steps to Building a Healthy Life',
    // subtitle: 'Subtitle',
    htmlContent: 'Sign up to receive this free resource and start becoming better you today'
  },
  {
    backgroundColor: '#535353',
    contentLayout: 'left',
    callsToAction: {call: 'learn more', action: '#action'},
    coverImage: {sources: {0:{uri: 'https://rock.christfellowshipconference.com/GetImage.ashx?guid=2550f1e3-271d-4156-96ff-cfcac1345731'}}},
    imageRatio: "1by1",
    title: 'Want to learn more about Christ Fellowship?',
    // subtitle: 'Subtitle',
    htmlContent: 'Discover more about our pastors, beliefs, and history'
  }
]

const items = [
  {
    call: 'item 1',
    action: '#item1'
  },
  {
    call: 'item 2',
    action: '#item2'
  },
  {
    call: 'disabled',
    action: '#disabled',
    disable: true
  }
]

const carouselChild = [
  {
    imageUrl: 'https://rock.christfellowshipconference.com/GetImage.ashx?guid=29371204-b43f-4cf9-b0c0-735370121890',
    text: 'This is first text'
  },
  {
    imageUrl: 'https://rock.christfellowshipconference.com/GetImage.ashx?guid=d1c8bd10-5642-47ab-978f-41361a1032cb',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu sem tempor, varius quam at, luctus dui. Mauris magna metus, dapibus nec turpis vel, semper malesuada ante. Idac bibendum scelerisque non non purus. Suspendisse varius nibh non aliquet.'
  },
  {
    imageUrl: 'https://rock.christfellowshipconference.com/GetImage.ashx?guid=8b59a84f-55b1-486d-a5ed-a2e2778cd830',
    text: 'This is third text'
  }
]


const DefaultPage = () => {


  return (
    <div className='bg-light'>
    <Row content={multipleContent} />
          <br/>
          <br/>
          <br/>
          <h1 className="text-primary text-center">Stuff</h1>
          <br/>
          <br/>
          <br/>
          <TextInput success placeholder='Enter Text'/>
          <br/>
          <br/>
          <br/>
          <TextInput fail placeholder='Enter Text'/>
          <br/>
          <br/>
          <br/>
          <TextInput disabled placeholder='Enter Text'/>
          <br/>
          <br/>
          <br/>
          <TextInput output='' helper='this is helper text' label='this is a label' placeholder='Enter Text'/>
          <br/>
          <br/>
          <br/>
          <Dropdown title='Dropdown Title' items={items}/>
          <br/>
          <br/>
          <br/>
          <TextArea placeholder='Type your message' helper='this is helper text' label='this is a label' fail/>
          <br/>
          <br/>
          <br/>
          <Carousel children={carouselChild} />
          <br/>
          <br/>
          <br/>
            <Accordion 
              blockTitle='Block Title' 
              blockBody='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu sem tempor, varius quam at, luctus dui. Mauris magna metus, dapibus nec turpis vel, semper malesuada ante. Idac bibendum scelerisque non non purus. Suspendisse varius nibh non aliquet.'
              textLink = {{call:'Text Link', action: '#action'}}
            >
              <div title="Dropwdown Item 1">
                  <h2>This is one item that I want displayed</h2>
              </div>

                <h2 title="Dropwdown Item 2">Since the Accordion parses each child, there is no need to adhere to a specific structure for the children</h2>

                <Button title='this is a button' />

            </Accordion>
          <br/>
          <br/>
          <br/>
        </div>
  )
};

DefaultPage.defaultProps = {
};

DefaultPage.propTypes = {
};

export default DefaultPage;

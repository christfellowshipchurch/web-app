import React, { useState } from 'react'
import { Carousel } from 'react-bootstrap'
import ProfileBanner from '../../profile/ProfileBanner'
import EditProfile from '../../profile/EditProfile'
import { ValuesOfCorrectType } from 'graphql/validation/rules/ValuesOfCorrectType'



const DefaultPage = () => {
  const [index, setIndex] = useState(0)


  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex)
    }

  return (
    <>
      <ProfileBanner
        onEdit={() => {
          handleSelect(1)
        }}
        onSave={() => {
          handleSelect(0)
        }}
        onCancel={() => {
          handleSelect(0)
        }}
      />
     
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        controls={false}
        indicators={false}
        interval={null}
        touch={false}
      >
        <Carousel.Item>
          <h1>Slide 1</h1> 
          <EditProfile />  
        </Carousel.Item>
        <Carousel.Item>
          <h1> Slide 2</h1>
        </Carousel.Item>
        <Carousel.Item />
      </Carousel>
    </>
  )
}

DefaultPage.defaultProps = {
}

DefaultPage.propTypes = {
}

export default DefaultPage

import React from 'react'
import EventBanner from './EventBanner'
import EventDetail from './EventDetail'


const htmlContent = 'We are gathering January 19 at 7pm at our Palm Beach Gardens location for a great night of celebration and vision from Pastor Todd & Julie. They have something pretty exciting to share with all of us and you won’t want to miss it. Even if you’re not apart of the Dream Team, but want to be apart of it, you are invited too! The Dream Team are men, women, and students just like you that are using their gifts and talents in the church to make a difference in their lives. And we would love for you to jump in and be a part!'


const DefaultPage = ({ match: { params: { eventName } } }) => {

  return (
      <>
          <EventBanner eventName={eventName} />
          <EventDetail htmlContent={htmlContent} />
      </>
  )
}

DefaultPage.propTypes = {
}

DefaultPage.defaultProps = {
}

export default DefaultPage

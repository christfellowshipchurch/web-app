import ReactGA from 'react-ga'

// In order to use GoogleAnalytics, you must ALWAYS first run init() before running any other method
// ie: run init() before pageView()
const init = () => {
  // get ENV variable
  const gaCode = process.env.REACT_APP_GA_CODE

  // initialize connection with Google Analytics
  ReactGA.initialize(gaCode)
}

const pageView = (route) => {
  if (route) {
    // trigger page view
    ReactGA.pageview(route)
  }
}

//Sends GoogleAnalytics ButtonClick event along with what button is being clicked
const buttonClick = (event, { call }) => {
  ReactGA.event({
    category: 'User',
    action: event,
    label: call
  })
}

const GoogleAnalytics = {
  init,
  pageView,
  buttonClick
}


export default GoogleAnalytics
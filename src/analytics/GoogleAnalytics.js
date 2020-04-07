import ReactGA from 'react-ga'

// In order to use GoogleAnalytics, you must ALWAYS first run init() before running any other method
// ie: run init() before pageView()

const initWithPageView = (route) => {
  if (route) {
    const gaCode = process.env.REACT_APP_GA_CODE

    // initialize connection with Google Analytics
    ReactGA.initialize(gaCode)
    // trigger page view
    ReactGA.pageview(route)
  }
}

//Sends GoogleAnalytics ButtonClick event along with what button is being clicked
const buttonClick = (call) => {
  ReactGA.event({
    category: 'User',
    action: 'Button Click',
    label: call
  })
}

const GoogleAnalytics = {
    initWithPageView,
    buttonClick
}


export default GoogleAnalytics
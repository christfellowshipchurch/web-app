import GoogleAnalytics from './GoogleAnalytics'
import FacebookPixel from './FacebookPixel'

// This method initializes Google Analytics and Facebook Pixel and then triggers a page view on both
const initWithPageView = (route) => {
  GoogleAnalytics.init()
  FacebookPixel.init()

  GoogleAnalytics.pageView(route)
  FacebookPixel.pageView()
}

//Reports button click and sends data with call, action, and contentChannelID
const reportButtonClick = (data) => {
  const buttonClickEvent = "ButtonClick"
  FacebookPixel.buttonClick(buttonClickEvent, data)
  GoogleAnalytics.buttonClick(buttonClickEvent, data)
}


const PixelManager = {
  initWithPageView,
  reportButtonClick
}

export default PixelManager
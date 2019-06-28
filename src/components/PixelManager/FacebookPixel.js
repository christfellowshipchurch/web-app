import ReactPixel from 'react-facebook-pixel';

// In order to use FaceBookPixel, you must ALWAYS first run init() before running any other method
// ie: run init() before pageView()
const init = () => {
  // env variables
  const fbCode = process.env.REACT_APP_FB_CODE

  ReactPixel.init(fbCode);
}

const pageView = () => {
  ReactPixel.pageView();
}

//Sends Facebook ButtonClick event along with data that includes button text and contentChannelID
const buttonClick = (event, data) => {
  ReactPixel.trackCustom(event, data)
}

const FacebookPixel = {
  init,
  pageView,
  buttonClick
}

export default FacebookPixel
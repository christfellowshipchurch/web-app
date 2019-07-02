# Christ Fellowship Web App [![Package Version](https://img.shields.io/github/package-json/v/christfellowshipchurch/christ-fellowship-web-app.svg)](https://github.com/christfellowshipchurch/christ-fellowship-web-app) [![Netlify Status](https://api.netlify.com/api/v1/badges/14629c48-db6b-49b0-950b-069dc1ae88f3/deploy-status)](https://app.netlify.com/sites/eloquent-hodgkin-806a2b/deploys)

This is a repository for the Christ Fellowship website. 
The website is a *ReactJS* Web App and uses *GraphQL* to pull content from *Rock RMS*.

## Getting Started

After you have cloned the project, open your terminal. In the directory of your project, you can run:

### `yarn`

This will install all the needed packages for the project in order to run the App.

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.







## Extras

The app includes built-in components such as the **Navbar**, **Footer**, and **Grid**. These all use content that is set up in *Rock*.

### Pixel Manager
This component manages Facbook Pixel and Google Analytics data and allows you to report button clicks and page views using **React Pixel** and **React-GA**.

In order to use this component you will need to add your Pixel ID and Google Tracking number to your **.env** file. 

```
REACT_APP_FB_CODE=
REACT_APP_GA_CODE=
```

### Netlify 

We use Netlify for the building and deploying of our web app.



## Learn More

### React
https://reactjs.org/

### GraphQL
https://graphql.org/

### Rock RMS
https://www.rockrms.com/

### React Facebook Pixel
https://github.com/zsajjad/react-facebook-pixel

### React-GA
https://github.com/react-ga/react-ga


You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify


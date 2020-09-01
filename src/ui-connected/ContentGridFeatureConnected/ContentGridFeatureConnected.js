import React from 'react';
import PropTypes from 'prop-types';

import ContentGridFeature from './ContentGridFeature';

const ContentGridFeatureConnected = ({ blocks }) => (
  <ContentGridFeature blocks={blocks} />
);

ContentGridFeatureConnected.propTypes = {
  blocks: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      subtitle: PropTypes.string,
      htmlContent: PropTypes.string,
      image: PropTypes.shape({
        sources: PropTypes.arrayOf(
          PropTypes.shape({
            uri: PropTypes.string,
          })
        ),
      }),
      callsToAction: PropTypes.arrayOf(
        PropTypes.shape({
          call: PropTypes.string,
          action: PropTypes.string,
        })
      ),
    })
  ),
};

ContentGridFeatureConnected.defaultProps = {
  blocks: [{}, {}, {}, {}],
};

export default ContentGridFeatureConnected;

import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';
import { get } from 'lodash';

import pageBuilderComponentMapper from './pageBuilderComponentMapper';
import GET_PAGE_BUILDER_FEATURES from './getPageBuilderFeatures';

const PageBuilderConnected = ({ url, additionalFeatures }) => {
  const { data } = useQuery(GET_PAGE_BUILDER_FEATURES, {
    fetchPolicy: 'cache-and-network',
    variables: { url },
  });

  const renderFeature = ({ item }) =>
    pageBuilderComponentMapper({
      feature: item,
      additionalFeatures,
    });

  const features = get(data, 'pageBuilderFeatures', []);

  return features.map((item) => renderFeature({ item }));
};

PageBuilderConnected.propTypes = {
  additionalFeatures: PropTypes.shape({}),
  url: PropTypes.string.isRequired,
};

export default PageBuilderConnected;

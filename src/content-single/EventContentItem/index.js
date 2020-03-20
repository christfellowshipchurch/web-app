import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import { ErrorBlock } from '../../ui'

import Placeholder from './Placeholder';
import Banner from './EventBanner';
import Detail from './EventDetail';

export { default as EventBanner } from './EventBanner';
export { default as EventDetail } from './EventDetail';

const EventContentItem = ({
  itemId, content, loading, error,
}) => {
  if (loading) { return <Placeholder />; }

  if (error || (!loading && !content)) {
    console.log({ error });
    return <ErrorBlock />
  }

  return (
    <div>
      <Banner {...content} />
      <Detail {...content} />
    </div>
  );
};

EventContentItem.propTypes = {
  itemId: PropTypes.string,
};

EventContentItem.defaultProps = {
};

export default EventContentItem;

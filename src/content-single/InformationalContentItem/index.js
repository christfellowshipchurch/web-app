import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import Placeholder from './Placeholder';
import Banner from '../Banner';
import Detail from './Detail';

const EventContentItem = ({
  itemId, content, loading, error,
}) => {
  if (loading) { return <Placeholder />; }

  if (error || (!loading && !content)) {
    console.log({ error });
    // TODO : should we show an error? Or should we just redirect to the Articles page?
    return (
      <h3 className="text-center text-danger">
        There was an error loading this content. Try refreshing the page.
      </h3>
    );
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

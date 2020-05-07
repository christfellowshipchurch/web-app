import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import { ErrorBlock } from '../../ui';

import Placeholder from './Placeholder';
import Banner from '../Banner';
import Detail from './EventDetail';

import { LiveConsumer } from '../../live/LiveContext';

const EventContentItem = ({
  itemId, content, loading, error, liveStream
}) => {
  if (loading) { return <Placeholder />; }

  if (error || (!loading && !content)) {
    console.log({ error });
    return <ErrorBlock />;
  }


  return (
    <LiveConsumer contentId={itemId}>
    {(liveStream) => {
    const isLive = !!(liveStream && liveStream.isLive);
    return(
            <div>
              <Banner {...content} 
                withShare 
                shareTitle="Invite" 
                liveStream={liveStream}
              />
              <Detail 
                {...content} 
                isLive={isLive}
              />
            </div>
          )}
    }
</LiveConsumer>
  );
};

EventContentItem.propTypes = {
  itemId: PropTypes.string,
};

EventContentItem.defaultProps = {
};

export default EventContentItem;

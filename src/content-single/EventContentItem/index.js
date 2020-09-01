import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import { ErrorBlock } from '../../ui';

import Banner from '../Banner';
import { LiveConsumer } from '../../live/LiveContext';
import Placeholder from './Placeholder';
import Detail from './EventDetail';

const EventContentItem = ({ itemId, content, loading, error, liveStream }) => {
  if (loading) {
    return <Placeholder />;
  }

  if (error || (!loading && !content)) {
    console.log({ error });
    return <ErrorBlock />;
  }

  return (
    <LiveConsumer contentId={itemId}>
      {(liveStream) => {
        const isLive = !!(liveStream && liveStream.isLive);
        const liveStreamSource = get(liveStream, 'media.sources[0].uri', null);

        return (
          <div>
            <Banner
              {...content}
              withShare
              shareTitle="Invite"
              liveStreamSource={liveStreamSource}
            />
            <Detail {...content} isLive={isLive} />
          </div>
        );
      }}
    </LiveConsumer>
  );
};

EventContentItem.propTypes = {
  itemId: PropTypes.string,
};

EventContentItem.defaultProps = {};

export default EventContentItem;

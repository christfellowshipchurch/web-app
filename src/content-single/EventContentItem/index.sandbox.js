import React from "react";
import PropTypes from "prop-types";
import { get } from "lodash";

import { ErrorBlock } from "../../ui";
import { LiveConsumer } from "../../live/LiveContext";

import Placeholder from "./Placeholder";
import {
  EventBannerBackground,
  EventDescriptionCard,
  EventDetail,
  EventMedia,
  EventPanel,
} from "./components";

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
        const liveStreamSource = get(liveStream, "media.sources[0].uri", null);

        return (
          <div style={{ minHeight: "75vh" }}>
            <EventBannerBackground {...content} />

            <div className="container-fluid max-width-1100 mx-auto">
              <div className="row pt-4 mb-4">
                {/* Main Column */}
                <div className="col-lg-8">
                  <EventMedia {...content} liveStreamSource={"https://b028.wpc.azureedge.net/80B028/Samples/0e8848ca-1db7-41a3-8867-fe911144c045/d34d8807-5597-47a1-8408-52ec5fc99027.ism/Manifest(format=m3u8-aapl-v3)"} />
                  <EventDetail {...content} isLive={isLive} />
                </div>

                {/* Side Column */}
                <div className="col-lg-4">
                  <EventPanel />
                </div>
              </div>

              <EventDescriptionCard {...content} />
            </div>
          </div>
        );
      }}
    </LiveConsumer >
  );
};

EventContentItem.propTypes = {
  itemId: PropTypes.string,
};

EventContentItem.defaultProps = {};

export default EventContentItem;

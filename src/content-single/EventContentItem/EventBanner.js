import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { get } from "lodash";

import { Media } from "../../ui";

const EventBanner = ({ title, coverImage, videos, liveStreamSource }) => (
  <div className="p-relative">
    <div
      className="p-absolute w-100 h-100 overflow-hidden"
      style={{ bottom: 50 }}
    >
      <Media
        imageUrl={get(coverImage, "sources[0].uri", "")}
        imageAlt={`${title} - ${get(coverImage, "name", "")}`}
        ratio={{ xs: "1by1", md: "16by9" }}
        forceRatio
        className="absolute-center"
        style={{ filter: "blur(50px)", height: "150%", width: "150%" }}
      />
      <div className="fill bg-black opacity-30" />
    </div>

    <div className="container-fluid mx-auto">
      <div className="row mt-4">
        <div className="col-lg-8">
          <Media
            imageUrl={get(coverImage, "sources[0].uri", "")}
            videoUrl={
              !!liveStreamSource && liveStreamSource !== ""
                ? liveStreamSource
                : get(videos, "[0].sources[0].uri", "")
            }
            isLive={!!liveStreamSource && liveStreamSource !== ""}
            imageAlt={`${title} - ${get(coverImage, "name", "")}`}
            className="max-height-45-vh"
            ratio={{ xs: "1by1", md: "16by9" }}
            forceRatio
            rounded
            showControls
            className="shadow"
          />
        </div>
        <div className="col-lg-4 pl-2">
          <div
            className="w-100 h-100 d-flex justify-content-center align-items-center"
            style={{ background: "rgba(0, 255, 255, 0.3)" }}
          >
            <code>{"<LiveStreamPanel />"}</code>
          </div>
        </div>
      </div>
    </div>
  </div>
);

EventBanner.propTypes = {
  title: PropTypes.string,
  coverImage: PropTypes.shape({
    name: PropTypes.string,
    sources: PropTypes.arrayOf(PropTypes.shape({ uri: PropTypes.string })),
  }),
  videos: PropTypes.arrayOf(
    PropTypes.shape({
      sources: PropTypes.arrayOf(PropTypes.shape({ uri: PropTypes.string })),
    })
  ),
};

EventBanner.defaultProps = {
  title: "",
  coverImage: {},
  videos: [],
};

export default EventBanner;

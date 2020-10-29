import React from 'react';
import PropTypes from 'prop-types';

// add any additional parameters to the video urls
const videoCallURLWithParameters = (videoURL, parameters) => {
  if (!videoURL) return '';
  const isMSIE = /*@cc_on!@*/ false || !!document.documentMode; //eslint-disable-line spaced-comment
  let urlWithParams = videoURL;

  if (!isMSIE) {
    urlWithParams = new URL(videoURL);

    if (parameters) {
      Object.entries(parameters).map(([key, value]) =>
        urlWithParams.searchParams.set(key, value)
      );
    }

    urlWithParams = urlWithParams.href;
  }

  return urlWithParams;
};

const GroupEventOccurrences = ({ videos }) => (
  <div className="row justify-content-around my-3">
    {videos.map(({ userName, link, onClick, label }, i) => (
      <a
        key={link}
        className="btn btn-primary mb-3"
        href={videoCallURLWithParameters(
          link,
          userName
            ? {
                uname: userName,
              }
            : null
        )}
        onClick={onClick}
        target="_blank"
      >
        {label}
      </a>
    ))}
  </div>
);

GroupEventOccurrences.propTypes = {
  videos: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      userName: PropTypes.string,
      onClick: PropTypes.func,
      link: PropTypes.string,
    })
  ),
};

export default GroupEventOccurrences;

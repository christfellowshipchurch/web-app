import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { get } from 'lodash';

const DEFAULT_GROUP_IMAGE =
  'https://cloudfront.christfellowship.church/GetImage.ashx?guid=eb9cc3da-79cb-488b-961c-42438ada709d';

// :: Styled Components
// ------------------------

const Image = styled.img`
  display: flex;
  width: 100%;
  flex: 1;
`;

// :: Main Component
// ------------------------
const GroupImage = ({ coverImage, title }) => {
  const src = get(coverImage, 'sources[0].uri', DEFAULT_GROUP_IMAGE);
  return <img src={src} alt={title} />;
};

GroupImage.propTypes = {
  coverImage: PropTypes.shape({
    name: PropTypes.string,
    sources: PropTypes.arrayOf(PropTypes.shape({ uri: PropTypes.string })),
  }),
  title: PropTypes.string,
};

export default GroupImage;

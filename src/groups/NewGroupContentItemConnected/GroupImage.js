import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { get } from 'lodash';

const DEFAULT_GROUP_IMAGE =
  'https://cloudfront.christfellowship.church/GetImage.ashx?guid=eb9cc3da-79cb-488b-961c-42438ada709d';

// :: Styled Components
// ------------------------

const OuterContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 0;
  padding-top: 36%; // Enforces aspect ratio
  overflow: hidden;
`;

const InnerContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
`;

const Image = styled.img`
  width: 100%;
  object-fit: cover;
  object-position: center;
`;

// :: Main Component
// ------------------------
const GroupImage = ({ coverImage, title }) => {
  const src = get(coverImage, 'sources[0].uri', DEFAULT_GROUP_IMAGE);
  return (
    <OuterContainer>
      <InnerContainer>
        <Image src={src} alt={title} />
      </InnerContainer>
    </OuterContainer>
  );
};

GroupImage.propTypes = {
  coverImage: PropTypes.shape({
    name: PropTypes.string,
    sources: PropTypes.arrayOf(PropTypes.shape({ uri: PropTypes.string })),
  }),
  title: PropTypes.string,
};

export default GroupImage;

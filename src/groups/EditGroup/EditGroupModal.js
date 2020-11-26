import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import { baseUnit, themeGet } from 'styles/theme';

import { FloatingCard } from 'ui';
import {
  GroupResourceProp,
  processResource,
} from '../NewGroupContentItemConnected/GroupResources';
import GroupImage from '../NewGroupContentItemConnected/GroupImage';
import { EditGroupPhoto } from './EditGroupPhoto';
import EditGroupResources from './EditGroupResources';

// :: Styled Components
// ------------------------

const Title = styled.h2`
  color: ${themeGet('font.h1')};
  margin-bottom: ${baseUnit(3)};
`;

// :: Main Component
// ------------------------

const EditGroupModal = ({ visible, resources, coverImage, groupId, onPressExit }) => {
  if (!visible) return null;

  return (
    <FloatingCard
      bodyClassNames={'pl-4 pt-0 pb-4 pr-4 overflow-y-auto'}
      onPressExit={onPressExit}
      containerStyles={{ bottom: '5%' }}
    >
      <Title>Edit Group Details</Title>
      <EditGroupPhoto groupId={groupId} coverImage={coverImage} />
      <EditGroupResources resources={resources.map(processResource)} groupId={groupId} />
    </FloatingCard>
  );
};

EditGroupModal.propTypes = {
  visible: PropTypes.bool,
  resources: PropTypes.arrayOf(GroupResourceProp),
  onPressExit: PropTypes.func,
  groupId: PropTypes.string,
  coverImage: GroupImage.propTypes.coverImage,
};

export default EditGroupModal;

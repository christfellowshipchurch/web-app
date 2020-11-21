import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import { baseUnit, themeGet } from 'styles/theme';

import { FloatingCard } from 'ui';
import { GroupResourceProp } from '../NewGroupContentItemConnected/GroupResources';
import GroupImage from '../NewGroupContentItemConnected/GroupImage';
import { EditGroupPhoto } from './EditGroupPhoto';
import EditGroupResources from './EditGroupResources';

// :: Styled Components
// ------------------------

const Title = styled.h2`
  color: ${themeGet('font.h1')};
  margin-bottom: ${baseUnit(3)};
`;

const EditGroupModal = ({
  visible,
  resources,
  coverImage,
  groupId,
  onPressExit,
  refetchData,
}) => {
  if (!visible) return null;

  return (
    <FloatingCard bodyClassNames={'pl-4 pt-0 pb-4 pr-4'} onPressExit={onPressExit}>
      <Title>Customize My Group</Title>
      <EditGroupPhoto
        groupId={groupId}
        refetchData={refetchData}
        coverImage={coverImage}
      />
      <EditGroupResources
        resources={resources}
        groupId={groupId}
        refetchData={refetchData}
      />
    </FloatingCard>
  );
};

EditGroupModal.propTypes = {
  visible: PropTypes.bool,
  resources: PropTypes.arrayOf(GroupResourceProp),
  onPressExit: PropTypes.func,
  groupId: PropTypes.string,
  refetchData: PropTypes.func,
  coverImage: GroupImage.propTypes.coverImage,
};

export default EditGroupModal;

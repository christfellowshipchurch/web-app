import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { ProcessedResourceProps } from '../NewGroupContentItemConnected/GroupResources';
import GroupImage from '../NewGroupContentItemConnected/GroupImage';

import EditGroupItem from './EditGroupItem';
import ResourceUrl from './ResourceUrl';
import ResourceContentItem from './ResourceContentItem';
import AddResource from './AddResource';
import ResourceDetails from './ResourceDetails';

export default function EditGroupResources({ groupId, resources }) {
  const [addingResource, setAddingResource] = useState(false);

  // Upon refetching resource data after adding/updating a resource,
  // Reset resources area to show list of resources instead of form
  useEffect(() => {
    setAddingResource(false);
  }, [resources]);

  return addingResource ? (
    <EditGroupItem
      title="Resources"
      action={() => setAddingResource(false)}
      actionLabel="Cancel"
    >
      <AddResource groupId={groupId} resources={resources} />
    </EditGroupItem>
  ) : (
    <EditGroupItem
      title="Resources"
      action={() => setAddingResource(true)}
      actionLabel="Add"
    >
      {resources.map((resource) => (
        <ResourceDetails key={resource.id}>
          {resource.action === 'OPEN_URL' ? (
            <ResourceUrl resource={resource} groupId={groupId} resources={resources} />
          ) : (
            <ResourceContentItem
              resource={resource}
              groupId={groupId}
              resources={resources}
            />
          )}
        </ResourceDetails>
      ))}
    </EditGroupItem>
  );
}

EditGroupResources.propTypes = {
  visible: PropTypes.bool,
  resources: PropTypes.arrayOf(ProcessedResourceProps),
  onPressExit: PropTypes.func,
  groupId: PropTypes.string,
  coverImage: GroupImage.propTypes.coverImage,
};

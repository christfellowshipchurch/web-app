import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { theme } from 'styles/theme';
import { Button } from '../../ui';
import { Icon } from '../../ui/Icons';
import { ProcessedResourceProps } from '../NewGroupContentItemConnected/GroupResources';
import EditResourceUrl from './EditResourceUrl';
import EditResourceContentItem from './EditResourceContentItem';

export default function AddResource({ groupId, resources = [] }) {
  const [resourceType, setResourceType] = useState();

  switch (resourceType) {
    case 'url':
      return (
        <EditResourceUrl
          groupId={groupId}
          onCancel={() => setResourceType(null)}
          resources={resources}
        />
      );
    case 'contentItem':
      return (
        <EditResourceContentItem
          groupId={groupId}
          onCancel={() => setResourceType(null)}
          resources={resources}
        />
      );
    default:
      return (
        <div style={{ display: 'flex' }}>
          <Button
            className="mr-2"
            title={
              <div>
                <Icon className="mr-1" name="connected" fill={theme.brandForeground} />
                Add URL
              </div>
            }
            onClick={() => setResourceType('url')}
          />
          <Button
            title={
              <div>
                <Icon className="mr-1" name="book-alt" fill={theme.brandForeground} />
                Add Study
              </div>
            }
            onClick={() => setResourceType('contentItem')}
          />
        </div>
      );
  }
}

AddResource.propTypes = {
  groupId: PropTypes.string,
  resources: PropTypes.arrayOf(ProcessedResourceProps),
};

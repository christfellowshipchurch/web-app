import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { theme } from 'styles/theme';
import { Button } from '../../ui';
import { Icon } from '../../ui/Icons';
import EditResourceUrl from './EditResourceUrl';
import EditResourceContentItem from './EditResourceContentItem';

export default function AddResource({ groupId, refetchData }) {
  const [resourceType, setResourceType] = useState();

  switch (resourceType) {
    case 'url':
      return (
        <EditResourceUrl
          groupId={groupId}
          refetchData={refetchData}
          onCancel={() => setResourceType(null)}
        />
      );
    case 'contentItem':
      return (
        <EditResourceContentItem
          groupId={groupId}
          refetchData={refetchData}
          onCancel={() => setResourceType(null)}
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
  refetchData: PropTypes.func,
};

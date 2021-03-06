import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import { ContentCard, Loader } from 'ui';

import dateTextFormat from 'groups/dateTextFormat';

const LoadingState = ({ children, isLoading }) =>
  isLoading ? (
    <div style={{ position: 'relative', height: '30vh' }}>
      <Loader />
    </div>
  ) : (
    children
  );

LoadingState.propTypes = {
  children: PropTypes.node,
  isLoading: PropTypes.bool,
};

const GroupList = ({ isLoading, groups }) => (
  <LoadingState isLoading={isLoading}>
    {groups.length ? (
      <section className="row mx-n2">
        {groups.map((group) => (
          <ContentCard
            key={group.id}
            urlBase="groups"
            className="my-4"
            id={group.id}
            coverImage={get(group, 'coverImage.sources', '')}
            title={get(group, 'title', '')}
            label={{
              bg: 'dark',
              textColor: 'white',
              value: dateTextFormat(get(group, 'dateTime.start')),
            }}
          />
        ))}
      </section>
    ) : (
      <p className="pt-2">
        {`You're not currently in any groups. `}
        <a href="https://rock.christfellowship.church/groups">Find a new group</a>!
      </p>
    )}
  </LoadingState>
);

GroupList.propTypes = {
  isLoading: PropTypes.bool,
  groups: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      coverImage: PropTypes.shape({ sources: PropTypes.array }),
      title: PropTypes.string,
      dateTime: PropTypes.shape({
        end: PropTypes.string,
        start: PropTypes.string,
      }),
    })
  ),
};

export default GroupList;

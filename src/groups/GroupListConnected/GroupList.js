import React from 'react';
import { get } from 'lodash';
import Proptypes from 'prop-types';

import { ContentCard, Loader } from '../../ui';

import dateLabel from './dateLabel';

const LoadingState = ({ children, isLoading }) =>
  isLoading ? (
    <div style={{ position: 'relative', height: '30vh' }}>
      <Loader />
    </div>
  ) : (
    children
  );

LoadingState.propTypes = {
  children: Proptypes.node,
  isLoading: Proptypes.bool,
};

const GroupList = ({ isLoading, groups }) =>
  console.log(groups) || (
    <LoadingState isLoading={isLoading}>
      {groups ? (
        <section className="row mx-n2">
          {groups.map(
            (n) =>
              console.log(get(n, 'dateTime.start')) || (
                <ContentCard
                  key={n.id}
                  urlBase="groups"
                  className="my-4"
                  id={n.id}
                  coverImage={get(n, 'coverImage.sources', '')}
                  title={get(n, 'title', '')}
                  label={{
                    bg: 'dark',
                    textColor: 'white',
                    value: dateLabel(get(n, 'dateTime.start')),
                  }}
                />
              )
          )}
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
  isLoading: Proptypes.bool,
  groups: Proptypes.arrayOf(
    Proptypes.shape({
      id: Proptypes.string,
      coverImage: Proptypes.shape({ sources: Proptypes.array }),
      title: Proptypes.string,
      schedule: Proptypes.shape({ friendlyScheduleText: Proptypes.string }),
    })
  ),
};

export default GroupList;

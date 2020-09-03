import React from 'react';
import { get } from 'lodash';

import { ContentCard, Loader } from '../../ui';

const GroupList = ({ isLoading, currentUserGroups }) => {
  if (isLoading) {
    return (
      <div style={{ position: 'relative', height: '50vh' }}>
        <Loader />
      </div>
    );
  }

  return (
    <div className="container-fluid mt-md-6 mt-4 mb-6 px-4" style={{ minHeight: '30vh' }}>
      <div className="row pt-2">
        <div className="col">
          <h1 className="mb-0">Your Groups</h1>
        </div>
      </div>
      {false ? (
        <section className="row mx-n2">
          {currentUserGroups.map((n) => (
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
                value: get(n, 'schedule.friendlyScheduleText'),
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
    </div>
  );
};

export default GroupList;

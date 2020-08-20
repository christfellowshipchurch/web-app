import React from 'react';

import { useAuth } from '../auth';
import { Button, Media } from '../ui';

import GroupListConnected from './GroupListConnected';

const Groups = ({ title }) => {
  const { isLoggedIn } = useAuth();

  return (
    <div className="container-fluid my-6 px-4">
      <div className="row pt-2">
        <div className="col">
          <h1 className="mb-0">Groups</h1>
        </div>
      </div>
      {isLoggedIn ? (
        <GroupListConnected />
      ) : (
        <div className="row pt-2">
          <Media
            imageUrl="https://rock.christfellowship.church/Content/ExternalSite/Banners/GroupsHeader.jpg"
            imageAlt="Find Your Group"
            ratio="21by9"
          />

          <p className="row pt-2">
            Groups help you find community and build the kind of friendships we all need to live out
            our faith. During this season, we have online study groups as well as groups meeting in
            person (with social distancing in place) that will encourage you to grow stronger in
            your relationship with God and discover your purpose so you can impact your world. We
            have groups for everyone where you can grow together and build friendships. Not sure
            which one? Click here for assistance. We'd love to help you find a group that's right
            for you!
          </p>
          <a
            className="btn btn-primary btn-block my-3"
            href="https://rock.christfellowship.church/groups"
          >
            Find Your Group
          </a>
        </div>
      )}
    </div>
  );
};

export default Groups;

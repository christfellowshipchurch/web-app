import React from 'react';

import { useAuth } from '../auth';
import { Media } from '../ui';

import GroupListConnected from './GroupListConnected';

const Groups = () => {
  const { isLoggedIn, logIn } = useAuth();

  return (
    <>
      <Media
        imageUrl="https://rock.christfellowship.church/Content/ExternalSite/Banners/GroupsHeader.jpg"
        imageAlt="Find Your Group"
        ratio="21by9"
        overlay="black"
      >
        <div className="container-fluid max-width-1100 py-6 opacity-100 animate-slide-bottom-top">
          <div className="col-12 col-md text-center px-4 my-2">
            <div className="max-width-800 mx-auto">
              <h1 className="font-wieight-bold text-white">Groups</h1>
              <p className="text-white">
                Groups help you find community and build the kind of friendships we all need to live
                out our faith. During this season, we have online study groups as well as groups
                meeting in person (with social distancing in place) that will encourage you to grow
                stronger in your relationship with God and discover your purpose so you can impact
                your world. We have groups for everyone where you can grow together and build
                friendships. Not sure which one? Click here for assistance. We'd love to help you
                find a group that's right for you!
              </p>
            </div>
            {isLoggedIn ? (
              <a
                className="btn btn-blk btn-primary mt-2"
                href="https://rock.christfellowship.church/groups"
              >
                Find A New Group
              </a>
            ) : null}
          </div>
        </div>
      </Media>

      {isLoggedIn ? (
        <div className="container-fluid mt-md-6 mt-4 mb-6 px-4">
          <div className="row pt-2">
            <div className="col">
              <h1 className="mb-0">Your Groups</h1>
            </div>
          </div>
          <GroupListConnected />
        </div>
      ) : (
        <section className="container-fluid py-md-5 py-4 px-4">
          <div className="row justify-content-center align-items-center">
            <a
              className="btn btn-blk btn-primary col-md-4 my-2 mr-md-3"
              href="https://rock.christfellowship.church/groups"
            >
              Find A Group
            </a>

            <button className="col-md-4 btn btn-blk btn-outline-dark" onClick={() => logIn()}>
              Login For Your Groups
            </button>
          </div>
        </section>
      )}
    </>
  );
};

export default Groups;

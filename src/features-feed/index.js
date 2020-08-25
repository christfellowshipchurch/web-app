import React from 'react';
import { useQuery } from 'react-apollo';
import { get, flatten } from 'lodash';

import { Feature } from '../feature';
import { Loader } from '../ui';
import { useSandbox } from '../sandbox';

import { GET_FEED_FEATURES } from './queries';

const mapDataToActions = (data) => flatten(data.map(({ actions }) => actions));

const FeatureFeed = () => {
  const { sandboxEnabled, sandbox, setSandboxValue } = useSandbox({ homeTheme: 'hero' });
  const { loading, error, data } = useQuery(GET_FEED_FEATURES, {
    fetchPolicy: 'cache-and-network',
  });

  if (error) return <h1 className="text-danger">...oops</h1>;

  if (loading) {
    return (
      <div className="w-100 h-100">
        <Loader />
      </div>
    );
  }

  const content = mapDataToActions(get(data, 'userFeedFeatures', []));

  return (
    <div>
      {content.map((n, i) => (
        <Feature {...n} index={i} />
      ))}
      {sandboxEnabled && (
        <nav className="navbar fixed-bottom navbar-expand navbar-light bg-primary">
          <div className="collapse navbar-collapse" id="navbarText">
            <span className="navbar-text">Select a theme</span>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item px-3 dropdown">
                <select
                  value={sandbox.homeTheme}
                  className="dropdown-toggle text-white font-weight-bold"
                  onChange={(e) => setSandboxValue('homeTheme', e.target.value)}
                >
                  <option value="default">Default</option>
                  <option value="highlight">Highlight Card</option>
                  <option value="hero">Hero Image</option>
                  <option value="netflix">Netflix</option>
                </select>
              </li>
            </ul>
          </div>
        </nav>
      )}
    </div>
  );
};

FeatureFeed.propTypes = {};

FeatureFeed.defaultProps = {};

export default FeatureFeed;

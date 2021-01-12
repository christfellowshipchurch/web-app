import React from 'react';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';
import { get } from 'lodash';
import classnames from 'classnames';

import { Loader } from '../../ui';

const GET_LINK_TREE = gql`
  query getLinkTree {
    linkTree {
      title
      action
      relatedNode {
        id
        ... on Url {
          url
        }
      }
    }
  }
`;

const LinkTree = () => {
  const { data, loading, error } = useQuery(GET_LINK_TREE, {
    fetchPolicy: 'cache-and-network',
  });

  /**
   * Probably not totally necessary, but just to make sure we don't accidentally treat
   * something that's not a URL as a URL
   */
  const actions = get(data, 'linkTree', []).filter((link) => link.action === 'OPEN_URL');
  const className = classnames('col-12', 'col-md-6', 'col-lg-4', 'p-2');

  if (loading && actions.length < 1) return <Loader />;

  return (
    <div className="container my-6 px-2">
      <div className="row">
        {actions.map((action) => (
          <div className={className}>
            <a
              href={action.relatedNode.url}
              className="btn btn-block btn-primary text-white"
            >
              {action.title}
            </a>
          </div>
        ))}
        <div className="col" style={{ minHeight: '50vh' }}></div>
      </div>
    </div>
  );
};

export default LinkTree;

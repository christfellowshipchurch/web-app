import React from 'react';
import { useQuery } from 'react-apollo';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { get, lowerCase, camelCase } from 'lodash';
import { mapEdgesToNodes } from '../../utils';

import { Loader } from '../../ui';
import BackgroundContentBlock from '../BackgroundContentBlock';
import Block from '../Block';
import GroupBlock from '../GroupBlock';
import { Feature } from '../../modules';

import { GET_CONTENT_BY_ID } from './queries';

const TabContent = ({
  id, // where id is of the piece of content that should get loaded into the
}) => {
  const { loading, error, data } = useQuery(GET_CONTENT_BY_ID, { variables: { id } });

  if (loading) return <Loader />;

  if (error) {
    console.log({ error });
    return null;
  }

  const blockItems = mapEdgesToNodes(data.node.childContentItemsConnection);
  const bg = 'bg-transparent';

  return (
    <div className="container-fluid">
      {blockItems.map((item, i) => {
        const id = lowerCase(get(item, 'title', '')).replace(/\s/g, '-');
        const topPadding = i === 0 ? 'pt-5' : '';
        const contentLayout = camelCase(get(item, 'contentLayout', ''));
        let content = null;

        switch (item.__typename) {
          case 'WebsiteBlockItem':
            if (contentLayout.includes('background')) {
              content = <BackgroundContentBlock {...item} className={topPadding} />;
            } else {
              content = (
                <Block
                  {...item}
                  className={topPadding}
                  contentLayout={contentLayout}
                  withAnimation
                />
              );
            }
            break;
          case 'WebsiteGroupItem':
            content = (
              <div className={classnames('col', topPadding)}>
                <GroupBlock {...item} />
              </div>
            );
            break;
          case 'WebsiteFeature':
            content = (
              <div className={classnames('col', 'px-4', topPadding)}>
                <Feature name={get(item, 'feature', '')} background={bg} />
              </div>
            );
            break;
          default:
            content = (
              <h1 className={classnames('text-center', topPadding)}>{item.title}</h1>
            );
            break;
        }

        return (
          <div id={id} className={`row ${bg}`} key={i}>
            {content}
          </div>
        );
      })}
    </div>
  );
};

TabContent.propTypes = {
  id: PropTypes.string.isRequired,
};

TabContent.defaultProps = {};

export default TabContent;

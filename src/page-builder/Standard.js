import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useQuery } from 'react-apollo';
import { get, camelCase, lowerCase } from 'lodash';
import { mapEdgesToNodes, htmlToReactParser } from '../utils';

import { Block, BackgroundContentBlock, GroupBlock, Loader, ErrorBlock } from '../ui';
import { Feature } from '../modules';
import { GET_BLOCK_ITEMS } from './queries';

const bgColor = {
  true: 'bg-transparent',
  false: 'bg-white',
  accordion: 'bg-transparent',
};

const DefaultPage = ({ title }) => {
  const website = process.env.REACT_APP_WEBSITE_KEY;

  const { loading, error, data } = useQuery(GET_BLOCK_ITEMS, {
    variables: { website, title },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) {
    return (
      <div className="vh-100 vw-100 d-flex justify-content-center align-items-center bg-light">
        <Loader />
      </div>
    );
  }

  if (error) {
    console.error('ERROR: ', { error });
    return <ErrorBlock />;
  }

  let bgIndex = true;

  const blockItems = mapEdgesToNodes(
    data.getWebsitePageContentByTitle.childContentItemsConnection
  );

  return (
    <div className="w-100">
      {blockItems.map((item, i) => {
        const id = lowerCase(get(item, 'title', '')).replace(/\s/g, '-');
        const bg = bgColor[`${bgIndex}`];
        let content = null;

        if (!camelCase(get(item, 'contentLayout', '')).includes('background')) {
          bgIndex = !bgIndex;
        }

        switch (item.__typename) {
          case 'WebsiteBlockItem':
            if (camelCase(get(item, 'contentLayout', '')).includes('background')) {
              content = <BackgroundContentBlock {...item} />;
            } else {
              content = <Block {...item} />;
            }
            break;
          case 'WebsiteGroupItem':
            content = (
              <div className={classnames('col')}>
                <GroupBlock {...item} />
              </div>
            );
            break;
          case 'WebsiteFeature':
            content = (
              <div className={classnames('col', 'px-4')}>
                <Feature
                  name={get(item, 'feature', '')}
                  background={bg}
                  {...item}
                  isRsvp
                />
              </div>
            );
            break;
          case 'WebsiteHtmlBlockItem':
            content = <div>{htmlToReactParser.parse(item.htmlContent)}</div>;
            break;
          default:
            content = <h1 className={classnames('text-center')}>{item.title}</h1>;
            break;
        }

        return (
          <div id={id} className={`p-relative overflow-hidden ${bg}`} key={i}>
            {content}
          </div>
        );
      })}
    </div>
  );
};

DefaultPage.defaultProps = {
  title: 'home',
};

DefaultPage.propTypes = {
  title: PropTypes.string,
  match: PropTypes.shape({
    params: PropTypes.shape({
      page: PropTypes.string,
    }),
  }),
};

export default DefaultPage;

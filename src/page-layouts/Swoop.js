import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useQuery } from 'react-apollo';

import { get, camelCase, lowerCase } from 'lodash';
import { mapEdgesToNodes } from '../utils';

import Loader from '../ui/Loader';

// import ContentContainer from ''
import { Block, BackgroundContentBlock, GroupBlock, HeroSection, Media } from '../ui';
import { Feature } from '../features';
import { GET_BLOCK_ITEMS } from './queries';

const bgColor = {
  true: 'bg-transparent',
  false: 'bg-white',
  accordion: 'bg-transparent',
};

const Swoop = ({ title }) => {
  const website = process.env.REACT_APP_WEBSITE_KEY;
  const { loading, error, data } = useQuery(GET_BLOCK_ITEMS, {
    variables: { website, title },
    fetchPolicy: 'cache-and-network',
  });

  if (loading)
    return (
      <div className="vh-100 vw-100 d-flex justify-content-center align-items-center bg-light">
        <Loader />
      </div>
    );

  if (error) {
    console.error('ERROR: ', { error });
    return (
      <h1 className="text-center">
        There was an error loading the page. Please try again.
      </h1>
    );
  }

  let bgIndex = true;

  const blockItems = mapEdgesToNodes(
    data.getWebsitePageContentByTitle.childContentItemsConnection
  );

  return blockItems.map((item, i) => {
    const id = lowerCase(get(item, 'title', '')).replace(/\s/g, '-');
    const bg = bgColor[`${bgIndex}`];
    let content = null;

    if (!camelCase(get(item, 'contentLayout', '')).includes('background'))
      bgIndex = !bgIndex;

    switch (item.__typename) {
      case 'WebsiteBlockItem':
        item.contentLayout = camelCase(item.contentLayout);
        switch (get(item, 'contentLayout', '')) {
          case 'backgroundLarge':
            content = (
              <HeroSection
                title={get(item, 'title', '')}
                htmlContent={get(item, 'htmlContent', '')}
                image={{
                  uri: get(item, 'images[0].sources[0].uri', ''),
                  alt: `Christ Fellowship Church - ${get(item, 'title', '')}`,
                }}
                video={{ uri: get(item, 'videos[0].sources[0].uri', '') }}
                callToAction={get(item, 'callToAction', null)}
                secondaryCallToAction={get(item, 'callToAction', null)}
              />
            );
            break;
          case 'backgroundSmall':
            // content = <BackgroundContentBlock {...item} />
            content = (
              <div className="col bg-primary">
                <Media
                  // fill="container"
                  videoUrl={get(item, 'videos[0].sources[0].uri', '')}
                  imageUrl={get(item, 'images[0].sources[0].uri', '')}
                  imageAlt={`Christ Fellowship Church - ${get(item, 'title', '')}`}
                  className="text-white"
                >
                  <Block
                    withAnimation
                    contentLayout="default"
                    title={get(item, 'title', '')}
                    htmlContent={get(item, 'htmlContent', '')}
                    callToAction={get(item, 'callToAction', null)}
                    secondaryCallToAction={get(item, 'callToAction', null)}
                  />
                </Media>
              </div>
            );
            break;
          default:
            content = <Block withAnimation {...item} />;
            break;
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
            <Feature name={get(item, 'feature', '')} background={bg} {...item} />
          </div>
        );
        break;
      default:
        content = <h1 className={classnames('text-center')}>{item.title}</h1>;
        break;
    }

    return (
      <div id={id} className={`${bg}`} key={i}>
        {content}
      </div>
    );
  });

  return (
    <div className="w-100">
      {blockItems.map((item, i) => {
        const id = lowerCase(get(item, 'title', '')).replace(/\s/g, '-');
        const bg = bgColor[`${bgIndex}`];
        let content = null;

        if (!camelCase(get(item, 'contentLayout', '')).includes('background'))
          bgIndex = !bgIndex;

        switch (item.__typename) {
          case 'WebsiteBlockItem':
            item.contentLayout = camelCase(item.contentLayout);
            switch (get(item, 'contentLayout', '')) {
              case 'backgroundLarge':
                content = (
                  <HeroSection
                    title={get(item, 'title', '')}
                    htmlContent={get(item, 'htmlContent', '')}
                    image={{
                      uri: get(item, 'images[0].sources[0].uri', ''),
                      alt: `Christ Fellowship Church - ${get(item, 'title', '')}`,
                    }}
                    video={{ uri: get(item, 'videos[0].sources[0].uri', '') }}
                    callToAction={get(item, 'callToAction', null)}
                    secondaryCallToAction={get(item, 'callToAction', null)}
                  />
                );
                break;
              case 'backgroundSmall':
                // content = <BackgroundContentBlock {...item} />
                content = (
                  <div className="col bg-primary">
                    <Media
                      // fill="container"
                      videoUrl={get(item, 'videos[0].sources[0].uri', '')}
                      imageUrl={get(item, 'images[0].sources[0].uri', '')}
                      imageAlt={`Christ Fellowship Church - ${get(item, 'title', '')}`}
                      className="text-white"
                    >
                      <Block
                        withAnimation
                        contentLayout="default"
                        title={get(item, 'title', '')}
                        htmlContent={get(item, 'htmlContent', '')}
                        callToAction={get(item, 'callToAction', null)}
                        secondaryCallToAction={get(item, 'callToAction', null)}
                      />
                    </Media>
                  </div>
                );
                break;
              default:
                content = <Block withAnimation {...item} />;
                break;
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
                <Feature name={get(item, 'feature', '')} background={bg} />
              </div>
            );
            break;
          default:
            content = <h1 className={classnames('text-center')}>{item.title}</h1>;
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

Swoop.defaultProps = {
  title: 'home',
};

Swoop.propTypes = {
  title: PropTypes.string,
};

export default Swoop;

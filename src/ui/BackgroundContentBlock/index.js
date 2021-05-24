import React from 'react';
import classnames from 'classnames';
import { camelCase, get } from 'lodash';
import { htmlToReactParser } from '../../utils';
import { ButtonRow, Layout, Media } from '../../ui';

const BackgroundContentBlock = ({
  contentLayout,
  images,
  videos,
  imageAlt,
  imageRatio,
  subtitle,
  title,
  htmlContent,
  callToAction,
  secondaryCallToAction,
  openLinksInNewTab,
  className,
}) => {
  const lg = camelCase(contentLayout).includes('Large');
  const titleSize = lg ? 'display-3' : 'h1';
  const fontSize = lg ? 'bg-body-text' : '';

  // ! WARNING
  // These changes are for only DEMOING the External site `/new-here` page, and will BREAK site if merged!!!
  // ! WARNING

  return (
    <div
      className={classnames(
        'col',
        lg ? 'py-6' : '',
        className,
        'd-flex',
        'flex-column',
        'align-items-center'
      )}
    >
      <div className="w-100" style={{ top: 0, left: 0, overflow: 'hidden' }}>
        <Media
          imageUrl={get(images, '[0].sources[0].uri', '')}
          imageAlt={imageAlt}
          videoUrl={get(videos, '[0].sources[0].uri', '')}
          ratio={'21by9'}
        />
      </div>

      <Layout contentLayout="default" className="max-width-800 py-6">
        <h1>{title}</h1>

        <div>{subtitle}</div>

        <p className={`pb-4`}>{htmlToReactParser.parse(htmlContent)}</p>

        <ButtonRow
          callToAction={callToAction}
          secondaryCallToAction={secondaryCallToAction}
          openLinksInNewTab={openLinksInNewTab}
        />
      </Layout>
    </div>
  );
};

BackgroundContentBlock.propTypes = {};

BackgroundContentBlock.defaultProps = {};

export default BackgroundContentBlock;

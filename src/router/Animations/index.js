import React from 'react';
import { get } from 'lodash';

import { HeroSection } from 'ui';

const item = {
  id: 'WebsiteBlockItem:82aac5b9d12501f09b34f5fe56930655',
  title: 'Welcome to Christ Fellowship Church',
  htmlContent:
    'We are a church in South Florida with a passion to help you know God, grow in your relationships, discover your purpose, and impact your world.',
  videos: [
    {
      sources: [
        {
          uri:
            'https://cloudfront.christfellowship.church/GetFile.ashx?guid=0a65948a-c120-4a77-bc50-bc5721ba55b8',
        },
      ],
    },
  ],
  images: [
    {
      sources: [],
    },
  ],
  coverImage: null,
  subtitle: '',
  contentLayout: 'Background Large',
  callToAction: {
    call: 'PLAN YOUR VISIT',
    action: 'https://beta.christfellowship.church/plan-your-visit-page',
  },
  secondaryCallToAction: {
    call: 'What to Expect',
    action: '#heres-what-you-can-expect-when-you-visit-christ-fellowship',
  },
  imageAlt: '',
  imageRatio: '16by9',
  openLinksInNewTab: false,
};

const Router = () => {
  return (
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
};

export default Router;

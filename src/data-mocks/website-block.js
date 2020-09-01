import { GET_BLOCK_ITEMS } from '../page-builder/queries';

export const BLOCK_TEMPLATE = {
  // __typename: 'WebsiteBlockItem',
  id: 'WebsiteBlockItem:1',
  title: 'website-block-1',
  subtitle: 'Block Subtitle',
  htmlContent: 'this html content. blah blah blah bla',
  images: [
    {
      sources: [
        {
          uri:
            'https://cloudfront.christfellowship.church/GetImage.ashx?guid=b3bce55f-f06a-4780-879e-f1fc2ad60133',
        },
      ],
    },
  ],
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
  subtitle: '',
  contentLayout: 'Default',
  callToAction: null,
  secondaryCallToAction: null,
  coverImage: {
    name: 'Image',
    sources: [
      {
        uri:
          'https://cloudfront.christfellowship.church/GetImage.ashx?guid=37770b2c-ff34-4c1f-a326-b141f0fa7f16',
      },
    ],
  },
  imageAlt: '',
  imageRatio: '1by1',
  openLinksInNewTab: false,
};

export const GET_BLOCK_ITEM_MOCK = {
  request: {
    query: GET_BLOCK_ITEMS,
    variables: {
      website: 'MOCKED_WEBSITE',
      title: 'website-block-1',
    },
  },
  result: {
    data: {
      getWebsitePageContentByTitle: {
        edges: [
          {
            node: BLOCK_TEMPLATE,
          },
        ],
      },
    },
  },
};

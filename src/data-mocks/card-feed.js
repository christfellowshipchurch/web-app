import { GET_CONTENT_FEED } from '../content-feed/queries';

export const ITEM_ID = 'UniversalContentItem:8837c5fd8acf0d7f27dc80c7eb6025d0';
export const CHANNEL_ID = 'ContentChannel:000000000000000000000000';

export const CHILD_ITEM_FEED_MOCK = {
  request: {
    query: GET_CONTENT_FEED,
    variables: {
      itemId: ITEM_ID,
      sibling: false,
      child: true,
    },
  },
  result: {
    data: {
      node: {
        __typename: 'UniversalContentItem',
        id: ITEM_ID,
        title: 'Content Title',
        childContentItemsConnection: {
          edges: [
            {
              node: {
                __typename: 'UniversalContentItem',
                id: 'UniversalContentItem',
                title: 'Child Item',
              },
            },
          ],
        },
      },
    },
  },
};

export const SIBLING_ITEM_FEED_MOCK = {
  request: {
    query: GET_CONTENT_FEED,
    variables: {
      itemId: ITEM_ID,
      sibling: true,
      child: false,
    },
  },
  result: {
    data: {
      node: {
        __typename: 'UniversalContentItem',
        id: ITEM_ID,
        title: 'Content Title',
        siblingContentItemsConnection: {
          edges: [
            {
              node: {
                __typename: 'UniversalContentItem',
                id: 'UniversalContentItem',
                title: 'Child Item',
              },
            },
          ],
        },
      },
    },
  },
};

export const CHILD_CHANNEL_FEED_MOCK = {
  request: {
    query: GET_CONTENT_FEED,
    variables: {
      itemId: CHANNEL_ID,
      sibling: false,
      child: true,
    },
  },
  result: {
    data: {
      node: {
        __typename: 'ContentChannel',
        id: CHANNEL_ID,
        title: 'Channel Title',
        childContentItemsConnection: {
          edges: [
            {
              node: {
                __typename: 'ContentChannel',
                id: 'ContentChannel:0000000000000000',
                title: 'Child Item',
              },
            },
          ],
        },
      },
    },
  },
};

export const EMPTY_RESULTS_MOCK = {
  request: {
    query: GET_CONTENT_FEED,
    variables: {
      itemId: CHANNEL_ID,
      sibling: false,
      child: true,
    },
  },
  result: {
    data: {
      node: {
        __typename: 'ContentChannel',
        id: CHANNEL_ID,
        title: 'Channel Title',
        childContentItemsConnection: {
          edges: [],
        },
      },
    },
  },
};

export const FEED_ERROR = {
  request: {
    query: GET_CONTENT_FEED,
    variables: {
      variables: {
        itemId: 'UniversalContentItem:8837c5fd8acf0d7f27dc80c7eb6025d0',
        sibling: false,
        child: true,
      },
    },
  },
  error: new Error('There was an error'),
};

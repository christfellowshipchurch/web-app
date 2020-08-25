import React from 'react';
// import renderer, { act } from "react-test-renderer"
import { MockedProvider } from '@apollo/react-testing';
import { act, render } from '@testing-library/react';

import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { InMemoryCache } from 'apollo-cache-inmemory';
import introspectionQueryResultData from '../../../fragmentTypes.json';

import GroupBlock from '../GroupBlock';
import { WebBlocks } from '../../../data-mocks';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

const cache = new InMemoryCache({ addTypename: false, fragmentMatcher });

const { GET_GROUP_ITEM_MOCK } = WebBlocks;

let component = null;

describe('GroupBlock Renderer', () => {
  it('Displays a Row GroupBlock', async () => {
    await act(async () => {
      component = render(
        <MockedProvider mocks={[GET_GROUP_ITEM_MOCK]} addTypename={false} cache={cache}>
          <GroupBlock id="WebsiteGroupItem:1" groupLayout="row" />
        </MockedProvider>
      );
    });
    const { container } = component;
    expect(container).toMatchSnapshot();
  });

  // it("Displays a Accordion GroupBlock", async () => {
  //   await act(async () => {
  //     component = render(
  //       <MockedProvider
  //         mocks={[
  //           GET_GROUP_ITEM_MOCK
  //         ]}
  //         addTypename={true}
  //       >
  //         <GroupBlock
  //           id='WebsiteGroupItem:1'
  //           cache={cache}
  //           groupLayout='row'
  //         />
  //       </MockedProvider>
  //     )
  //   })
  //   const { container } = component
  //   expect(container).toMatchSnapshot()
  // })

  // it("Displays a Carousel GroupBlock", async () => {
  //   await act(async () => {
  //     component = render(
  //       <MockedProvider
  //         mocks={[
  //           GET_GROUP_ITEM_MOCK
  //         ]}
  //         addTypename={true}
  //       >
  //         <GroupBlock
  //           id='WebsiteGroupItem:1'
  //           cache={cache}
  //           groupLayout='carousel'
  //         />
  //       </MockedProvider>
  //     )
  //   })
  //   const { container } = component
  //   expect(container).toMatchSnapshot()
  // })

  // it("Displays a Tabs GroupBlock", async () => {
  //   await act(async () => {
  //     component = render(
  //       <MockedProvider
  //         mocks={[
  //           GET_GROUP_ITEM_MOCK
  //         ]}
  //         addTypename={true}
  //       >
  //         <GroupBlock
  //           id='WebsiteGroupItem:1'
  //           cache={cache}
  //           groupLayout='tabs'
  //         />
  //       </MockedProvider>
  //     )
  //   })
  //   const { container } = component
  //   expect(container).toMatchSnapshot()
  // })
});

import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import { act, render } from '@testing-library/react';
import wait from 'waait';
import { set } from 'lodash';

import { Articles } from '../../../../data-mocks';
import { RelatedArticles } from '..';

const {
  RELATED_ARTICLES_MOCKS,
  RELATED_ARTICLES_ERROR,
  TOP_THREE_ARTICLES_MOCKS,
} = Articles;

let component = null;

describe('RelatedArticles', () => {
  it('renders without crashing', () => {
    act(() => {
      render(
        <MockedProvider mocks={[RELATED_ARTICLES_MOCKS]} addTypename={false}>
          <RelatedArticles id="MainArticle" />
        </MockedProvider>
      );
    });
  });

  it('renders the loading state', () => {
    act(() => {
      component = render(
        <MockedProvider mocks={[]}>
          <RelatedArticles id="MainArticle" />
        </MockedProvider>
      );
    });

    const { container } = component;
    expect(container).toMatchSnapshot();
  });

  it('renders the error state', async () => {
    await act(async () => {
      component = render(
        <MockedProvider mocks={[RELATED_ARTICLES_ERROR]}>
          <RelatedArticles id="MainArticle" />
        </MockedProvider>
      );

      await wait(0); // waits for response
    });

    const { container } = component;
    expect(container).toMatchSnapshot();
  });

  it('renders first three related articles', async () => {
    await act(async () => {
      component = render(
        <MockedProvider mocks={[RELATED_ARTICLES_MOCKS]} addTypename={false}>
          <RelatedArticles id="MainArticle" />
        </MockedProvider>
      );

      await wait(0); // waits for response
    });

    const { container } = component;
    expect(container).toMatchSnapshot();
  });

  // Top Three Articles
  it('renders the first three articles when no related articles are found', async () => {
    await act(async () => {
      const mocks = RELATED_ARTICLES_MOCKS;

      set(mocks, 'result.data.node.siblingContentItemsConnection.edges', []);

      component = render(
        <MockedProvider mocks={[mocks, TOP_THREE_ARTICLES_MOCKS]}>
          <RelatedArticles id="MainArticle" />
        </MockedProvider>
      );

      await wait(0); // waits for response
    });

    const { container } = component;
    expect(container).toMatchSnapshot();
  });
});

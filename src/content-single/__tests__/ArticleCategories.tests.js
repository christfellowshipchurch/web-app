import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import { act, render } from '@testing-library/react';
import wait from 'waait';

import { Articles } from '../../../../data-mocks';
import { ArticleCategories } from '..';

const { ARTICLE_CATEGORIES_MOCK, ARTICLE_CATEGORIES_ERROR } = Articles;

let component = null;

describe('ArticleCategories', () => {
  it('renders without crashing', () => {
    act(() => {
      render(
        <MockedProvider mocks={[ARTICLE_CATEGORIES_MOCK]} addTypename={false}>
          <ArticleCategories id="MainArticle" />
        </MockedProvider>
      );
    });
  });

  // Loading States
  it('renders the loading state', () => {
    act(() => {
      component = render(
        <MockedProvider mocks={[]}>
          <ArticleCategories id="MainArticle" />
        </MockedProvider>
      );
    });

    const { container } = component;
    expect(container).toMatchSnapshot();
  });

  it('renders the error state', async () => {
    act(() => {
      component = render(
        <MockedProvider mocks={[ARTICLE_CATEGORIES_ERROR]}>
          <ArticleCategories id="MainArticle" />
        </MockedProvider>
      );
    });

    await wait(0); // waits for response

    const { container } = component;
    expect(container).toMatchSnapshot();
  });

  it('receives a null value from the server', async () => {
    act(() => {
      const mocks = ARTICLE_CATEGORIES_MOCK;

      mocks.result.data.node.categories = null;

      render(
        <MockedProvider mocks={[mocks]} addTypename={false}>
          <ArticleCategories id="MainArticle" />
        </MockedProvider>
      );
    });

    await wait(0); // waits for response

    const { container } = component;
    expect(container).toMatchSnapshot();
  });
});

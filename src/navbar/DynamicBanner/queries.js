import gql from 'graphql-tag';

export const GET_BANNER = gql`
  query getDynamicBanner {
    websiteBanner {
      call
      action
    }
  }
`;

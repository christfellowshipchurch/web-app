import React from 'react';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import introspectionQueryResultData from '../fragmentTypes.json';

import {
    authLink,
} from '../auth';

const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData,
});

const cache = new InMemoryCache({ fragmentMatcher });

const httpLink = createHttpLink({
    uri: process.env.REACT_APP_APOLLOS_API,
    opts: {
        credentials: 'same-origin',
        mode: 'no-cors',
    },
});

const client = new ApolloClient({
    link: ApolloLink.from([authLink, httpLink]),
    cache,
});

export default ({ children }) => (
    <ApolloProvider client={client}>
        {children}
    </ApolloProvider>
);

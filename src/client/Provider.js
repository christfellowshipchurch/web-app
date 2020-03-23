import React, { useEffect, useState } from 'react';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';

import introspectionQueryResultData from '../fragmentTypes.json';
import { Loader } from '../ui';

import {
    authLink,
} from '../auth';

export default ({ children }) => {
    const [client, setClient] = useState(undefined);
    useEffect(() => {
        const setUpCache = async () => {
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
            const initData = {};

            persistCache({
                cache,
                storage: window.localStorage,
            }).then(() => {
                client.onResetStore(async () => cache.writeData({ data: initData }));
                setClient(client);
            });
            return () => { };
        };
        setUpCache();
    }, []);

    if (client === undefined) {
        return (
            <div style={{ height: '100vh', width: '100vw' }}>
                <Loader />
            </div>
        );
    }

    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    );
};

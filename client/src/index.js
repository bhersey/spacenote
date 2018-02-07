import * as React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error'
import { toIdValue } from 'apollo-utilities'
import { ApolloProvider } from 'react-apollo'
import App from './App';

import './index.css';
import registerServiceWorker from './registerServiceWorker';

// Apollo client
const link = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            ),
        );

    if (networkError) console.log(`[Network error]: ${networkError}`);
});

const cache = new InMemoryCache({
    dataIdFromObject: o => o.id,
    cacheResolvers: {
        Query: {
            id: (_, args) => toIdValue(cache.config.dataIdFromObject({ __typename: 'Track', id: args.id })),
        }
    }
});

const client = new ApolloClient({
    link: new HttpLink({ uri: 'http://localhost:5000/graphql' }),
    cache,
    error: link
});

const ApolloApp = (
    <ApolloProvider client={client}>
        <App {...this.props} />
    </ApolloProvider>
);

ReactDOM.render(ApolloApp, document.getElementById('root'));
registerServiceWorker();
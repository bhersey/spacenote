import * as React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client-preset'
import { HttpLink, InMemoryCache } from 'apollo-client-preset'
import { ApolloProvider, graphql } from 'react-apollo'
import * as queries from './graphql/queries'
import App from './App';

import './index.css';
import registerServiceWorker from './registerServiceWorker';

// Apollo client
const client = new ApolloClient({
    link: new HttpLink({ uri: 'http://localhost:5000/graphql' }),
    cache: new InMemoryCache().restore({})
});


// client.query({ query: queries.GET_ALL_TRACKS}).then(res => console.log ("YOoo", JSON.stringify(res.data.getAllTracks)));

const ApolloApp = (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);


ReactDOM.render(ApolloApp, document.getElementById('root'));
registerServiceWorker();

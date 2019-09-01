import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { RetryLink } from 'apollo-link-retry';
import { ApolloProvider } from 'react-apollo';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import { App } from './App';
import AppProviders from './context';
import * as serviceWorker from './serviceWorker';

import 'semantic-ui-css/semantic.min.css';

const retryIf = (error) => {
  const doNotRetryCodes = [500, 400];
  return !!error && !doNotRetryCodes.includes(error.statusCode);
};

const retry = new RetryLink({
  delay: {
    initial: 100,
    max: 4000,
    jitter: true,
  },
  attempts: {
    max: 5,
    retryIf,
  },
});

const uri = 'https://graphql-supernovel.herokuapp.com/graphql';
// const uri = 'http://localhost:4000/graphql';

const http = new HttpLink({ uri });

const links = ApolloLink.from([retry, http]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: links,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <ApolloHooksProvider client={client}>
      <AppProviders>
        <App />
      </AppProviders>
    </ApolloHooksProvider>
  </ApolloProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

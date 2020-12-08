import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import MovieList from './MovieList';
import MovieDetailView from './MovieDetailView'
import SignIn from './SignIn';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MenuBar from './NavigationBar';

import Amplify, { Auth } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <main>
      <Switch>
        <ApolloProvider client={client}>
          <div>
          <h1 style={{textAlign: "center"}}>Letterbox Me </h1>
          <MenuBar />
            <Route path="/" component={MovieList} exact />
            <Route path="/movie" component={MovieDetailView} />
            <Route path="/auth" component={SignIn} />
          </div>
        </ApolloProvider>
      </Switch>
    </main>
  );
}

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

// let AuthenticatedApp = withAuthenticator(App);
// ReactDOM.render(<BrowserRouter><AuthenticatedApp /></BrowserRouter>, document.getElementById('root'));

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import MovieList from './MovieList';
import MovieDetailView from './MovieDetailView'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

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
            <Route path="/" component={MovieList} exact />
            <Route path="/movie" component={MovieDetailView} />
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



ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

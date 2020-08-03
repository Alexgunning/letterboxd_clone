import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloClient, ApolloProvider, InMemoryCache, useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

const MOVIES = gql`
      query GetMovies {
        movies {
          id
          title,
          year
        }
      }
`;

  function Movies() {
    const { loading, error, data } = useQuery(MOVIES);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    console.log('alex');
    console.log(data.movies);
  
    // return data.movies.map(({ id: Number, title: String, year: Number }) => (
    return data.movies.map((obj:any) => (
      <div key={obj.id}>
        <p>
          {obj.title}: {obj.year}
        </p>
      </div>
    ));
  }

  function App() {
    return (
      <ApolloProvider client={client}>
        <div>
          <Movies />
        </div>
      </ApolloProvider>
    );
  }


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

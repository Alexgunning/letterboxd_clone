import React from 'react';
import './index.css';
// import App from './App';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

const MOVIES = gql`
      query GetMovies {
        allMovies {
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

    // return data.movies.map(({ id: Number, title: String, year: Number }) => (
    return data.allMovies.map((obj: any) => (
        <div key={obj.id}>
            <p>
                {obj.title}: {obj.year}
            </p>
        </div>
    ));
}

export default Movies;
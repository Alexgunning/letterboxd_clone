import React from 'react';
import './index.css';
// import App from './App';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import { Link } from 'react-router-dom';

const MOVIES = gql`
      query GetMovies {
        allMovies {
          id
          title,
          year,
          url
        }
      }
`;

function Movies() {
    const { loading, error, data } = useQuery(MOVIES);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    // return data.movies.map(({ id: Number, title: String, year: Number }) => (
    return data.allMovies.map((movie: any) => (
        <div key={movie.id}>
            <Link to={`/movie/${movie.url}`}>
                {movie.title}: {movie.year}
            </Link>
        </div>
    ));
}

export default Movies;
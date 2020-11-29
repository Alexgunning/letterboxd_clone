import React from 'react';
import './index.css';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import {
    BrowserRouter as Router,
    useLocation
  } from "react-router-dom";

const MOVIES = gql`
    query movie($urlTitle: String!) {
        movies(where: {url: {equals: $urlTitle}}) {
        id
        title,
        year,
        genre
        }
    }
    `;

function Movie() {
    let location = useLocation();
    let urlTitle = location.pathname.replace('/movie/', '').slice(0, -1);

    const { loading, error, data } = useQuery(MOVIES, { variables: { urlTitle } });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    if (data.movies.length === 0) return <p>'error movie not found'</p>
    let movie = data.movies[0];
    return (
        <p>
            {movie.title}: {movie.year}  {movie.genre}
        </p>
    );
}

export default Movie;
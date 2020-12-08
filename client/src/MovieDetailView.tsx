import React from 'react';
import Movie from './Movie';
import ReviewList from './ReviewList'
import UserReviewInput from './UserReviewInput'

import { useLocation } from "react-router-dom";

import { gql, useQuery } from '@apollo/client';

const MOVIES = gql`
    query movie($urlTitle: String!) {
        movies(where: {url: {equals: $urlTitle}}) {
        id,
        title,
        year,
        genre,
        rating,
        image_url,
        summary
        }
    }
    `;

function MovieDetailView(){


    let location = useLocation();
    let urlTitle = location.pathname.replace('/movie/', '').replace(/\/$/, '');

    const { loading, error, data } = useQuery(MOVIES, { variables: { urlTitle } });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    if (data.movies.length === 0) return <p>'error movie not found'</p>
    let movie = data.movies[0];

    return (<div>
        <div style={{width:"20%", marginLeft:"10%", float:"left"}}>
        <Movie/>
        </div>
            <div style={{float:"left", marginTop: 10, marginLeft:40, width:"40%"}}><UserReviewInput props={{movieId: movie.id}}/> 
            {/* <div style={{float:"left", marginTop: 10, marginLeft:40, width:"40%"}}><UserReviewInput/>  */}
            <h2> Other Reviews</h2>
            <ReviewList />
            </div>
        </div>) 
}

export default MovieDetailView; 
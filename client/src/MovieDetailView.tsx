import React from 'react';
import Movie from './Movie';
import ReviewList from './ReviewList'


function MovieDetailView(){
    return (<div>
        <div style={{width:"30%", marginLeft:"10%"}}>
        <Movie/>
        <ReviewList />
        </div>

        </div>) 
}

export default MovieDetailView;
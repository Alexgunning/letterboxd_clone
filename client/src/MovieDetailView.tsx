import React from 'react';
import Movie from './Movie';
import ReviewList from './ReviewList'
import UserReviewInput from './UserReviewInput'


function MovieDetailView(){
    return (<div>
        <div style={{width:"20%", marginLeft:"10%", float:"left"}}>
        <Movie/>
       
        </div>
            <div style={{float:"left", marginTop: 20, marginLeft:40, width:"40%"}}><UserReviewInput/> 
            <h2> Other Reviews</h2>
            <ReviewList />
            </div>
        </div>) 
}

export default MovieDetailView; 
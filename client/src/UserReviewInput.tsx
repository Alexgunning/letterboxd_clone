import React, { useState } from 'react'
import { Button, Form, TextArea, Rating, Message } from 'semantic-ui-react'
import { useLocation } from "react-router-dom";

import { gql, useMutation } from '@apollo/client';

const ADD_REVIEW = gql`
  mutation createReview($userId: Int!, $movieId: Int!, $text: String!, $rating: Int!) {
    createReview(userId: $userId, movieId: $movieId, text: $text, rating: $rating) {
      id
    }
  }
`;

const UserReviewInput = (movieIdProp: any) => {
    let movieId = movieIdProp.props.movieId;
    const userId = 2;
    
    const [rating, setRating] = useState(0);
    const [textField, setTextField] = useState("");
    const [reviewReady, setReviewReady] = useState(false);
    const [reviewSubmitted, setReviewSubmitted] = useState(false);
    const ButtonDisabled = () => <Button disabled>Submit</Button>
    const ButtonActive = () => <Button primary onClick={handleButtonClick}>Submit</Button>

    const handleRate = (e: any, ratingData: any) => {
        setRating(ratingData.rating);
        setReviewReady(ratingData.rating != 0 && textField != "")
        setReviewSubmitted(false);
    };

    const handleTextUpdate = (e: any, textData: any) => {
        setTextField(textData.value);
        setReviewReady(rating != 0 && textData.value != "")
        setReviewSubmitted(false);
    };

    const [addReview, { data }] = useMutation(ADD_REVIEW);
    
    const handleButtonClick = (e: any, textData: any) => {
        e.preventDefault();
        //addTodo({ variables: { type: input.value } });
        console.log('clicking the button!', rating, textField);
        addReview({variables: {userId: userId, movieId: movieId, rating: rating, text: textField  }});
        setReviewReady(false);
        setReviewSubmitted(true);
     };

    return (
        <div>
            <h2>Rate the Movie!</h2>
            <Form>
                <TextArea placeholder='Your review of the movie!' onInput={handleTextUpdate} style={{ minHeight: 100 }} />
                <div style={{ marginTop: 10 }}>
                    <Rating icon='star' maxRating={5} onRate={handleRate} />
                </div>
                <div style={{ marginTop: 10 }}>
                    {reviewReady ? ButtonActive() : ButtonDisabled()}
                </div>
                <div style={{marginTop:10}}>{reviewSubmitted ? <div><Message icon="check" header="Review Submitted!" /></div> : <div></div>}</div>
            </Form>
        </div>
    )
}

export default UserReviewInput;

import React, { useState } from 'react'
import { Button, Form, TextArea, Rating } from 'semantic-ui-react'
import { useLocation } from "react-router-dom";

import { gql, useQuery } from '@apollo/client';


const UserReviewInput = () => {
    const [rating, setRating] = useState(0);
    const [textField, setTextField] = useState("");
    const [reviewReady, setReviewReady] = useState(false);
    const ButtonDisabled = () => <Button disabled>Submit</Button>
    const ButtonActive = () => <Button primary onClick={handleButtonClick}>Submit</Button>

    const handleRate = (e: any, ratingData: any) => {
        setRating(ratingData.rating);
        setReviewReady(ratingData.rating != 0 && textField != "")
    };

    const handleTextUpdate = (e: any, textData: any) => {
        setTextField(textData.value);
        setReviewReady(rating != 0 && textData.value != "")
    };

    const handleButtonClick = (e: any, textData: any) => {
       console.log('clicking the button!', rating, textField);
    };

    const userId = 1;

    return (
        <div>
            <h2>Rate the Movie!</h2>
            <Form>
                <TextArea placeholder='Your review of the movie!' onInput={handleTextUpdate} style={{ minHeight: 100 }} />
                <div style={{ marginTop: 10 }}>
                    <Rating icon='star' maxRating={5} onInput={handleRate} onRate={handleRate} />
                </div>
                <div style={{ marginTop: 10 }}>
                    {reviewReady ? ButtonActive() : ButtonDisabled()}
                </div>
            </Form>
        </div>
    )
}

export default UserReviewInput;


//21.32
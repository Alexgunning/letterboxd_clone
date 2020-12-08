import React, { useState, useEffect } from 'react'
import { Button, Form, TextArea, Rating, Message } from 'semantic-ui-react'
import { withAuthenticator } from '@aws-amplify/ui-react'
import { useLocation } from "react-router-dom";
import { Auth } from 'aws-amplify';


import { gql, useMutation, useQuery } from '@apollo/client';

const ADD_REVIEW = gql`
  mutation createReview($userId: Int!, $movieId: Int!, $text: String!, $rating: Int!) {
    createReview(userId: $userId, movieId: $movieId, text: $text, rating: $rating) {
      id
    }
  }
`;

// const MOVIES = gql`
//     query movie($urlTitle: String!) {
//         movies(where: {url: {equals: $urlTitle}}) {
//         id,
//         }
//     }
//     `;


const UserReviewInput =  (movieIdProp: any) => {
    let movieId = movieIdProp.props.movieId;
    // let location = useLocation();
    // let urlTitle = location.pathname.replace('/movie/', '').replace(/\/$/, '');
    
    // const { loading, error, data:queryData } = useQuery(MOVIES, { variables: { urlTitle } });
    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error :(</p>;

    // if (queryData.movies.length === 0) return <p>'error movie not found'</p>
    // let movie = queryData.movies[0];
    // let movieId = movie.id;

    const [rating, setRating] = useState(0);
    const [textField, setTextField] = useState("");
    const [reviewReady, setReviewReady] = useState(false);
    const [reviewSubmitted, setReviewSubmitted] = useState(false);
    const [userId, setUserId] = useState("");
    const [userName, setUserName] = useState("");
    const ButtonDisabled = () => <Button disabled>Submit</Button>
    const ButtonActive = () => <Button primary onClick={handleButtonClick}>Submit</Button>

    useEffect(() => {
        const auth3 = Auth.currentUserInfo().then((x: any)=> {
            if (x == null)
                return;
            setUserId(x.attributes.sub);
            setUserName(x.username);
        });
      });

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
        addReview({variables: {userId: userId, movieId: movieId, rating: rating, text: textField  }});
        setReviewReady(false);
        setReviewSubmitted(true);
     };

     const InputCode = () => {
            return (<Form>
                <TextArea placeholder='Your review of the movie!' onInput={handleTextUpdate} style={{ minHeight: 100 }} />
                <div style={{ marginTop: 10 }}>
                    <Rating icon='star' maxRating={5} onRate={handleRate} />
                </div>
                <div style={{ marginTop: 10 }}>
                    {reviewReady ? ButtonActive() : ButtonDisabled()}
                </div>
                <div style={{marginTop:10}}>{reviewSubmitted ? <div><Message icon="check" header="Review Submitted!" /></div> : <div></div>}</div>
            </Form> )

     }

     const SignInMessage = () => {
        return (<Form>
           <Message icon="sign in" header="Sign In to review Movie!" /> 
        </Form> )

 }

    return (
        <div>
            <h2>Rate the Movie!</h2>
            {userId != "" ? InputCode() : SignInMessage()}
        </div>
    )
}

// export default withAuthenticator(UserReviewInput);
export default UserReviewInput;

import React from 'react';
import './index.css';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import { useLocation } from "react-router-dom";
import { Container, Card, Icon } from 'semantic-ui-react'
import { format } from 'path';


function formatRating(value: number): string {
    let valStr = value.toPrecision(3)
    return valStr;
}

const extra = (rating: string) => {
    return (
        <a>
            <Icon name='star' />
            {rating}
        </a>

    )
}


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

function Movie() {
    let location = useLocation();
    let urlTitle = location.pathname.replace('/movie/', '').replace(/\/$/, '');

    const { loading, error, data } = useQuery(MOVIES, { variables: { urlTitle } });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    if (data.movies.length === 0) return <p>'error movie not found'</p>
    let movie = data.movies[0];
    // image='/images/avatar/large/elliot.jpg'
    return (<div>
        <Container style={{ margin: 20 }}>
            <Card
                image={movie.image_url}
                header={movie.title}
                meta={movie.year}
                description={movie.summary}
                extra={extra(movie.rating.toPrecision(2))}
            />
            
        </Container>
    </div>
    );
}

export default Movie;
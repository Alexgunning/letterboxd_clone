import React from 'react';
import './index.css';
import { gql, useQuery } from '@apollo/client';
import { Link, useLocation } from "react-router-dom";
import { Container, Card, CardGroup, Icon, Image } from 'semantic-ui-react'

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
    query movie {
        allMovies {
        id,
        title,
        year,
        genre,
        rating,
        image_url,
        summary,
        url
        }
    }
    `;

function Movie() {
    let location = useLocation();

    const { loading, error, data } = useQuery(MOVIES);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    if (data.allMovies.length === 0) return <p>'error movie not found'</p>
    return (<div>
        
        <Container style={{ margin: 10 }}>
            <CardGroup  >
                {data.allMovies.map((movie: any) => {
                    return (
                        <div style={{margin:10}}>
                        <Container style={{ width: 220  }}>
                            <Link to={`/movie/${movie.url}`}>
                                <Card style={{margin:0}}>
                                    <Image style={{ height: 250}} src={movie.image_url}  fluid={false} centered={true} size='massive'/>
                                    <Card.Content>
                                        <Card.Header>{movie.title}</Card.Header>
                                        <Card.Meta>
                                            {movie.year}
                                        </Card.Meta>
                                    </Card.Content>
                                    <Card.Content extra>
                                     {extra(movie.rating.toPrecision(2))}
                                    </Card.Content>
                                </Card>
                            </Link>
                            </Container>
                        </div>
                    )
                })}
            </CardGroup>
        </Container>
    </div>
    );
}

export default Movie;
import React from 'react'
import { gql, useQuery } from '@apollo/client';
import { Container, Image, Item, Icon } from 'semantic-ui-react'
import { useLocation } from "react-router-dom";

const paragraph = <Image src='/images/wireframe/short-paragraph.png' />

const REVEIWS = gql`
query reviewByMovie($urlTitle: String!) {
  reviews(where: {Movie: { url:{equals: $urlTitle}}}) {
    id,
    User{
      email
      username
    }
    rating,
    text
  }
}
`;

const ItemExampleMetadata = () => {
  let location = useLocation();
  let urlTitle = location.pathname.replace('/movie/', '').replace(/\/$/, '');

  const { loading, error, data } = useQuery(REVEIWS, { variables: { urlTitle } });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    if (data.reviews.length === 0) return <p>No reviews yet!</p>
    console.log(data.reviews)
    let review = data.reviews[0];

  return (
    <Container style={{ margin: 10 }}>
  <Item.Group>
    {data.reviews.map((review: any) => {
      return (
        <Item>
          <Item.Image size='tiny' src='https://www.dc.edu/wp-content/uploads/2014/03/person-icon.png' />
          <Item.Content>
            <Item.Header>{review.User.username}</Item.Header>
            <Item.Meta>
              <a>
                <Icon name='star' />
                {review.rating}
              </a>

            </Item.Meta>
            <Item.Description>{review.text}</Item.Description>
          </Item.Content>
        </Item>)
    })}
      </Item.Group>
    </Container>
  )
}

export default ItemExampleMetadata


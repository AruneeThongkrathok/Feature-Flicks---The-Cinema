import React from 'react';
import { Card } from 'react-bootstrap';

export const Movie = (props) => {
  let { title, description, date} = props;
  let { posterImage, length, categories} = description;

  posterImage = 'https://cinema-rest.nodehill.se/' + posterImage;

  return (
    <Card style={{ width: '20rem', background: 'white', color: 'black' }}>
      <Card.Img variant="top" src={posterImage} style={{ height: '200px' }} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>Length: {length} minutes</Card.Text>
        <Card.Text>Categories: {categories.join(', ')}</Card.Text>
        <Card.Text>Date: {date}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Movie;
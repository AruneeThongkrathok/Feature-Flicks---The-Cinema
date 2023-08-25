import React from "react";
import { Card } from "react-bootstrap";
import "../css/Movie.css";
import { Link } from "react-router-dom";

export const Movie = (props) => {
  const { title, description, selectedCategory } = props;
  const { posterImage, length, categories } = description;
  const posterImageURL = "https://cinema-rest.nodehill.se/" + posterImage;

  return (
    <Link to="/BookMovie">
      <Card className="movie-card">
        <div className="card-content">
          <div className="poster-container">
            <Card.Img
              className="movie-poster"
              variant="top"
              src={posterImageURL}
            />
          </div>
          <div className="movie-details">
            <Card.Body>
              <Card.Title className="movie-title">{title}</Card.Title>
              <Card.Text className="movie-info">
                Length: {length} minutes
              </Card.Text>
              <Card.Text className="movie-info">
                Categories:{" "}
                {selectedCategory === "All"
                  ? categories.join(", ")
                  : selectedCategory}
              </Card.Text>
            </Card.Body>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default Movie;

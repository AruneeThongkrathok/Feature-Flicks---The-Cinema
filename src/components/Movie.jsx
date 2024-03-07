import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../css/Movie.css";

const Movie = (props) => {
  console.log("Movie props:", props);
  const { id, title, description, selectedCategory } = props;
  const { posterImage, length, categories } = description;
  const posterImageURL = "https://cinema-rest.nodehill.se/" + posterImage;

  return (
    <Link
      to={{
        pathname: `/BookMovie/${id}`,
        state: { movieDetails: props },
      }}
    >
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
                Categories:{" "}
                {categories.map((category, index) => (
                  <span
                    key={index}
                    className={`movie-category ${
                      selectedCategory === category ? "selected" : ""
                    }`}
                  >
                    {category}
                  </span>
                ))}
              </Card.Text>
            </Card.Body>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default Movie;

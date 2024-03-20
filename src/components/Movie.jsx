import React from "react";
import { Card, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../css/Movie.css";

const Movie = (props) => {
  const { id, title, description, selectedCategory } = props;
  const { posterImage, length, categories } = description;
  const posterImageURL = "https://cinema-rest.nodehill.se/" + posterImage;

  const navigate = useNavigate();

  const logPropsOnClick = () => {
    console.log("Clicked Movie props:", props);
    navigate(`/Bookmovie/${id}`, { state: { movieDetails: props } });
  };

  return (
    <div className="movie-container">
      <Card className="movie-card-content" onClick={logPropsOnClick}>
        <Card.Img className="movie-img" src={posterImageURL} />
        <Card.Title className="movie-title">{title}</Card.Title>
        <Card.Text className="movie-info-text">
          {" "}
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
      </Card>
    </div>
  );
};

export default Movie;

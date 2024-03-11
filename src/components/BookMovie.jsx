import React from "react";
import { useLocation, useParams } from "react-router-dom";

const Bookmovie = () => {
  const { movieId } = useParams();
  const location = useLocation();

  // Accessing movie details from location state
  const { movieDetails } = location.state || {};
  const { id, title, description, selectedCategory } = movieDetails || {};
  const { categories, posterImage } = description || {};

  if (!id || !title || !description || !selectedCategory) {
    return <div>No movie details available</div>;
  }

  return (
    <div>
      <h1>Movie ID: {id}</h1>
      <p>Title: {title}</p>
      <p>Category: {categories}</p>
      <img
        src={`https://cinema-rest.nodehill.se/${posterImage}`}
        alt={title}
        style={{ maxWidth: "100%" }}
      />
    </div>
  );
};

export default Bookmovie;

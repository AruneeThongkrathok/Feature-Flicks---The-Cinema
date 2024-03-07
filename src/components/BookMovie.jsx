import React from "react";
import { useParams } from "react-router-dom";

const Bookmovie = () => {
  const { movieId } = useParams();

  return (
    <div>
      <h1>Movie ID: {movieId}</h1>
    </div>
  );
};

export default Bookmovie;

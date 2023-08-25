import React from "react";
import { Movie } from "./Movie";

const CategoryFilter = ({ movies, selectedCategory }) => {
  const filteredMovies =
    selectedCategory === "All"
      ? movies
      : movies.filter((movie) =>
          movie.description.categories.includes(selectedCategory)
        );

  return (
    <div>
      {filteredMovies.map((movie, index) => (
        <Movie
          key={index}
          title={movie.title}
          description={movie.description}
          selectedCategory={selectedCategory}
        />
      ))}
    </div>
  );
};

export default CategoryFilter;

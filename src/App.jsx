import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";

import Movie from "./components/Movie";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    (async () => {
      const moviesData = await (await fetch("/api/movies")).json();

      if (selectedCategory === "All") {
        setMovies(moviesData);
      } else {
        const filteredMovies = moviesData.filter((movie) =>
          movie.description.categories.includes(selectedCategory)
        );
        setMovies(filteredMovies);
      }
    })();
  }, [selectedCategory]);

  return (
    <div className="App">
      <Navbar movies={movies} onSelectCategory={setSelectedCategory} />
      {movies.map(({ id, title, description }) => (
        <Movie
          key={id}
          title={title}
          description={description}
          selectedCategory={selectedCategory}
        />
      ))}
    </div>
  );
}

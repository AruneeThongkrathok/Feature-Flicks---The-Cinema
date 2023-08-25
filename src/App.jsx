import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    (async () => {
      const moviesData = await (await fetch("/api/movies")).json();
      let filteredMovies = moviesData;

      if (selectedCategory !== "All") {
        filteredMovies = moviesData.filter((movie) =>
          movie.description.categories.includes(selectedCategory)
        );
      }
      setMovies(filteredMovies);
    })();
  }, [selectedCategory]);

  return (
    <div className="App">
      <Navbar movies={movies} onSelectCategory={setSelectedCategory} />
    </div>
  );
}

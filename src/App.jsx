import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSorting, setSelectedSorting] = useState("default");

  useEffect(() => {
    (async () => {
      const moviesData = await (await fetch("/api/movies")).json();
      let filteredMovies = moviesData;

      if (selectedCategory !== "All") {
        filteredMovies = moviesData.filter((movie) =>
          movie.description.categories.includes(selectedCategory)
        );
      }

      let sortedMovies = [...filteredMovies];
      if (selectedSorting === "az") {
        sortedMovies.sort((a, b) => a.title.localeCompare(b.title));
      } else if (selectedSorting === "za") {
        sortedMovies.sort((a, b) => b.title.localeCompare(a.title));
      }

      setMovies(sortedMovies);
    })();
  }, [selectedCategory, selectedSorting]);

  return (
    <div className="App">
      <Navbar
        movies={movies}
        onSelectCategory={setSelectedCategory}
        onSortChange={setSelectedSorting}
        selectedSorting={selectedSorting}
      />
    </div>
  );
}

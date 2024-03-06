import { useState, useEffect } from "react";
import MyNavbar from "./components/MyNavbar";
import Movie from "./components/Movie";

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

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    console.log("In App Clicked category:", category);
  };

  return (
    <div className="App">
      <MyNavbar
        movies={movies}
        onSelectCategory={handleCategoryChange}
        onSortChange={setSelectedSorting}
        selectedSorting={selectedSorting}
      />
      <div className="movie-list">
        {movies.map((movie) => (
          <Movie
            key={movie.id}
            id={movie.id}
            title={movie.title}
            description={movie.description}
            selectedCategory={selectedCategory}
          />
        ))}
      </div>
    </div>
  );
}

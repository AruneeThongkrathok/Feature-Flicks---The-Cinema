import { useState, useEffect } from "react";
import MyNavbar from "./components/MyNavbar";
import Movie from "./components/Movie";
import Footer from "./components/Footer";

export default function App() {
  const [allMovies, setAllMovies] = useState([]);
  const [displayedMovies, setDisplayedMovies] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSorting, setSelectedSorting] = useState("default");

  useEffect(() => {
    (async () => {
      const moviesData = await (await fetch("/api/movies")).json();
      setAllMovies(moviesData);
      updateDisplayedMovies(moviesData, selectedCategory, selectedSorting);
    })();
  }, [selectedCategory, selectedSorting]);

  const updateDisplayedMovies = (moviesData, category, sorting) => {
    let filteredMovies = moviesData;
    if (category !== "All") {
      filteredMovies = moviesData.filter((movie) =>
        movie.description.categories.includes(category)
      );
    }

    let sortedMoviesCopy = [...filteredMovies];
    if (sorting === "az") {
      sortedMoviesCopy.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sorting === "za") {
      sortedMoviesCopy.sort((a, b) => b.title.localeCompare(a.title));
    }

    setDisplayedMovies(sortedMoviesCopy);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    updateDisplayedMovies(allMovies, category, selectedSorting);
    console.log("In App Clicked category:", category);
  };

  return (
    <div className="App">
      <MyNavbar
        movies={allMovies}
        categories={Array.from(
          new Set(allMovies.flatMap((movie) => movie.description.categories))
        )}
        onSelectCategory={handleCategoryChange}
        onSortChange={setSelectedSorting}
        selectedSorting={selectedSorting}
      />
      <div className="movie-list">
        {displayedMovies.map((movie) => (
          <Movie
            key={movie.id}
            id={movie.id}
            title={movie.title}
            description={movie.description}
            selectedCategory={selectedCategory}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}

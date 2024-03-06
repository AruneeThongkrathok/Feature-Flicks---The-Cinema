import React, { useState } from "react";
import "../css/Navbar.css";
import SortingMovies from "./SortingMovies";
import CategoryFilter from "./CategoryFilter";

const Navbar = ({
  movies,
  onSortChange,
  onSelectCategory,
  selectedSorting,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCategorySelect = (category) => {
    console.log("Selected category:", category);
    onSelectCategory(category);
    setIsDropdownOpen(false);
  };

  return (
    <nav className="navbar">
      <h1>Future Flicks Cinema</h1>
      <div className="nav-dropdown-container">
        <div
          className={`nav-link ${isDropdownOpen ? "active" : ""}`}
          onClick={handleDropdownToggle}
        >
          Categories
          <div className="dropdown-arrow"></div>
        </div>
        {isDropdownOpen && (
          <div className="nav-dropdown">
            {movies &&
              movies.length > 0 &&
              CategoryFilter({
                movies,
                onSelectCategory: handleCategorySelect,
              })}
          </div>
        )}
      </div>
      <SortingMovies
        movies={movies}
        selectedSorting={selectedSorting}
        onSortChange={onSortChange}
      />
    </nav>
  );
};

export default Navbar;

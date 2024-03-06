import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import "../css/Navbar.css";
import SortingMovies from "./SortingMovies";
import CategoryFilter from "./CategoryFilter";

const MyNavbar = ({
  movies,
  onSortChange,
  onSelectCategory,
  selectedCategory,
  selectedSorting,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCategoryClick = (category) => {
    onSelectCategory(category);
    setIsDropdownOpen(false);
  };

  return (
    <nav className="navbar">
      <h1>Future Flicks Cinema</h1>
      <Dropdown
        show={isDropdownOpen}
        onToggle={handleDropdownToggle}
        className="nav-dropdown-container"
      >
        <Dropdown.Toggle
          className="category-button"
          variant="light"
          id="dropdown-basic"
        >
          Categories
        </Dropdown.Toggle>
        <Dropdown.Menu className="nav-dropdown">
          {movies && movies.length > 0 && (
            <CategoryFilter
              className="category"
              movies={movies}
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategoryClick}
            />
          )}
        </Dropdown.Menu>
      </Dropdown>
      <SortingMovies
        movies={movies}
        selectedSorting={selectedSorting}
        onSortChange={onSortChange}
      />
    </nav>
  );
};

export default MyNavbar;

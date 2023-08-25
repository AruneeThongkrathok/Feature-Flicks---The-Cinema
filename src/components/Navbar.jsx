import React, { useState } from "react";
import { NavDropdown } from "react-bootstrap";
import "../css/Navbar.css";
import CategoryFilter from "./CategoryFilter";

const Navbar = ({ movies }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(movies.flatMap((movie) => movie.description.categories)),
  ];

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCategorySelect = (category) => {
    console.log("Selected category:", category);
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };

  const sortedCategories = categories.slice().sort();

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
            {sortedCategories.map((category, index) => (
              <div
                key={index}
                className="nav-dropdown-item"
                onClick={() => handleCategorySelect(category)}
              >
                {category}
              </div>
            ))}
          </div>
        )}
      </div>
      <CategoryFilter movies={movies} selectedCategory={selectedCategory} />
    </nav>
  );
};

export default Navbar;

import React, { useState } from "react";
import { NavDropdown } from "react-bootstrap";
import "../css/Navbar.css";
import CategoryFilter from "./CategoryFilter";

const Navbar = ({ movies, onSelectCategory }) => {
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

  return (
    <nav className="navbar">
      <h1>Future Flicks Cinema</h1>
      <NavDropdown
        title="Categories"
        id="categories-dropdown"
        show={isDropdownOpen}
        onToggle={handleDropdownToggle}
      >
        {categories.map((category, index) => (
          <NavDropdown.Item
            key={index}
            onClick={() => handleCategorySelect(category)}
          >
            {category}
          </NavDropdown.Item>
        ))}
      </NavDropdown>
      <CategoryFilter movies={movies} selectedCategory={selectedCategory} />
    </nav>
  );
};

export default Navbar;

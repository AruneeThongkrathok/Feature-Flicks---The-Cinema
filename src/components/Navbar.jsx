import React, { useState } from "react";
import { NavDropdown } from "react-bootstrap";
import "../css/Navbar.css";

const Navbar = ({ movies }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = [
    "All",
    ...new Set(movies.flatMap((movie) => movie.description.categories)),
  ];
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="navbar">
      <h1>Future Flicks Cinema</h1>
      <div className={`dropdown ${dropdownOpen ? "open" : ""}`}>
        <button
          className="dropdown-toggle"
          type="button"
          onClick={toggleDropdown}
        >
          Categories
        </button>
        <ul className="dropdown-menu">
          {categories.map((category) => (
            <li
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={selectedCategory === category ? "active" : ""}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

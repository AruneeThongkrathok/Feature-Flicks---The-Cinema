import React, { useState } from "react";
import { NavDropdown } from "react-bootstrap";
import "../css/Navbar.css";

const Navbar = ({ movies }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const categories = [
    "All",
    ...new Set(movies.flatMap((movie) => movie.description.categories)),
  ];

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCategorySelect = (category) => {
    // Handle category selection here
    console.log("Selected category:", category);
    setIsDropdownOpen(false); // Close the dropdown
    // You can add more logic to filter movies based on the selected category
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
    </nav>
  );
};

export default Navbar;

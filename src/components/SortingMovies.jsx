import React from "react";
import "../css/SortingMovies.css";

const SortingMovies = ({ selectedSorting, onSortChange }) => {
  const handleSortChange = (event) => {
    onSortChange(event.target.value);
  };

  return (
    <div className="sorting-container">
      <label htmlFor="sorting">Sort by:</label>
      <select id="sorting" value={selectedSorting} onChange={handleSortChange}>
        <option value="default">Default</option>
        <option value="az">A-Z</option>
        <option value="za">Z-A</option>
      </select>
    </div>
  );
};

export default SortingMovies;

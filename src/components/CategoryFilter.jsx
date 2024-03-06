import React from "react";

const CategoryFilter = ({ movies, selectedCategory, onSelectCategory }) => {
  const allCategories = [
    "All",
    ...new Set(movies.flatMap((movie) => movie.description.categories)),
  ];

  return (
    <div className="category-list">
      {allCategories.map((category, index) => (
        <div
          key={index}
          className={`category ${
            selectedCategory === category ? "selected" : ""
          }`}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </div>
      ))}
    </div>
  );
};

export default CategoryFilter;

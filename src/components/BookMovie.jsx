import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

const Bookmovie = () => {
  const { movieId } = useParams();
  const location = useLocation();

  const { movieDetails } = location.state || {};
  const { id, title, description, selectedCategory } = movieDetails || {};
  const { categories, posterImage } = description || {};
  const [ticketTypes, setTicketTypes] = useState([]);
  const [screenings, setScreenings] = useState([]);

  if (!id || !title || !description || !selectedCategory) {
    return <div>No movie details available</div>;
  }

  useEffect(() => {
    const fetchTicketTypes = async () => {
      try {
        const response = await fetch("/api/ticketTypes");
        const ticketTypesData = await response.json();
        setTicketTypes(ticketTypesData);
      } catch (error) {
        console.error("Error fetching ticket types:", error);
      }
    };

    const fetchScreenings = async () => {
      try {
        const response = await fetch("/api/screenings");
        const screeningsData = await response.json();
        const movieScreenings = screeningsData.filter(
          (screening) => screening.movieId === parseInt(movieId, 10)
        );
        setScreenings(movieScreenings);
      } catch (error) {
        console.error("Error fetching screenings:", error);
      }
    };

    fetchTicketTypes();
    fetchScreenings();
  }, [movieId]);

  return (
    <div>
      <h1>Movie ID: {id}</h1>
      <p>Title: {title}</p>
      <p>Category: {categories}</p>
      <img
        src={`https://cinema-rest.nodehill.se/${posterImage}`}
        alt={title}
        style={{ maxWidth: "100%" }}
      />

      <h2>Ticket Types:</h2>
      <ul>
        {ticketTypes.map((type) => (
          <li key={type.id}>
            {type.name} - {type.price}Kr
          </li>
        ))}
      </ul>
      <h2>Screenings:</h2>
      <ul>
        {screenings.map((screening) => (
          <li key={screening.id}>
            {new Date(screening.time).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Bookmovie;

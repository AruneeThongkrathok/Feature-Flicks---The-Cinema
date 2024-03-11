import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Card, Button, Row, Col } from "react-bootstrap";

const Bookmovie = () => {
  const { movieId } = useParams();
  const location = useLocation();

  const { movieDetails } = location.state || {};
  const { id, title, description, selectedCategory } = movieDetails || {};
  const { categories, posterImage } = description || {};
  const [screenings, setScreenings] = useState([]);
  const [auditoriums, setAuditoriums] = useState([]);

  if (!id || !title || !description || !selectedCategory) {
    return <div>No movie details available</div>;
  }

  useEffect(() => {
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

    const fetchAuditoriums = async () => {
      try {
        const response = await fetch("/api/auditoriums");
        const auditoriumsData = await response.json();
        setAuditoriums(auditoriumsData);
      } catch (error) {
        console.error("Error fetching auditoriums:", error);
      }
    };

    fetchScreenings();
    fetchAuditoriums();
  }, [movieId]);

  const getAuditoriumName = (auditoriumId) => {
    const auditorium = auditoriums.find((aud) => aud.id === auditoriumId);
    return auditorium ? auditorium.name : "Unknown Auditorium";
  };

  const handleChooseSeats = (screeningId) => {
    console.log("Choose seats for screening:", screeningId);
  };

  const formatDateTime = (dateTime) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateTime)
      .toLocaleString(undefined, options)
      .replace(",", "");
  };

  return (
    <div>
      <Card>
        <Row>
          <Col md={6}>
            <Card>
              <Card.Img
                variant="top"
                src={`https://cinema-rest.nodehill.se/${posterImage}`}
              />
              <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>Category: {categories}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <h2>Screenings:</h2>
            <ul>
              {screenings.map((screening) => (
                <li key={screening.id}>
                  <p>
                    {formatDateTime(screening.time)} -{" "}
                    {getAuditoriumName(screening.auditoriumId)}
                  </p>
                  <Button
                    variant="primary"
                    onClick={() => handleChooseSeats(screening.id)}
                  >
                    Choose Seats
                  </Button>
                </li>
              ))}
            </ul>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Bookmovie;

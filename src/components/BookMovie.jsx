import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Card, Button, Row, Col } from "react-bootstrap";
import "../css/BookMovie.css";

const Bookmovie = () => {
  const { movieId } = useParams();
  const location = useLocation();

  const { movieDetails } = location.state || {};
  const { id, title, description, selectedCategory } = movieDetails || {};
  const { categories, posterImage } = description || {};
  const [screenings, setScreenings] = useState([]);
  const [auditoriums, setAuditoriums] = useState([]);
  const [selectedScreening, setSelectedScreening] = useState(null);

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

  const handleChooseSeats = (screening) => {
    console.log("Choose seats for screening:", screening);
    setSelectedScreening(screening);
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
    <div className="d-flex justify-content-center align-items-center">
      <Card className="Movie-screening-card">
        <Row>
          <Col md={6}>
            <Card className="Movie-info-card">
              <Card.Img
                variant="top"
                src={`https://cinema-rest.nodehill.se/${posterImage}`}
              />
              <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{categories}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col className="screening-col" md={6}>
            <h2>Screenings:</h2>
            <ul>
              {screenings.map((screening) => (
                <li key={screening.id} className="d-flex">
                  <div>
                    <p>
                      {formatDateTime(screening.time)} -{" "}
                      {getAuditoriumName(screening.auditoriumId)}
                    </p>
                  </div>
                  <div>
                    <Button
                      className="book-button"
                      variant="primary"
                      onClick={() => handleChooseSeats(screening)}
                    >
                      Choose Seats
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </Col>
        </Row>
        {selectedScreening && (
          <div>
            <h3>Selected Screening Information:</h3>
            <p>
              Time: {formatDateTime(selectedScreening.time)}
              <br />
              Auditorium: {getAuditoriumName(selectedScreening.auditoriumId)}
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Bookmovie;

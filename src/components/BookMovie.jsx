import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Card, Button, Row, Col } from "react-bootstrap";
import "../css/BookMovie.css";
import Footer from "./Footer";
import Header from "./Header";

const Bookmovie = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { movieDetails } = location.state || {};
  const { id, title, description, selectedCategory } = movieDetails || {};
  const { categories, length, posterImage } = description || {};
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
    const auditorium = getAuditoriumName(screening.auditoriumId);
    const screeningTime = formatDateTime(screening.time);
    navigate(`/chooseSeats/${screening.id}`, {
      state: {
        screening,
        auditorium,
        movieImage: posterImage,
        movieTitle: title,
        screeningTime: screeningTime,
      },
    });
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
      <Header />
      <div className="d-flex justify-content-center align-items-center">
        <Card className="Movie-screening-card">
          <Row>
            <Col>
              <Card className="Movie-info-card">
                <Card.Img
                  variant="top"
                  src={`https://cinema-rest.nodehill.se/${posterImage}`}
                />
                <Card.Body>
                  <Card.Title>{title}</Card.Title>
                  <Card.Text>
                    {Array.isArray(categories)
                      ? categories.map((category, index) => (
                          <span key={index}>{category.trim()}</span>
                        ))
                      : typeof categories === "string"
                      ? categories
                          .split(",")
                          .map((category, index) => (
                            <span key={index}>{category.trim()}</span>
                          ))
                      : null}
                  </Card.Text>
                  <Card.Text>Duration: {length} minutes</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col className="screening-col" md={6}>
              <h2>Screenings:</h2>
              {screenings.map((screening) => (
                <Card key={screening.id} className="mb-2">
                  <Card.Body>
                    <Row className="d-flex align-items-center">
                      <Col md={8}>
                        <p>
                          {formatDateTime(screening.time).split(" ")[0]} <br />
                          {formatDateTime(screening.time).split(" ")[1]} <br />
                          {getAuditoriumName(screening.auditoriumId)}
                        </p>
                      </Col>
                      <Col md={4} className="text-md-right">
                        <Button
                          className="book-button"
                          variant="primary"
                          onClick={() => handleChooseSeats(screening)}
                        >
                          Book
                        </Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ))}
            </Col>
          </Row>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default Bookmovie;

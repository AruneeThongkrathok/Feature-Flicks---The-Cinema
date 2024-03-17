import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../css/ChooseSeats.css";
import { Card, Row } from "react-bootstrap";

export default function ChooseSeat({ screeningId }) {
  const [seats, setSeats] = useState([]);
  const location = useLocation();
  const { screening, auditorium } = location.state || {};
  const [occupiedSeats, setOccupiedSeats] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/seats`);
        const seatData = await response.json();

        const filteredSeats = seatData.filter(
          (seat) => seat.auditoriumId === screening.auditoriumId
        );

        const occupiedResponse = await fetch(`/api/occupied_seats`);
        const occupiedData = await occupiedResponse.json();
        const occupiedSeatsForScreening = occupiedData.find(
          (occupied) => occupied.screeningId === screening.id
        );

        setSeats(filteredSeats);
        setOccupiedSeats(
          occupiedSeatsForScreening
            ? occupiedSeatsForScreening.occupiedSeats.split(", ")
            : []
        );
      } catch (error) {
        console.error("Error fetching seat data:", error);
      }
    };

    fetchData();
  }, [screening]);

  const seatsByRow = seats.reduce((acc, seat) => {
    if (!acc[seat.rowNumber]) {
      acc[seat.rowNumber] = [];
    }
    acc[seat.rowNumber].push(seat);
    return acc;
  }, {});

  const handleSeatClick = (seat) => {
    if (!seat.occupied) {
      console.log(`Seat ${seat.seatNumber} selected!`);
    } else {
      console.log(`Seat ${seat.seatNumber} is already occupied.`);
    }
  };

  return (
    <Card className="seats-container">
      <Card.Title>{auditorium}</Card.Title>
      <Card className="auditorium-seats">
        {Object.keys(seatsByRow).map((rowNumber) => (
          <Row key={rowNumber} className="seat-row">
            {seatsByRow[rowNumber].map((seat) => (
              <div
                key={seat.id}
                className={`seat ${
                  seat.occupied ||
                  occupiedSeats.includes(seat.seatNumber.toString())
                    ? "occupied"
                    : ""
                }`}
                onClick={() => handleSeatClick(seat)}
              >
                {seat.occupied ||
                occupiedSeats.includes(seat.seatNumber.toString())
                  ? "X"
                  : seat.seatNumber}
              </div>
            ))}
          </Row>
        ))}
      </Card>
    </Card>
  );
}

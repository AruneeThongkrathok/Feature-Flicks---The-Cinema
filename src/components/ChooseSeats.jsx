import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../css/ChooseSeats.css";

export default function ChooseSeat({ screeningId }) {
  const [seats, setSeats] = useState([]);
  const location = useLocation();
  const { screening, auditorium } = location.state || {};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/seats`);
        const seatData = await response.json();

        const filteredSeats = seatData.filter(
          (seat) => seat.auditoriumId === screening.auditoriumId
        );

        setSeats(filteredSeats);
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
    <div className="seats-container">
      <div className="auditorium-seats">
        <h2>{auditorium}</h2>
        {Object.keys(seatsByRow).map((rowNumber) => (
          <div key={rowNumber} className="seat-row">
            {seatsByRow[rowNumber].map((seat) => (
              <div
                key={seat.id}
                className={`seat ${seat.occupied ? "occupied" : ""}`}
                onClick={() => handleSeatClick(seat)}
              >
                {seat.seatNumber}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

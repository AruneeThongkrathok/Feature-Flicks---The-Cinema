import React, { useEffect, useState } from "react";
import "../css/ChooseSeats.css";

export default function ChooseSeat({ screeningId }) {
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch seat data from the API
        const response = await fetch(`/api/seats`);
        const seatData = await response.json();

        // Set the seats state variable
        setSeats(seatData);
      } catch (error) {
        console.error("Error fetching seat data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs once when the component mounts

  const seatsByAuditoriumAndRow = seats.reduce((acc, seat) => {
    const auditoriumId = seat.auditoriumId;
    const rowNumber = seat.rowNumber;

    if (!acc[auditoriumId]) {
      acc[auditoriumId] = {};
    }

    if (!acc[auditoriumId][rowNumber]) {
      acc[auditoriumId][rowNumber] = [];
    }

    acc[auditoriumId][rowNumber].push(seat);
    return acc;
  }, {});

  // Handle seat click logic
  const handleSeatClick = (seat) => {
    if (!seat.occupied) {
      // Add logic to handle seat selection
      console.log(`Seat ${seat.seatNumber} selected!`);
    } else {
      console.log(`Seat ${seat.seatNumber} is already occupied.`);
    }
  };

  // Render the seats
  return (
    <div className="seats-container">
      {Object.keys(seatsByAuditoriumAndRow).map((auditoriumId) => (
        <div key={auditoriumId} className="auditorium-seats">
          <h2>Auditorium {auditoriumId}</h2>
          {Object.keys(seatsByAuditoriumAndRow[auditoriumId]).map(
            (rowNumber) => (
              <div key={rowNumber} className="seat-row">
                {seatsByAuditoriumAndRow[auditoriumId][rowNumber].map(
                  (seat, index) => (
                    <div
                      key={seat.id}
                      className={`seat ${seat.occupied ? "occupied" : ""}`}
                      style={{
                        left: `${index * 40 + (rowNumber - 1) * 20}px`,
                        zIndex:
                          seatsByAuditoriumAndRow[auditoriumId][rowNumber]
                            .length - index,
                      }}
                      onClick={() => handleSeatClick(seat)}
                    >
                      {seat.seatNumber}
                    </div>
                  )
                )}
              </div>
            )
          )}
        </div>
      ))}
    </div>
  );
}

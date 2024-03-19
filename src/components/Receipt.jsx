import React from "react";
import { useLocation } from "react-router-dom";
import { Card } from "react-bootstrap";

function Receipt() {
  const location = useLocation();
  const { movieTitle, screeningTime, selectedSeats, totalPrice } =
    location.state || {};

  return (
    <Card>
      <Card.Body>
        <Card.Title>Booking Receipt</Card.Title>
        <div>
          {" "}
          {movieTitle && <div>Movie Title: {movieTitle}</div>}
          {screeningTime && <div>Screening Time: {screeningTime}</div>}
          {selectedSeats && (
            <div>
              Selected Seats:{" "}
              {selectedSeats
                .map(
                  (seat) => `Row: ${seat.rowNumber} Seat: ${seat.seatNumber}`
                )
                .join(", ")}
            </div>
          )}
          <div>Total Price: {totalPrice}Kr</div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Receipt;

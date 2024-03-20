import React from "react";
import { useLocation } from "react-router-dom";
import { Card } from "react-bootstrap";
import "../css/Receipt.css";
import generateBookingNumber from "./GenerateBookingNumber";
import Footer from "./Footer";
import Header from "./Header";

function Receipt() {
  const location = useLocation();
  const { movieTitle, screeningTime, selectedSeats, totalPrice } =
    location.state || {};

  const bookingNumber = generateBookingNumber();

  return (
    <div>
      <Header />
      <div className="receipt-container">
        <Card className="receipt-card">
          <Card.Body className="receipt-card-body">
            <Card.Title className="receipt-title">
              Thank you for booking with us!
            </Card.Title>
            <Card.Text className="receipt-booking-details">
              Booking Details:
            </Card.Text>
            <div className="receipt-info">
              {movieTitle && (
                <Card.Text>
                  <strong>Movie Title:</strong> {movieTitle}
                </Card.Text>
              )}
              {screeningTime && (
                <Card.Text>
                  <strong>Screening Time:</strong> {screeningTime}
                </Card.Text>
              )}
              {selectedSeats && (
                <Card.Text>
                  <strong>Selected Seats:</strong>{" "}
                  {selectedSeats
                    .map(
                      (seat) =>
                        `Row: ${seat.rowNumber} Seat: ${seat.seatNumber}`
                    )
                    .join(", ")}
                </Card.Text>
              )}
              <Card.Text className="receipt-total-price">
                <strong>Total Price:</strong> {totalPrice}Kr
              </Card.Text>
              <Card.Text className="receipt-booking-number">
                {" "}
                <strong>Booking Number:</strong> {bookingNumber}
              </Card.Text>
              <Card.Text className="receipt-payment-info">
                Note: Please save your booking number. Payment required at
                cinema counter before entry to auditorium.
              </Card.Text>
              <Card.Text className="receipt-greeting-text">
                We hope to see you again soon!
              </Card.Text>
              <Card.Text className="receipt-greeting-text">
                Future Flicks Cinema
              </Card.Text>
            </div>
          </Card.Body>
        </Card>
      </div>
      <Footer />
    </div>
  );
}

export default Receipt;

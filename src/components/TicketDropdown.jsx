import React, { useState, useEffect } from "react";
import { Dropdown, DropdownButton, Row, Col } from "react-bootstrap";
import "../css/TicketDropdown.css";

function TicketDropdown({ handleTicketSelection }) {
  const [ticketCounts, setTicketCounts] = useState({
    child: 0,
    senior: 0,
    adult: 0,
  });
  const [ticketPrices, setTicketPrices] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [ticketTypes, setTicketTypes] = useState([]);

  useEffect(() => {
    const fetchTicketPrices = async () => {
      try {
        const response = await fetch("/api/ticketTypes");
        const ticketTypesData = await response.json();
        const prices = {};
        ticketTypesData.forEach((ticketType) => {
          prices[ticketType.name.toLowerCase()] = ticketType.price;
        });
        setTicketPrices(prices);
        setTicketTypes(ticketTypesData);
      } catch (error) {
        console.error("Error fetching ticket prices:", error);
      }
    };

    fetchTicketPrices();
  }, []);

  const handleSelect = (type, count) => {
    setTicketCounts((prevTicketCounts) => ({
      ...prevTicketCounts,
      [type.name.toLowerCase()]: count,
    }));
  };

  useEffect(() => {
    const totalPrice = Object.keys(ticketCounts).reduce(
      (acc, ticketType) =>
        acc + ticketCounts[ticketType] * ticketPrices[ticketType],
      0
    );
    setTotalPrice(totalPrice);
    handleTicketSelection(ticketCounts, totalPrice);
  }, [ticketCounts, ticketPrices]);

  return (
    <Col className="ticket-dropdown-col">
      <Row className="ticket-dropdow-row">
        {ticketTypes.map((type) => {
          const selectedCount = ticketCounts[type.name.toLowerCase()] || 0;
          return (
            <DropdownButton
              variant="secondary"
              className="ticket-dropdown-button"
              key={type.id}
              id={`${type.name.toLowerCase()}-dropdown`}
              title={`${type.name} (${selectedCount}) - ${type.price}Kr`}
            >
              {[...Array(11).keys()].map((count) => (
                <Dropdown.Item
                  key={count}
                  onClick={() => handleSelect(type, count)}
                >
                  {count}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          );
        })}
      </Row>
      <span className="total-price">Total Price: {totalPrice}Kr</span>
    </Col>
  );
}

export default TicketDropdown;

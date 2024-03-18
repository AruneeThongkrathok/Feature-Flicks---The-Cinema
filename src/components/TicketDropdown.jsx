import React, { useState, useEffect } from "react";
import { Dropdown, DropdownButton, Row, Col } from "react-bootstrap";
import "../css/TicketDropdown.css";

function TicketDropdown({ handleTicketSelection }) {
  const [ticketTypes, setTicketTypes] = useState([]);
  const [ticketCounts, setTicketCounts] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

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

    fetchTicketTypes();
  }, []);

  const handleSelect = (type, count) => {
    const updatedCounts = {
      ...ticketCounts,
      [type.name.toLowerCase()]: count,
    };
    setTicketCounts(updatedCounts);
    calculateTotalPrice(updatedCounts);
    handleTicketSelection(updatedCounts);
  };

  const calculateTotalPrice = (ticketCounts) => {
    let total = 0;
    for (const type in ticketCounts) {
      const ticketType = ticketTypes.find((t) => t.name.toLowerCase() === type);
      if (ticketType) {
        total += ticketType.price * ticketCounts[type];
      }
    }
    setTotalPrice(total);
  };

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

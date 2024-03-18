import React, { useState, useEffect } from "react";
import { Dropdown, DropdownButton, Row } from "react-bootstrap";
import "../css/TicketDropdown.css";

function TicketDropdown({ handleTicketSelection }) {
  const [ticketTypes, setTicketTypes] = useState([]);
  const [ticketCounts, setTicketCounts] = useState({});

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
    console.log("Ticketdropdown Ticket Counts:", updatedCounts);
    handleTicketSelection(updatedCounts);
  };

  return (
    <Row className="ticket-dropdow-row">
      {ticketTypes.map((type) => {
        const selectedCount = ticketCounts[type.name.toLowerCase()] || 0;
        return (
          <DropdownButton
            variant="secondary"
            className="ticket-dropdown-button"
            key={type.id}
            id={`${type.name.toLowerCase()}-dropdown`}
            title={`${type.name} (${selectedCount}) - $${type.price}`}
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
  );
}

export default TicketDropdown;

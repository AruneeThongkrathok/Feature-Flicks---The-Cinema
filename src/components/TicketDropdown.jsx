import React, { useState, useEffect } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

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
    <div>
      {ticketTypes.map((type) => {
        const selectedCount = ticketCounts[type.name.toLowerCase()] || 0;
        return (
          <DropdownButton
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
    </div>
  );
}

export default TicketDropdown;

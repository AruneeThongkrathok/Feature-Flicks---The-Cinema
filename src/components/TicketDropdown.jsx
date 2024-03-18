import React, { useState, useEffect } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

function TicketDropdown() {
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
    setTicketCounts((prevCounts) => ({
      ...prevCounts,
      [type.name.toLowerCase()]: count,
    }));
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

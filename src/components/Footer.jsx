import React from "react";
import "../css/Footer.css";

function Footer() {
  const companyInfo = {
    email: "info@example.com",
    phone: "+1234567890",
    address: "1234 Random Street, Any City, Any Country",
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <strong>Contact Information:</strong>
        <div>Email: {companyInfo.email}</div>
        <div>Phone: {companyInfo.phone}</div>
        <div>Address: {companyInfo.address}</div>
      </div>
    </footer>
  );
}

export default Footer;

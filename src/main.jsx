import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import "./index.css";
import Bookmovie from "./components/BookMovie";
import ChooseSeats from "./components/ChooseSeats";
import Receipt from "./components/Receipt";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Bookmovie/:movieId" element={<Bookmovie />} />
        <Route path="/chooseSeats/:screeningId" element={<ChooseSeats />} />
        <Route path="/Receipt" element={<Receipt />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

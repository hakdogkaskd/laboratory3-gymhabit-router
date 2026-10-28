import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { GymProvider } from "./context/GymContext.jsx";
import "./index.css";

// BrowserRouter = routing, GymProvider = shared workout data for every page
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <GymProvider>
      <App />
    </GymProvider>
  </BrowserRouter>
);

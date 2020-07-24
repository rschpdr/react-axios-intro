import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import "../assets/styles/App.css";
import CountriesList from "./CountriesList";
import CountryDetails from "./CountryDetails";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Route path="/" exact component={CountriesList} />
        <Route path="/country/:id" exact component={CountryDetails} />
      </BrowserRouter>
    </div>
  );
}

export default App;

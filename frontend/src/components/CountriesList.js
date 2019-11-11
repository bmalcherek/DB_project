import React, { useState, useEffect } from "react";
import { List, ListItemText, ListItem, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

import { fetchData } from "../helpers";

import "../styles/CountriesList.css";

const CountriesList = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const response = fetchData("api/countries/");
    response.then(res => setCountries(res.data));
  }, []);

  const countriesListElements = countries.map(country => (
    <ListItem button key={country.id}>
      <ListItemText
        primary={country.name}
        secondary={`continent: ${country.continent}, currency: ${country.currency}, language: ${country.language}`}
      />
    </ListItem>
  ));

  return (
    <div>
      <div id="countries-utils">
        <Link to="/add-country" className="link">
          <Button id="add-country-btn" variant="contained">
            Add Country
          </Button>
        </Link>
      </div>
      <div id="countries-list-container">
        <List id="countries-list">{countriesListElements}</List>
      </div>
    </div>
  );
};

export default CountriesList;

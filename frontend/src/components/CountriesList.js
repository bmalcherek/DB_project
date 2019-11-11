import React, { useState, useEffect } from "react";
import { List, ListItemText, ListItem } from "@material-ui/core";

import { fetchData } from "../helpers";

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

  console.log(countries);

  return (
    <div id="countries-list-container">
      <List id="countries-list">{countriesListElements}</List>
    </div>
  );
};

export default CountriesList;

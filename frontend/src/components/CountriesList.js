import React, { useState, useEffect } from "react";
import {
  List,
  ListItemText,
  ListItem,
  Button,
  ListItemSecondaryAction,
  IconButton
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { Edit, Delete } from "@material-ui/icons";

import { fetchData, deleteItem } from "../helpers";

import "../styles/CountriesList.css";

//FIXME: prevent double reloading after delete

const CountriesList = () => {
  const [countries, setCountries] = useState([]);
  const [edited, setEdited] = useState(false);

  useEffect(() => {
    const response = fetchData("api/countries/");
    response.then(res => {
      setCountries(res.data);
      setEdited(false);
    });
  }, [edited]);

  const handleDelete = event => {
    const response = deleteItem(`api/countries/${event.currentTarget.name}/`);
    response.then(() => setEdited(true));
  };

  const countriesListElements = countries.map(country => (
    <ListItem button key={country.id}>
      <ListItemText
        primary={country.name}
        secondary={`continent: ${country.continent}, currency: ${country.currency}, language: ${country.language}`}
      />
      <ListItemSecondaryAction>
        <Link to={`/countries/${country.id}/edit`}>
          <IconButton edge="end">
            <Edit />
          </IconButton>
        </Link>
        <IconButton edge="end" onClick={handleDelete} name={country.id}>
          <Delete name={country.id} />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  ));

  return (
    <div>
      <div id="countries-utils">
        <Link to="/countries/add-country" className="link">
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

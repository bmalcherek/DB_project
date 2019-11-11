import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";

import { fetchData } from "../helpers";

//TODO: implement edit
//TODO: implement adding airports

const AirportList = () => {
  const [airports, setAirtports] = useState([]);

  useEffect(() => {
    const response = fetchData("api/airports/");
    response.then(res => setAirtports(res.data));
  }, []);

  const handleDelete = () => {
    //TODO: implement delete
    console.log("implement delete");
  };

  const airportsListElements = airports.map(airport => (
    <ListItem button key={airport.id}>
      <ListItemText
        primary={airport.name}
        secondary={`IATA code: ${airport.IATA_code}, ICAO code: ${airport.ICAO_code}, countryID: ${airport.country}`}
      />
      <ListItemSecondaryAction>
        <IconButton edge="end">
          <Edit />
        </IconButton>
        <IconButton edge="end" onClick={handleDelete} name={airport.id}>
          <Delete name={airport.id} />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  ));

  return (
    <div id="airports-list-container">
      <List id="airports-list">{airportsListElements}</List>
    </div>
  );
};

export default AirportList;

import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  ListItemSecondaryAction
} from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";

import { fetchData } from "../helpers";

//TODO: implement edit
//TODO: implement adding airplaneModels

const AirplaneModelsList = () => {
  const [airplaneModels, setAirplaneModels] = useState([]);

  useEffect(() => {
    const response = fetchData("api/airplane-models/");
    response.then(res => setAirplaneModels(res.data));
  }, []);

  const handleDelete = () => {
    //TODO: implement delete
    console.log("implement delete");
  };

  const airplaneModelsListElements = airplaneModels.map(airplaneModel => (
    <ListItem button key={airplaneModel.id}>
      <ListItemText
        primary={airplaneModel.name}
        secondary={`Manufacturer: ${airplaneModel.manufacturer}, Symbol: ${airplaneModel.symbol}`}
      />
      <ListItemSecondaryAction>
        <IconButton edge="end">
          <Edit />
        </IconButton>
        <IconButton edge="end" onClick={handleDelete} name={airplaneModel.id}>
          <Delete name={airplaneModel.id} />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  ));

  console.log(airplaneModels);

  return (
    <div id="airplane-models-list-container">
      <List id="airplane-models-list">{airplaneModelsListElements}</List>
    </div>
  );
};

export default AirplaneModelsList;

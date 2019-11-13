import React, { useState, useEffect } from "react";
import {
  FormControl,
  makeStyles,
  TextField,
  Button,
  Typography
} from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";

import { postData, putData, fetchData } from "../../helpers";

import "../../styles/Forms.css";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1)
  },
  button: {
    margin: theme.spacing(1)
  }
}));

const AirplaneModelForm = props => {
  const [name, setName] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [symbol, setSymbol] = useState("");

  const history = useHistory();
  const { airplaneModelID } = useParams();
  const classes = useStyles();

  useEffect(() => {
    if (props.edit) {
      const response = fetchData(`api/airplane-models/${airplaneModelID}/`);
      response.then(res => {
        setName(res.data.name);
        setManufacturer(res.data.manufacturer);
        setSymbol(res.data.symbol);
      });
    }
  }, [props.edit, airplaneModelID]);

  const handleChange = event => {
    switch (event.target.name) {
      case "name":
        setName(event.target.value);
        break;
      case "manufacturer":
        setManufacturer(event.target.value);
        break;
      case "symbol":
        setSymbol(event.target.value);
        break;
      default:
        console.log("error");
    }
  };

  const handleSubmit = () => {
    const data = {
      name,
      manufacturer,
      symbol
    };
    let response;
    if (props.edit) {
      response = putData(`api/airplane-models/${airplaneModelID}/`, data);
    } else {
      response = postData("api/airplane-models/", data);
    }
    response.then(() => {
      history.push("/airplane-models");
    });
  };

  return (
    <div id="form-container">
      <Typography style={{ marginTop: 10 }}>
        <b>Add Airplane Model</b>
      </Typography>
      <FormControl className={classes.formControl}>
        <TextField
          value={name}
          onChange={handleChange}
          name="name"
          id="name-field"
          label="Name"
          variant="outlined"
        />
      </FormControl>

      <FormControl className={classes.formControl}>
        <TextField
          value={manufacturer}
          onChange={handleChange}
          name="manufacturer"
          id="manufacturer-field"
          label="Manufacturer"
          variant="outlined"
        />
      </FormControl>

      <FormControl className={classes.formControl}>
        <TextField
          value={symbol}
          onChange={handleChange}
          name="symbol"
          id="symbol-field"
          label="Symbol"
          variant="outlined"
        />
      </FormControl>

      <Button
        variant="contained"
        id="form-submit"
        color="primary"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </div>
  );
};

export default AirplaneModelForm;

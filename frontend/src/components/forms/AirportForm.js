import React, { useState, useEffect } from "react";
import {
  FormControl,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  makeStyles,
  FormHelperText
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";

import { fetchData, postData } from "../../helpers";

import "../../styles/Forms.css";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1)
  },
  button: {
    margin: theme.spacing(1)
  }
}));

const AirportForm = props => {
  const [iataCode, setIataCode] = useState("");
  const [icaoCode, setIcaoCode] = useState("");
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);

  const classes = useStyles();
  let history = useHistory();

  useEffect(() => {
    const response = fetchData("api/countries");
    response.then(res => setCountries(res.data));
  }, []);

  const handleChange = event => {
    switch (event.target.name) {
      case "iataCode":
        setIataCode(event.target.value);
        break;
      case "icaoCode":
        setIcaoCode(event.target.value);
        break;
      case "name":
        setName(event.target.value);
        break;
      case "country":
        setCountry(event.target.value);
        break;
      default:
        console.log("error");
    }
  };

  const handleSubmit = () => {
    const data = {
      IATA_code: iataCode,
      ICAO_code: icaoCode,
      name,
      country
    };
    const response = postData("api/airports/", data);
    response.then(() => history.push("/airports"));
  };

  const countriesOptions = countries.map(country => (
    <MenuItem key={country.id} value={country.id}>
      {country.name}
    </MenuItem>
  ));

  return (
    <div id="form-container">
      <FormControl className={classes.formControl}>
        <TextField
          value={iataCode}
          onChange={handleChange}
          name="iataCode"
          id="iata-code-field"
          label="IATA code:"
          variant="outlined"
        />
      </FormControl>

      <FormControl className={classes.formControl}>
        <TextField
          value={icaoCode}
          onChange={handleChange}
          name="icaoCode"
          id="icao-code-field"
          label="ICAO code:"
          variant="outlined"
        />
      </FormControl>

      <FormControl className={classes.formControl}>
        <TextField
          value={name}
          onChange={handleChange}
          name="name"
          id="name-field"
          label="Name:"
          variant="outlined"
        />
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel id="country-select-label">Country</InputLabel>
        <Select
          labelId="country-select-label"
          id="country-select"
          name="country"
          value={country}
          onChange={handleChange}
        >
          {countriesOptions}
        </Select>
        <FormHelperText>
          <Link to="/countries/add-country" className="link">
            If airport country not visible click here
          </Link>
        </FormHelperText>
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

export default AirportForm;

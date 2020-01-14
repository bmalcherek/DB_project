import React, { useState, useEffect } from "react";
import {
	FormControl,
	TextField,
	Button,
	Select,
	MenuItem,
	InputLabel,
	makeStyles,
	FormHelperText,
	Typography
} from "@material-ui/core";
import { Link, useHistory, useParams } from "react-router-dom";

import { fetchData, postData, putData } from "../../helpers";

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
	const [errors, setErrors] = useState({
		IATA_code: "",
		ICAO_code: "",
		name: "",
		country: ""
	});

	const classes = useStyles();
	let history = useHistory();
	const { airportID } = useParams();

	useEffect(() => {
		if (props.edit) {
			document.title = "Edit Airport";
		} else {
			document.title = "Add Airport";
		}
	}, [props.edit]);

	useEffect(() => {
		const response = fetchData("api/countries/");
		response.then(res => setCountries(res.data));

		if (props.edit) {
			const response = fetchData(`api/airports/${airportID}/`);
			response.then(res => {
				setIataCode(res.data.IATA_code);
				setIcaoCode(res.data.ICAO_code);
				setName(res.data.name);
				setCountry(res.data.country);
			});
		}
	}, [airportID, props.edit]);

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
		let response;
		if (props.edit) {
			response = putData(`api/airports/${airportID}/`, data);
		} else {
			response = postData("api/airports/", data);
		}
		response.then(() => history.push("/airports"));
		response.catch(err => {
			console.log(err.response.data);
			let newErrors = {};
			for (var key in errors) {
				if (key in err.response.data) {
					newErrors[key] = err.response.data[key][0];
				} else {
					newErrors[key] = "";
				}
			}
			setErrors(newErrors);
		});
	};

	const countriesOptions = countries.map(country => (
		<MenuItem key={country.id} value={country.id}>
			{country.name}
		</MenuItem>
	));

	return (
		<div id="form-container">
			<Typography>{props.edit ? "Edit Airport" : "Add Airport"}</Typography>

			<FormControl className={classes.formControl}>
				<TextField
					value={iataCode}
					onChange={handleChange}
					name="iataCode"
					id="iata-code-field"
					label="IATA code:"
					variant="outlined"
					error={errors.IATA_code.length > 0 ? true : false}
					helperText={errors.IATA_code}
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
					error={errors.ICAO_code.length > 0 ? true : false}
					helperText={errors.ICAO_code}
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
					error={errors.name.length > 0 ? true : false}
					helperText={errors.name}
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
					error={errors.country.length > 0 ? true : false}
				>
					{countriesOptions}
				</Select>
				<FormHelperText>
					{errors.country.length > 0 ? (
						<Typography style={{ color: "#f44336", fontSize: 12 }}>
							{errors.country}
						</Typography>
					) : null}
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

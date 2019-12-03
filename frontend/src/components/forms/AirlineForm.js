import React, { useState, useEffect } from "react";
import {
	Typography,
	FormControl,
	TextField,
	Button,
	MenuItem,
	Select,
	InputLabel,
	FormHelperText,
	makeStyles
} from "@material-ui/core";
import { useHistory, useParams, Link } from "react-router-dom";

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

const AirlineForm = props => {
	const [icaoCode, setIcaoCode] = useState("");
	const [iataCode, setIataCode] = useState("");
	const [name, setName] = useState("");
	const [baseAirport, setBaseAirport] = useState("");
	const [airports, setAirports] = useState([]);

	const history = useHistory();
	const { airlineID } = useParams();
	const classes = useStyles();

	useEffect(() => {
		document.title = "Add Airline";
		return () => (document.title = "FlightsApp");
	}, []);

	useEffect(() => {
		const response = fetchData("api/airports/");
		response.then(res => {
			setAirports(res.data);
		});
	}, []);

	useEffect(() => {
		if (props.edit) {
			const response = fetchData(`api/airlines/${airlineID}/`);
			response.then(res => {
				setIcaoCode(res.data.icao_code);
				setIataCode(res.data.iata_code);
				setName(res.data.name);
				setBaseAirport(res.data.base_airport);
			});
		}
	}, [props.edit, airlineID]);

	const handleSubmit = () => {
		const data = {
			name,
			iata_code: iataCode,
			icao_code: icaoCode,
			base_airport: baseAirport
		};

		let response;
		if (props.edit) {
			response = putData(`api/airlines/${airlineID}/`, data);
		} else {
			response = postData("api/airlines/", data);
		}
		response.then(history.push("/airlines"));
		response.catch(err => {
			console.log(err);
		});
	};

	const airportOptions = airports.map(airport => (
		<MenuItem key={airport.id} value={airport.id}>
			{airport.name}
		</MenuItem>
	));

	return (
		<div id="form-container">
			<Typography syle={{ marginTop: 10 }}>
				<b>Add Airline</b>
			</Typography>

			<FormControl className={classes.formControl}>
				<TextField
					value={name}
					onChange={event => setName(event.target.value)}
					name="name"
					id="name-field"
					label="Name"
					variant="outlined"
				/>
			</FormControl>

			<FormControl className={classes.formControl}>
				<TextField
					value={iataCode}
					onChange={event => setIataCode(event.target.value)}
					name="iata-code"
					id="iata-code-field"
					label="IATA Code"
					variant="outlined"
				/>
			</FormControl>

			<FormControl className={classes.formControl}>
				<TextField
					value={icaoCode}
					onChange={event => setIcaoCode(event.target.value)}
					name="icao-code"
					id="icao-code-field"
					label="ICAO Code"
					variant="outlined"
				/>
			</FormControl>

			<FormControl className={classes.formControl}>
				<InputLabel id="airport-select-label">Base Airport</InputLabel>
				<Select
					labelId="airport-select-label"
					id="airport-select"
					name="airport"
					value={baseAirport}
					onChange={event => setBaseAirport(event.target.value)}
				>
					{airportOptions}
				</Select>
				<FormHelperText>
					<Link to="/airports/add-airport" className="link">
						If airport not visible click here
					</Link>
				</FormHelperText>

				<Button
					style={{ marginTop: 10 }}
					type="submit"
					variant="contained"
					color="primary"
					onClick={handleSubmit}
				>
					Submit
				</Button>
			</FormControl>
		</div>
	);
};

export default AirlineForm;

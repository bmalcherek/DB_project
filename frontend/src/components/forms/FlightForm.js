import React, { useState, useEffect } from "react";
import {
	FormControl,
	TextField,
	Select,
	MenuItem,
	Button,
	FormHelperText,
	InputLabel,
	makeStyles,
	Typography
} from "@material-ui/core";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

import DateFnsUtlis from "@date-io/date-fns";
import { Link, useParams, useHistory } from "react-router-dom";

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

const FlightForm = props => {
	const [flightNumber, setFlightNumber] = useState("");
	const [airline, setAirline] = useState("");
	const [fromAirport, setFromAirport] = useState("");
	const [toAirport, setToAirport] = useState("");
	const [crew, setCrew] = useState("");
	const [airplane, setAirplane] = useState("");
	const [departureDate, setDepartureDate] = useState(new Date(Date.now()));
	const [arrivalDate, setArrivalDate] = useState(new Date(Date.now()));
	const [numPlaces, setNumPlaces] = useState("");

	const [airlines, setAirlines] = useState([]);
	const [airports, setAirports] = useState([]);
	const [crews, setCrews] = useState([]);
	const [airplanes, setAirplanes] = useState([]);
	const [errors, setErrors] = useState({
		flight_number: "",
		airline: "",
		from_airport: "",
		to_airport: "",
		crew: "",
		airplane: "",
		departure_date: "",
		arrival_date: "",
		num_places: ""
	});

	const classes = useStyles();
	const { flightID } = useParams();
	const history = useHistory();

	useEffect(() => {
		if (props.edit) {
			document.title = "Edit Flight";
		} else {
			document.title = "Add Flight";
		}
	}, [props.edit]);

	useEffect(() => {
		const resAirlines = fetchData("api/airlines/");
		const resAirports = fetchData("api/airports/");
		const resCrews = fetchData("api/crews/");
		const resAirplanes = fetchData("api/airplanes/");

		resAirlines.then(res => setAirlines(res.data));
		resAirports.then(res => setAirports(res.data));
		resCrews.then(res => setCrews(res.data));
		resAirplanes.then(res => setAirplanes(res.data));
	}, []);

	useEffect(() => {
		if (props.edit) {
			const response = fetchData(`api/flights/${flightID}/`);
			response.then(res => {
				setFlightNumber(res.data.flight_number);
				setAirline(res.data.airline);
				setFromAirport(res.data.from_airport);
				setToAirport(res.data.to_airport);
				setCrew(res.data.crew);
				setAirplane(res.data.airplane);
				setDepartureDate(res.data.departure_date);
				setArrivalDate(res.data.arrival_date);
				setNumPlaces(res.data.num_places);
			});
		}
	}, [props.edit, flightID]);

	const handleSubmit = () => {
		const data = {
			flight_number: flightNumber,
			airline,
			from_airport: fromAirport,
			to_airport: toAirport,
			crew,
			airplane,
			departure_date: departureDate,
			arrival_date: arrivalDate,
			num_places: numPlaces
		};

		let response;
		if (props.edit) {
			response = putData(`api/flights/${flightID}`, data);
		} else {
			response = postData("api/flights/", data);
		}
		response.then(() => history.push("/flights"));
		response.catch(err => {
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

	const airlinesOptions = airlines.map(airline => (
		<MenuItem key={airline.id} value={airline.icao_code}>
			{airline.name}
		</MenuItem>
	));

	const fromAirportOptions = airports.map(airport => (
		<MenuItem key={airport.id} value={airport.ICAO_code}>
			{airport.IATA_code}
		</MenuItem>
	));

	const toAirportOptions = airports
		.filter(airport => fromAirport.id !== airport.id)
		.map(airport => (
			<MenuItem key={airport.id} value={airport.ICAO_code}>
				{airport.IATA_code}
			</MenuItem>
		));

	const crewOptions = crews
		.filter(crew => crew.airline === airline)
		.map(crew => (
			<MenuItem key={crew.id} value={crew.id}>
				{crew.id}
			</MenuItem>
		));

	const airplaneOptions = airplanes.map(airplane => (
		<MenuItem key={airplane.id} value={airplane.registration}>
			{airplane.registration}
		</MenuItem>
	));

	return (
		<div id="form-container">
			<Typography>{props.edit ? "Edit Flight" : "Add Flight"}</Typography>

			<FormControl className={classes.formControl}>
				<TextField
					value={flightNumber}
					onChange={event => setFlightNumber(event.target.value)}
					label="Flight Number"
					variant="outlined"
					error={errors.flight_number.length > 0}
					helperText={errors.flight_number}
				/>
			</FormControl>

			<FormControl className={classes.formControl} style={{ width: 235 }}>
				<InputLabel id="airline-select-label">Airline</InputLabel>
				<Select
					labelId="airline-select-label"
					value={airline}
					onChange={event => setAirline(event.target.value)}
					error={errors.airline.length > 0}
				>
					{airlinesOptions}
				</Select>
				<FormHelperText>
					{errors.airline.length > 0 ? (
						<Typography style={{ color: "#f44336", fontSize: 12 }}>
							{errors.airline}
						</Typography>
					) : null}
					<Link to="airlines/add-airline" className="link">
						Add Airline
					</Link>
				</FormHelperText>
			</FormControl>

			<FormControl className={classes.formControl} style={{ width: 235 }}>
				<InputLabel id="from-airport-select-label">From Airport</InputLabel>
				<Select
					labelId="from-airport-select-label"
					value={fromAirport}
					onChange={event => setFromAirport(event.target.value)}
					error={errors.from_airport.length > 0}
				>
					{fromAirportOptions}
				</Select>
				<FormHelperText>
					{errors.from_airport.length > 0 ? (
						<Typography style={{ color: "#f44336", fontSize: 12 }}>
							{errors.from_airport}
						</Typography>
					) : null}
				</FormHelperText>
			</FormControl>

			<FormControl className={classes.formControl} style={{ width: 235 }}>
				<InputLabel id="to-airport-select-label">To Airport</InputLabel>
				<Select
					labelId="to-airport-select-label"
					value={toAirport}
					onChange={event => setToAirport(event.target.value)}
					error={errors.to_airport.length > 0}
				>
					{toAirportOptions}
				</Select>
				<FormHelperText>
					{errors.to_airport.length > 0 ? (
						<Typography style={{ color: "#f44336", fontSize: 12 }}>
							{errors.to_airport}
						</Typography>
					) : null}
					<Link to="airports/add-airport" className="link">
						Add Airport
					</Link>
				</FormHelperText>
			</FormControl>

			<FormControl className={classes.formControl} style={{ width: 235 }}>
				<InputLabel id="crew-select-label">Crew</InputLabel>
				<Select
					labelId="crew-select-label"
					value={crew}
					onChange={event => setCrew(event.target.value)}
					error={errors.crew.length > 0}
				>
					{crewOptions}
				</Select>
				<FormHelperText>
					{errors.crew.length > 0 ? (
						<Typography style={{ color: "#f44336", fontSize: 12 }}>
							{errors.crew}
						</Typography>
					) : null}
					<Link to="/crews/add-crew" className="link">
						Add Crew
					</Link>
				</FormHelperText>
			</FormControl>

			<FormControl className={classes.formControl} style={{ width: 235 }}>
				<InputLabel id="airplane-select-label">Airplane</InputLabel>
				<Select
					labelId="airplane-select-label"
					value={airplane}
					onChange={event => setAirplane(event.target.value)}
					error={errors.airplane.length > 0}
				>
					{airplaneOptions}
				</Select>
				<FormHelperText>
					{errors.airplane.length > 0 ? (
						<Typography style={{ color: "#f44336", fontSize: 12 }}>
							{errors.airplane}
						</Typography>
					) : null}
					<Link to="/airplanes/add-airplane/" className="link">
						Add Airplane
					</Link>
				</FormHelperText>
			</FormControl>

			<FormControl className={classes.formControl} style={{ width: 235 }}>
				<MuiPickersUtilsProvider utils={DateFnsUtlis}>
					<DateTimePicker
						label="Departure Date"
						value={departureDate}
						onChange={event => setDepartureDate(event)}
						format="yyyy-MM-dd HH:mm"
						ampm={false}
						error={errors.departure_date.length > 0}
						helperText={errors.departure_date}
					/>
				</MuiPickersUtilsProvider>
			</FormControl>

			<FormControl className={classes.formControl} style={{ width: 235 }}>
				<MuiPickersUtilsProvider utils={DateFnsUtlis}>
					<DateTimePicker
						label="Arrival Date"
						value={arrivalDate}
						onChange={event => setArrivalDate(event)}
						format="yyyy-MM-dd HH:mm"
						ampm={false}
						error={errors.arrival_date.length > 0}
						helperText={errors.arrival_date}
					/>
				</MuiPickersUtilsProvider>
			</FormControl>

			<FormControl className={classes.formControl}>
				<TextField
					value={numPlaces}
					onChange={event => setNumPlaces(event.target.value)}
					label="Number of Places"
					variant="outlined"
					error={errors.num_places.length > 0}
					helperText={errors.num_places}
				/>
			</FormControl>

			<Button
				type="submit"
				color="primary"
				variant="contained"
				onClick={handleSubmit}
			>
				Submit
			</Button>
		</div>
	);
};

export default FlightForm;

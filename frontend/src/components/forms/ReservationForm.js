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

const ReservationForm = props => {
	const [flight, setFlight] = useState("");
	const [price, setPrice] = useState("");
	const [flights, setFlights] = useState([]);
	const [errors, setErrors] = useState({
		flight: "",
		price: ""
	});

	const classes = useStyles();
	let history = useHistory();
	const { reservationID } = useParams();

	useEffect(() => {
		if (props.edit) {
			document.title = "Edit Reservation";
		} else {
			document.title = "Add Reservation";
		}
	});

	useEffect(() => {
		const response = fetchData("api/flights/");
		response.then(res => setFlights(res.data));
	}, []);

	useEffect(() => {
		if (props.edit) {
			const response = fetchData(`api/reservations/${reservationID}/`);
			response.then(res => {
				setFlight(res.data.flight);
				setPrice(res.data.price);
			});
		}
	}, [reservationID, props.edit]);

	const handleSubmit = () => {
		const data = {
			user: 1,
			flight,
			price
		};

		let response;
		if (props.edit) {
			response = putData(`api/reservations/${reservationID}/`, data);
		} else {
			response = postData("api/reservations/", data);
		}
		response.then(() => history.push("/reservations"));
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

	const flightsOptions = flights.map(flight => (
		<MenuItem key={flight.id} value={flight.flight_number}>
			{flight.flight_number}
		</MenuItem>
	));

	return (
		<div id="form-container">
			<Typography style={{ marginTop: 10 }}>
				{props.edit ? "Edit Reservation" : "Add Reservation"}
			</Typography>

			<FormControl className={classes.formControl} style={{ width: 235 }}>
				<InputLabel id="flight-select-label">Flight</InputLabel>
				<Select
					labelId="flight-select-label"
					id="flight-select"
					name="flight"
					value={flight}
					onChange={event => setFlight(event.target.value)}
					error={errors.flight.length > 0}
				>
					{flightsOptions}
				</Select>
				<FormHelperText>
					{errors.flight.length > 0 ? (
						<Typography style={{ color: "#f44336", fontSize: 12 }}>
							{errors.flight}
						</Typography>
					) : null}

					<Link to="/flights/add-flight" className="link">
						If flight does not exist, click here
					</Link>
				</FormHelperText>
			</FormControl>

			<FormControl className={classes.formControl}>
				<TextField
					value={price}
					onChange={event => setPrice(event.target.value)}
					name="price"
					id="price-field"
					label="Price"
					variant="outlined"
					error={errors.price.length > 0}
					helperText={errors.price}
				/>
			</FormControl>

			<Button
				variant="contained"
				id="form-submit"
				type="submit"
				color="primary"
				onClick={handleSubmit}
			>
				Submit
			</Button>
		</div>
	);
};

export default ReservationForm;

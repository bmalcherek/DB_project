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

const LuggageForm = props => {
	const [amount, setAmount] = useState("");
	const [weightLimit, setWeightLimit] = useState("");
	const [reservation, setReservation] = useState("");
	const [reservations, setReservations] = useState([]);
	const [errors, setErrors] = useState({
		amount: "",
		weight_limit: "",
		reservation: ""
	});

	const classes = useStyles();
	const { luggageID } = useParams();
	const history = useHistory();

	useEffect(() => {
		document.title = "Add Luggage";
	}, []);

	useEffect(() => {
		const response = fetchData("api/reservations/");
		response.then(res => {
			setReservations(res.data);
		});
	}, []);

	useEffect(() => {
		if (props.edit) {
			const response = fetchData(`api/luggage/${luggageID}/`);
			response.then(res => {
				setAmount(res.data.amount);
				setWeightLimit(res.data.weight_limit);
				setReservation(res.data.reservation);
			});
		}
	}, [props.edit, luggageID]);

	const handleSubmit = () => {
		const data = {
			amount,
			weight_limit: weightLimit,
			reservation
		};

		let response;
		if (props.edit) {
			response = putData(`api/luggage/${luggageID}/`, data);
		} else {
			response = postData("api/luggage/", data);
		}

		response.then(() => history.push("/luggage"));
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

	const reservationsOptions = reservations.map(reservation => (
		<MenuItem key={reservation.id} value={reservation.id}>
			{reservation.id}
		</MenuItem>
	));

	return (
		<div id="form-container">
			<Typography>Add Luggage</Typography>

			<FormControl className={classes.formControl}>
				<TextField
					error={errors.amount.length > 0 ? true : false}
					helperText={errors.amount}
					value={amount}
					onChange={event => setAmount(event.target.value)}
					name="amount"
					id="amount-field"
					label="Amount"
					variant="outlined"
				/>
			</FormControl>

			<FormControl className={classes.formControl}>
				<TextField
					error={errors.weight_limit.length > 0 ? true : false}
					helperText={errors.weight_limit}
					value={weightLimit}
					onChange={event => setWeightLimit(event.target.value)}
					name="weight-limit"
					id="wieght-limit-field"
					label="Weight Limit"
					variant="outlined"
				/>
			</FormControl>

			<FormControl className={classes.formControl} style={{ width: 235 }}>
				<InputLabel id="reservation-select-label">Reservation</InputLabel>
				<Select
					error={errors.reservation.length > 0 ? true : false}
					labelId="reservation-select-label"
					id="reservation-select"
					name="reservation"
					value={reservation}
					onChange={event => setReservation(event.target.value)}
				>
					{reservationsOptions}
				</Select>
				<FormHelperText>
					{errors.reservation.length > 0 ? (
						<Typography style={{ color: "#f44336", fontSize: 12 }}>
							{errors.reservation}
						</Typography>
					) : null}
					<Link to="/reservations/add-reservation" className="link">
						Click here to create reservation
					</Link>
				</FormHelperText>
			</FormControl>

			<Button
				type="submit"
				id="form-submit"
				color="primary"
				variant="contained"
				onClick={handleSubmit}
			>
				Submit
			</Button>
		</div>
	);
};

export default LuggageForm;

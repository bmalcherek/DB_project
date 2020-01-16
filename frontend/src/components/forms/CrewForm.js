import React, { useState, useEffect } from "react";
import {
	FormControl,
	TextField,
	Select,
	MenuItem,
	Button,
	FormHelperText,
	InputLabel,
	Typography,
	makeStyles
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

const CrewForm = props => {
	const [airlines, setAirlines] = useState([]);
	const [airline, setAirline] = useState("");
	const [size, setSize] = useState("");
	const [errors, setErrors] = useState({
		size: "",
		airline: ""
	});

	const classes = useStyles();
	const { crewID } = useParams();
	const history = useHistory();

	useEffect(() => {
		if (props.edit) {
			document.title = "Edit Crew";
		} else {
			document.title = "Add Crew";
		}
	}, [props.edit]);

	useEffect(() => {
		const response = fetchData("api/airlines/");
		response.then(res => setAirlines(res.data));
	}, []);

	useEffect(() => {
		if (props.edit) {
			const response = fetchData(`api/crews/${crewID}`);
			response.then(res => {
				setAirline(res.data.airline);
				setSize(res.data.size);
			});
		}
	}, [props.edit, crewID]);

	const handleSubmit = () => {
		const data = {
			size,
			airline
		};

		let response;
		if (props.edit) {
			response = putData(`api/crews/${crewID}/`, data);
		} else {
			response = postData("api/crews/", data);
		}

		response.then(() => history.push("/crews"));
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
		<MenuItem key={airline.id} value={airline.id}>
			{airline.name}
		</MenuItem>
	));

	return (
		<div id="form-container">
			<Typography>{props.edit ? "Edit Crew" : "Add Crew"}</Typography>

			<FormControl className={classes.formControl}>
				<TextField
					value={size}
					onChange={event => setSize(event.target.value)}
					name="size"
					id="size-field"
					label="Size"
					variant="outlined"
					error={errors.size.length > 0}
					helperText={errors.size}
				/>
			</FormControl>

			<FormControl className={classes.formControl} style={{ width: 235 }}>
				<InputLabel id="airline-select-label">Airline</InputLabel>
				<Select
					labelId="airline-select-label"
					id="airline-select"
					name="airline"
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
					<Link to="/airlines/add-airline" className="link">
						If airline not visible click here
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

export default CrewForm;

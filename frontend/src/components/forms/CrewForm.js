import React, { useState, useEffect } from "react";
import {
	FormControl,
	TextField,
	Select,
	MenuItem,
	Button,
	FormHelperText,
	InputLabel,
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

	const classes = useStyles();
	const { crewID } = useParams();
	const history = useHistory();

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
	};

	const airlinesOptions = airlines.map(airline => (
		<MenuItem key={airline.id} value={airline.id}>
			{airline.name}
		</MenuItem>
	));

	return (
		<div id="form-container">
			<FormControl className={classes.formControl}>
				<TextField
					value={size}
					onChange={event => setSize(event.target.value)}
					name="size"
					id="size-field"
					label="Size"
					variant="outlined"
				/>
			</FormControl>

			<FormControl className={classes.formControl} style={{ width: 200 }}>
				<InputLabel id="airline-select-label">Airline</InputLabel>
				<Select
					labelId="airline-select-label"
					id="airline-select"
					name="airline"
					value={airline}
					onChange={event => setAirline(event.target.value)}
				>
					{airlinesOptions}
				</Select>
				<FormHelperText>
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

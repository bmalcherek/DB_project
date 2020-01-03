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

const CrewMemberForm = props => {
	const [name, setName] = useState("");
	const [airline, setAirline] = useState("");
	const [crew, setCrew] = useState("");
	const [title, setTitle] = useState("");
	const [airlines, setAirlines] = useState([]);
	const [crews, setCrews] = useState([]);

	const classes = useStyles();
	const { memberID } = useParams();
	const history = useHistory();

	useEffect(() => {
		if (props.edit) {
			const response = fetchData(`api/crew-members/${memberID}`);
			response.then(res => {
				setName(res.data.name);
				setAirline(res.data.airline);
				setCrew(res.data.crew);
				setTitle(res.data.job_title);
			});
		}
	}, [props.edit, memberID]);

	useEffect(() => {
		const response1 = fetchData("api/airlines/");
		const response2 = fetchData("api/crews/");

		response1.then(res => {
			setAirlines(res.data);
		});

		response2.then(res => {
			setCrews(res.data);
		});
	}, []);

	const handleSubmit = () => {
		const data = {
			name,
			airline,
			crew,
			job_title: title
		};

		let response;
		if (props.edit) {
			response = putData(`api/crew-members/${memberID}/`, data);
		} else {
			response = postData("api/crew-members/", data);
		}

		response.then(() => history.push("/crew-members"));
	};

	const airlinesOptions = airlines.map(airline => (
		<MenuItem key={airline.id} value={airline.id}>
			{airline.name}
		</MenuItem>
	));

	const crewsOptions = crews
		.filter(crew => {
			return crew.airline === airline;
		})
		.map(crew => (
			<MenuItem key={crew.id} value={crew.id}>
				{crew.id}
			</MenuItem>
		));

	return (
		<div id="form-container">
			<Typography>
				<b>Add New Crew Member</b>
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

			<FormControl className={classes.formControl} syle={{ width: 200 }}>
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
					<Link to="/airline/add-airline" className="link">
						If airline not visible click here
					</Link>
				</FormHelperText>
			</FormControl>

			<FormControl className={classes.formControl} style={{ width: 200 }}>
				<InputLabel id="crew-select-label">Crew</InputLabel>
				<Select
					labelId="crew-select-label"
					id="crew-select"
					name="crew"
					value={crew}
					onChange={event => setCrew(event.target.value)}
				>
					{crewsOptions}
				</Select>
				<FormHelperText>
					<Link to="/crews/add-crew" className="link">
						If no crew visible, add crew to selected airline here
					</Link>
				</FormHelperText>
			</FormControl>

			<FormControl className={classes.formControl}>
				<TextField
					value={title}
					onChange={event => setTitle(event.target.value)}
					name="title"
					id="title-field"
					label="Job Title"
					variant="outlined"
				/>
			</FormControl>

			<Button
				type="submit"
				if="form-submit"
				color="primary"
				variant="contained"
				onClick={handleSubmit}
			>
				Submit
			</Button>
		</div>
	);
};

export default CrewMemberForm;

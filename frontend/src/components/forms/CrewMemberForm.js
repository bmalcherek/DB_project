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
	const [errors, setErrors] = useState({
		name: "",
		airline: "",
		crew: "",
		job_title: ""
	});

	const classes = useStyles();
	const { memberID } = useParams();
	const history = useHistory();

	useEffect(() => {
		if (props.edit) {
			document.title = "Edit Crew Member";
		} else {
			document.title = "Add Crew Member";
		}
	}, [props.edit]);

	useEffect(() => {
		if (props.edit) {
			const response = fetchData(`api/crew-members/${memberID}/`);
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
		<MenuItem key={airline.id} value={airline.name}>
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
				{props.edit ? "Edit Crew Member" : "Add Crew Member"}
			</Typography>

			<FormControl className={classes.formControl}>
				<TextField
					value={name}
					onChange={event => setName(event.target.value)}
					name="name"
					id="name-field"
					label="Name"
					variant="outlined"
					error={errors.name.length > 0}
					helperText={errors.name}
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
					{errors.airline.length.length > 0 ? (
						<Typography style={{ color: "#f44336", fontSize: 12 }}>
							{errors.airline}
						</Typography>
					) : null}
					<Link to="/airline/add-airline" className="link">
						If airline not visible click here
					</Link>
				</FormHelperText>
			</FormControl>

			<FormControl className={classes.formControl} style={{ width: 235 }}>
				<InputLabel id="crew-select-label">Crew</InputLabel>
				<Select
					labelId="crew-select-label"
					id="crew-select"
					name="crew"
					value={crew}
					onChange={event => setCrew(event.target.value)}
					error={errors.crew.length > 0}
				>
					{crewsOptions}
				</Select>
				<FormHelperText>
					{errors.crew.length > 0 ? (
						<Typography style={{ color: "#f44336", fontSize: 12 }}>
							{errors.crew}
						</Typography>
					) : null}
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
					error={errors.job_title.length > 0}
					helperText={errors.job_title}
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

import React, { useState, useEffect } from "react";
import {
	FormControl,
	makeStyles,
	TextField,
	Button,
	Typography,
	Select,
	FormHelperText,
	MenuItem,
	InputLabel
} from "@material-ui/core";
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker
} from "@material-ui/pickers";
import DateFnsUtlis from "@date-io/date-fns";
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

const AirplaneForm = props => {
	const [registration, setRegistration] = useState("");
	const [date, setDate] = useState(new Date(Date.now()));
	const [airplaneModel, setAirplaneModel] = useState("");
	const [airplaneModels, setAirplaneModels] = useState([]);

	const history = useHistory();
	const { airplaneID } = useParams();
	const classes = useStyles();

	useEffect(() => {
		const response = fetchData("api/airplane-models/");
		response.then(res => {
			setAirplaneModels(res.data);
		});
	}, []);

	useEffect(() => {
		if (props.edit) {
			const response = fetchData(`api/airplanes/${airplaneID}`);
			response.then(res => {
				setRegistration(res.data.registration);
				setDate(new Date(res.data.produced));
				setAirplaneModel(res.data.airplane_model);
			});
		}
	}, [props.edit, airplaneID]);

	const handleSubmit = () => {
		const data = {
			registration,
			produced: date.toISOString().split("T")[0],
			airplane_model: airplaneModel
		};

		console.log(date.toISOString().split("T")[0]);

		let response;
		if (props.edit) {
			response = putData(`api/airplanes/${airplaneID}/`, data);
		} else {
			response = postData("api/airplanes/", data);
		}

		response.then(() => history.push("/airplanes"));
	};

	const airplaneModelOptions = airplaneModels.map(airplaneModel => (
		<MenuItem key={airplaneModel.id} value={airplaneModel.id}>
			{airplaneModel.name}
		</MenuItem>
	));

	return (
		<div id="form-container">
			<Typography style={{ marginTop: 10 }}>
				<b>Add Airplane</b>
			</Typography>

			<FormControl className={classes.formControl}>
				<TextField
					value={registration}
					onChange={event => setRegistration(event.target.value)}
					name="registration"
					id="registration-field"
					label="Registration"
					variant="outlined"
				/>
			</FormControl>

			<FormControl className={classes.formControl}>
				<MuiPickersUtilsProvider utils={DateFnsUtlis}>
					<KeyboardDatePicker
						style={{ width: 225 }}
						margin="normal"
						id="produced-date-picker"
						label="Produced"
						format="yyyy-MM-dd"
						value={date}
						onChange={date => setDate(date)}
						KeyboardButtonProps={{
							"aria-label": "change date"
						}}
					/>
				</MuiPickersUtilsProvider>
			</FormControl>

			<FormControl className={classes.formControl}>
				<InputLabel id="airplane-model-select-label">Airplane Model</InputLabel>
				<Select
					labelId="airplane-model-select-label"
					id="airplane-model-select"
					name="airplane-model"
					value={airplaneModel}
					onChange={event => setAirplaneModel(event.target.value)}
				>
					{airplaneModelOptions}
				</Select>
				<FormHelperText>
					<Link to="/airplane-models/add-airplane-model" className="link">
						If airplane model not visible click here
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

export default AirplaneForm;

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
	const [errors, setErrors] = useState({
		registration: "",
		produced: "",
		airplane_model: ""
	});

	const history = useHistory();
	const { airplaneID } = useParams();
	const classes = useStyles();

	useEffect(() => {
		if (props.edit) {
			document.title = "Edit Airplane";
		} else {
			document.title = "Add Airplane";
		}
	}, [props.edit]);

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

		let response;
		if (props.edit) {
			response = putData(`api/airplanes/${airplaneID}/`, data);
		} else {
			response = postData("api/airplanes/", data);
		}

		response.then(() => history.push("/airplanes"));
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

	const airplaneModelOptions = airplaneModels.map(airplaneModel => (
		<MenuItem key={airplaneModel.id} value={airplaneModel.id}>
			{airplaneModel.name}
		</MenuItem>
	));

	return (
		<div id="form-container">
			<Typography style={{ marginTop: 10 }}>
				{props.edit ? "Edit Airplane" : "Add Airplane"}
			</Typography>

			<FormControl className={classes.formControl}>
				<TextField
					value={registration}
					onChange={event => setRegistration(event.target.value)}
					name="registration"
					id="registration-field"
					label="Registration"
					variant="outlined"
					error={errors.registration.length > 0}
					helperText={errors.registration}
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
						error={errors.produced.length > 0}
						KeyboardButtonProps={{
							"aria-label": "change date"
						}}
					/>
				</MuiPickersUtilsProvider>
				{errors.produced.length > 0 ? (
					<FormHelperText>
						<Typography style={{ color: "#f44336", fontSize: 12 }}>
							{errors.produced}
						</Typography>
					</FormHelperText>
				) : null}
			</FormControl>

			<FormControl className={classes.formControl}>
				<InputLabel id="airplane-model-select-label">Airplane Model</InputLabel>
				<Select
					labelId="airplane-model-select-label"
					id="airplane-model-select"
					name="airplane-model"
					value={airplaneModel}
					onChange={event => setAirplaneModel(event.target.value)}
					error={errors.airplane_model.length > 0}
				>
					{airplaneModelOptions}
				</Select>
				<FormHelperText>
					{errors.airplane_model.length > 0 ? (
						<Typography style={{ color: "#f44336", fontSize: 12 }}>
							{errors.airplane_model}
						</Typography>
					) : null}
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

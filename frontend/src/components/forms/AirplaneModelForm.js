import React, { useState, useEffect } from "react";
import {
	FormControl,
	makeStyles,
	TextField,
	Button,
	Typography
} from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";

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

const AirplaneModelForm = props => {
	const [name, setName] = useState("");
	const [manufacturer, setManufacturer] = useState("");
	const [symbol, setSymbol] = useState("");
	const [errors, setErrors] = useState({
		name: "",
		manufacturer: "",
		symbol: ""
	});

	const history = useHistory();
	const { airplaneModelID } = useParams();
	const classes = useStyles();

	useEffect(() => {
		if (props.edit) {
			document.title = "Edit Airplane Model";
		} else {
			document.title = "Add Airplane Model";
		}
	}, [props.edit]);

	useEffect(() => {
		if (props.edit) {
			const response = fetchData(`api/airplane-models/${airplaneModelID}/`);
			response.then(res => {
				setName(res.data.name);
				setManufacturer(res.data.manufacturer);
				setSymbol(res.data.symbol);
			});
		}
	}, [props.edit, airplaneModelID]);

	const handleChange = event => {
		switch (event.target.name) {
			case "name":
				setName(event.target.value);
				break;
			case "manufacturer":
				setManufacturer(event.target.value);
				break;
			case "symbol":
				setSymbol(event.target.value);
				break;
			default:
				console.log("error");
		}
	};

	const handleSubmit = () => {
		const data = {
			name,
			manufacturer,
			symbol
		};
		let response;
		if (props.edit) {
			response = putData(`api/airplane-models/${airplaneModelID}/`, data);
		} else {
			response = postData("api/airplane-models/", data);
		}
		response.then(() => {
			history.push("/airplane-models");
		});
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

	return (
		<div id="form-container">
			<Typography style={{ marginTop: 10 }}>
				{props.edit ? "Edit Airplane Model" : "Add Airplane Model"}
			</Typography>

			<FormControl className={classes.formControl}>
				<TextField
					value={name}
					onChange={handleChange}
					name="name"
					id="name-field"
					label="Name"
					variant="outlined"
					error={errors.name.length > 0}
					helperText={errors.name}
				/>
			</FormControl>

			<FormControl className={classes.formControl}>
				<TextField
					value={manufacturer}
					onChange={handleChange}
					name="manufacturer"
					id="manufacturer-field"
					label="Manufacturer"
					variant="outlined"
					error={errors.manufacturer.length > 0}
					helperText={errors.manufacturer}
				/>
			</FormControl>

			<FormControl className={classes.formControl}>
				<TextField
					value={symbol}
					onChange={handleChange}
					name="symbol"
					id="symbol-field"
					label="Symbol"
					variant="outlined"
					error={errors.symbol.length > 0}
					helperText={errors.symbol}
				/>
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

export default AirplaneModelForm;

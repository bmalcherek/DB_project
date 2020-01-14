import React, { useState, useEffect } from "react";
import {
	FormControl,
	Select,
	MenuItem,
	InputLabel,
	TextField,
	Typography,
	Button,
	makeStyles,
	FormHelperText
} from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";

import { postData, fetchData, putData } from "../../helpers";

import "../../styles/Forms.css";

//TODO: validate all inputs not empty
//TODO: validate currency on 3 characters
//TODO: add post data error handling

const useStyles = makeStyles(theme => ({
	formControl: {
		margin: theme.spacing(1)
	},
	button: {
		margin: theme.spacing(1)
	}
}));

const CountryForm = props => {
	const [name, setName] = useState("");
	const [continent, setContinent] = useState("");
	const [language, setLanguage] = useState("");
	const [currency, setCurrency] = useState("");
	const [errors, setErrors] = useState({
		name: "",
		language: "",
		currency: "",
		continent: ""
	});

	const classes = useStyles();
	let history = useHistory();
	const { countryID } = useParams();

	const handleChange = event => {
		switch (event.target.name) {
			case "continent":
				setContinent(event.target.value);
				break;
			case "name":
				setName(event.target.value);
				break;
			case "currency":
				setCurrency(event.target.value);
				break;
			case "language":
				setLanguage(event.target.value);
				break;
			default:
				console.log("error");
		}
	};

	useEffect(() => {
		document.title = "Add Country";
	}, []);

	useEffect(() => {
		if (props.edit) {
			const response = fetchData(`api/countries/${countryID}/`);
			response.then(res => {
				setName(res.data["name"]);
				setContinent(res.data["continent"]);
				setCurrency(res.data["currency"]);
				setLanguage(res.data["language"]);
			});
		}
	}, [countryID, props.edit]);

	const handleSubmit = () => {
		const data = {
			name,
			continent,
			language,
			currency
		};
		let response;
		if (props.edit) {
			response = putData(`api/countries/${countryID}/`, data);
		} else {
			response = postData("api/countries/", data);
		}
		response.then(() => history.push("/countries"));
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
			<Typography>Add Continent</Typography>
			<FormControl className={classes.formControl}>
				<TextField
					value={name}
					onChange={handleChange}
					name="name"
					id="name-field"
					label="Name"
					variant="outlined"
					error={errors.name.length > 0 ? true : false}
					helperText={errors.name}
				/>
			</FormControl>

			<FormControl className={classes.formControl}>
				<InputLabel id="continent-label">Continent</InputLabel>
				<Select
					labelId="continent-label"
					name="continent"
					id="continent-select"
					value={continent}
					onChange={handleChange}
					error={errors.continent.length > 0 ? true : false}
				>
					<MenuItem value="Africa">Africa</MenuItem>
					<MenuItem value="Asia">Asia</MenuItem>
					<MenuItem value="Australia">Australia</MenuItem>
					<MenuItem value="Europe">Europe</MenuItem>
					<MenuItem value="North America">North America</MenuItem>
					<MenuItem value="South America">South America</MenuItem>
					<MenuItem value="Antarcitca">Antarcitca</MenuItem>
				</Select>
				{errors.continent.length > 0 ? (
					<FormHelperText>
						<Typography style={{ color: "#f44336", fontSize: 12 }}>
							{errors.continent}
						</Typography>
					</FormHelperText>
				) : null}
			</FormControl>

			<FormControl className={classes.formControl}>
				<TextField
					name="currency"
					onChange={handleChange}
					value={currency}
					id="currency-field"
					label="Currency"
					variant="outlined"
					error={errors.currency.length > 0 ? true : false}
					helperText={errors.currency}
				/>
			</FormControl>

			<FormControl className={classes.formControl}>
				<TextField
					name="language"
					onChange={handleChange}
					value={language}
					id="language-field"
					label="Language"
					variant="outlined"
					error={errors.language.length > 0 ? true : false}
					helperText={errors.language}
				/>
			</FormControl>

			<Button
				className={classes.button}
				variant="contained"
				id="form-input"
				color="primary"
				onClick={handleSubmit}
			>
				Submit
			</Button>
		</div>
	);
};

export default CountryForm;

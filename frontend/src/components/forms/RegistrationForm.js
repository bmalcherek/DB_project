import React, { useState, useEffect } from "react";
import {
	FormControl,
	TextField,
	Button,
	Typography,
	makeStyles,
	CircularProgress
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles(theme => ({
	formControl: {
		margin: theme.spacing(1)
	},
	button: {
		margin: theme.spacing(1)
	}
}));

const RegistrationForm = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password1, setPassword1] = useState("");
	const [password2, setPassword2] = useState("");
	const [completed, setCompleted] = useState(false);

	const classes = useStyles();
	const history = useHistory();

	useEffect(() => {
		document.title = "Register";
		return () => (document.title = "FlightApp");
	}, []);

	const handleRegistration = () => {
		setCompleted(true);
		const data = {
			username,
			email,
			password1,
			password2
		};
		const response = axios.post(
			`${process.env.REACT_APP_API_URL}api/users/register/`,
			data
		);

		response.then(() => {
			history.push("/login");
		});
		response.catch(err => {
			console.log(err);
			setCompleted(false);
		});
	};

	let registerButton;
	if (completed) {
		registerButton = (
			<Button
				variant="contained"
				id="register-btn"
				disabled
				style={{ width: 200, height: 50 }}
			>
				<CircularProgress />
			</Button>
		);
	} else {
		registerButton = (
			<Button
				variant="contained"
				id="register-btn"
				style={{ width: 200, height: 50 }}
				onClick={handleRegistration}
			>
				REGISTER
			</Button>
		);
	}

	return (
		<div id="form-container">
			<Typography style={{ marginTop: 10 }}>Registration</Typography>

			<FormControl className={classes.formControl}>
				<TextField
					variant="outlined"
					label="Username"
					value={username}
					onChange={event => setUsername(event.target.value)}
				/>
			</FormControl>

			<FormControl className={classes.formControl}>
				<TextField
					variant="outlined"
					label="Email"
					value={email}
					onChange={event => setEmail(event.target.value)}
				/>
			</FormControl>

			<FormControl className={classes.formControl}>
				<TextField
					variant="outlined"
					label="Password"
					type="password"
					value={password1}
					onChange={event => setPassword1(event.target.value)}
				/>
			</FormControl>

			<FormControl className={classes.formControl}>
				<TextField
					variant="outlined"
					label="Repeat password"
					type="password"
					value={password2}
					onChange={event => setPassword2(event.target.value)}
				/>
			</FormControl>

			<Link
				className="link"
				to="/login"
				style={{ color: "gray", marginBottom: 10 }}
			>
				Already have an account? Click Here
			</Link>

			{registerButton}
		</div>
	);
};

export default RegistrationForm;

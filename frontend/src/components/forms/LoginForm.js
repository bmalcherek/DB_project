import React, { useState } from "react";
import {
	FormControl,
	TextField,
	Button,
	Typography,
	makeStyles,
	CircularProgress
} from "@material-ui/core";

import { postData } from "../../helpers";

import "../../styles/LoginForm.css";

const useStyles = makeStyles(theme => ({
	formControl: {
		margin: theme.spacing(1)
	},
	button: {
		margin: theme.spacing(1)
	}
}));

const LoginForm = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [loggingIn, setLoggingIn] = useState(false);

	const classes = useStyles();

	const handleLogin = () => {
		setLoggingIn(true);
		const data = { username, password };
		const response = postData("rest-auth/login/", data);
		response.then(res => {
			console.log(res.data);
			setLoggingIn(false);
		});
		response.catch(err => {
			console.log(err);
			setLoggingIn(false);
		});
		// console.log(data);
	};

	let loginButton;
	if (loggingIn) {
		loginButton = (
			<Button variant="contained" id="login-submit-btn" disabled>
				<CircularProgress />
			</Button>
		);
	} else {
		loginButton = (
			<Button variant="contained" id="login-submit-btn" onClick={handleLogin}>
				Login
			</Button>
		);
	}

	return (
		<div id="form-container">
			<Typography style={{ marginTop: 10 }}>Login</Typography>

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
					label="Password"
					type="password"
					value={password}
					onChange={event => setPassword(event.target.value)}
				/>
			</FormControl>

			{loginButton}
		</div>
	);
};

export default LoginForm;

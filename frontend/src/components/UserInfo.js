import React, { useEffect } from "react";
import { Button, Typography } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { Link } from "react-router-dom";

import { fetchData } from "../helpers";
import { useAuthValue } from "../context";

const UserInfo = () => {
	const { auth, setAuth, username, setUsername } = useAuthValue();

	useEffect(() => {
		if (auth && username === "") {
			const response = fetchData("api/username/");
			response.then(res => setUsername(res.data.username));
		}
	});

	let userInfo;
	if (auth) {
		userInfo = (
			<Button style={{ color: "white" }}>
				<Typography align="center">
					<AccountCircle style={{ marginRight: 10 }} />
					{username}
				</Typography>
			</Button>
		);
	} else {
		userInfo = (
			<Link to="/login" className="link">
				<Typography>LOGIN</Typography>
			</Link>
		);
	}

	return <div>{userInfo}</div>;
};

export default UserInfo;

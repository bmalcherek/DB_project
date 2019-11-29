import React, { useEffect, useState } from "react";
import { Button, Typography, Menu, MenuItem } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { Link } from "react-router-dom";

import { fetchData } from "../helpers";
import { useAuthValue } from "../context";

const UserInfo = () => {
	const { auth, setAuth, username, setUsername } = useAuthValue();

	const [dropdownMenuAnchor, setDropdownMenuAnchor] = useState(null);

	useEffect(() => {
		if (auth && username === "") {
			const response = fetchData("api/username/");
			response.then(res => setUsername(res.data.username));
		}
	});

	const handleLogout = () => {
		setAuth(false);
		setUsername("");
		localStorage.removeItem("token");
	};

	let userInfo;
	if (auth) {
		userInfo = (
			<Button
				style={{ color: "white", margin: "0 auto", display: "inline-block" }}
				onClick={event => setDropdownMenuAnchor(event.currentTarget)}
			>
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

	return (
		<div>
			{userInfo}
			<Menu
				anchorEl={dropdownMenuAnchor}
				keepMounted
				open={Boolean(dropdownMenuAnchor)}
				onClose={() => setDropdownMenuAnchor(null)}
			>
				<MenuItem onClick={handleLogout}>Logout</MenuItem>
			</Menu>
		</div>
	);
};

export default UserInfo;

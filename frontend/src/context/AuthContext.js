import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState(() => {
		const expDate = new Date(
			parseInt(localStorage.getItem("expirationDate"), 10)
		);
		const now = new Date();
		const refresh = localStorage.getItem("refresh");

		if (now < expDate && refresh) {
			const data = { refresh };
			axios.defaults.headers = {
				"Content-Type": "application/json"
			};
			axios
				.post(
					`${process.env.REACT_APP_API_URL}api/token/refresh/`,
					JSON.stringify(data)
				)
				.then(res => {
					localStorage.setItem("access", res.data.access);
					localStorage.setItem("refresh", res.data.refresh);
					const today = new Date();

					localStorage.setItem(
						"expirationDate",
						today.setDate(today.getDate() + 28)
					);
				});
			return true;
		} else {
			return false;
		}
	});

	const [username, setUsername] = useState("");

	return (
		<AuthContext.Provider value={{ auth, setAuth, username, setUsername }}>
			{children}
		</AuthContext.Provider>
	);
};

AuthProvider.propTypes = {
	children: PropTypes.node.isRequired
};

export const useAuthValue = () => useContext(AuthContext);

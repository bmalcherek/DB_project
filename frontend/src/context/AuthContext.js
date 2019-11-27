import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState(() => {
		if (localStorage.getItem("stayAuth")) {
			return true;
		}
		return false;
	});
	const [username, setUsername] = useState("");
	const [stayAuth, setStayAuth] = useState(() => {
		if (localStorage.getItem("stayAuth")) {
			return true;
		}
		return false;
	});

	return (
		<AuthContext.Provider
			value={{ auth, setAuth, username, setUsername, stayAuth, setStayAuth }}
		>
			{children}
		</AuthContext.Provider>
	);
};

AuthProvider.propTypes = {
	children: PropTypes.node.isRequired
};

export const useAuthValue = () => useContext(AuthContext);

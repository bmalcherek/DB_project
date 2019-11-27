import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState(() => {
		if (localStorage.getItem("token")) {
			return true;
		}
		return false;
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

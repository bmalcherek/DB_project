import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import { useAuthValue } from "../context";

const PrivateRoute = ({ component: Component, ...rest }) => {
	const { auth } = useAuthValue();

	return (
		<Route
			{...rest}
			render={props =>
				auth ? (
					<Component {...props} />
				) : (
					<Redirect to={{ pathname: "/login" }} />
				)
			}
		/>
	);
};

PrivateRoute.propTypes = {
	component: PropTypes.func.isRequired
};

export default PrivateRoute;

import React from "react";
import { Route, Switch } from "react-router-dom";

import PrivateRoute from "./helpers/PrivateRoute";

import CountriesList from "./components/CountriesList";
import CountryForm from "./components/forms/CountryForm";
import AirportsList from "./components/AirportsList";
import AirplaneModelsList from "./components/AirplaneModelsList";
import AirportForm from "./components/forms/AirportForm";
import AirplaneModelForm from "./components/forms/AirplaneModelForm";
import AirplanesList from "./components/AirplanesList";
import AirplaneForm from "./components/forms/AirplaneForm";
import AirlinesList from "./components/AirlinesList";
import LoginForm from "./components/forms/LoginForm";

const BaseRouter = () => (
	<div id="router">
		<Switch>
			<Route exact path="/" component={LoginForm} />
			<Route exact path="/login" component={LoginForm} />
			<Route exact path="/registration" component={LoginForm} />
			<PrivateRoute exact path="/countries" component={CountriesList} />
			<PrivateRoute
				exact
				path="/countries/add-country"
				component={CountryForm}
			/>
			<PrivateRoute
				exact
				path="/countries/:countryID/edit"
				component={() => <CountryForm edit />}
			/>
			<PrivateRoute exact path="/airports" component={AirportsList} />
			<PrivateRoute
				exact
				path="/airports/add-airport"
				component={AirportForm}
			/>
			<PrivateRoute
				exact
				path="/airports/:airportID/edit"
				component={() => <AirportForm edit />}
			/>
			<PrivateRoute
				exact
				path="/airplane-models"
				component={AirplaneModelsList}
			/>
			<PrivateRoute
				exact
				path="/airplane-models/add-airplane-model"
				component={AirplaneModelForm}
			/>
			<PrivateRoute
				exact
				path="/airplane-models/:airplaneModelID/edit"
				component={() => <AirplaneModelForm edit />}
			/>
			<PrivateRoute exact path="/airplanes" component={AirplanesList} />
			<PrivateRoute
				exact
				path="/airplanes/add-airplane"
				component={AirplaneForm}
			/>
			<PrivateRoute
				exact
				path="/airplanes/:airplaneID/edit"
				component={() => <AirplaneForm edit />}
			/>
			<PrivateRoute exact path="/airlines" component={AirlinesList} />
		</Switch>
	</div>
);

export default BaseRouter;

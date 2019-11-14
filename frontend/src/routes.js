import React from "react";
import { Route, Switch } from "react-router-dom";

import CountriesList from "./components/CountriesList";
import CountryForm from "./components/forms/CountryForm";
import AirportsList from "./components/AirportsList";
import AirplaneModelsList from "./components/AirplaneModelsList";
import AirportForm from "./components/forms/AirportForm";
import AirplaneModelForm from "./components/forms/AirplaneModelForm";
import AirplanesList from "./components/AirplanesList";

const BaseRouter = () => (
	<div id="router">
		<Switch>
			<Route exact path="/" component={CountriesList} />
			<Route exact path="/countries" component={CountriesList} />
			<Route exact path="/countries/add-country" component={CountryForm} />
			<Route
				exact
				path="/countries/:countryID/edit"
				component={() => <CountryForm edit />}
			/>
			<Route exact path="/airports" component={AirportsList} />
			<Route exact path="/airports/add-airport" component={AirportForm} />
			<Route
				exact
				path="/airports/:airportID/edit"
				component={() => <AirportForm edit />}
			/>
			<Route exact path="/airplane-models" component={AirplaneModelsList} />
			<Route
				exact
				path="/airplane-models/add-airplane-model"
				component={AirplaneModelForm}
			/>
			<Route
				exact
				path="/airplane-models/:airplaneModelID/edit"
				component={() => <AirplaneModelForm edit />}
			/>
			<Route exact path="/airplanes" component={AirplanesList} />
		</Switch>
	</div>
);

export default BaseRouter;

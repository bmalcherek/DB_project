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
import RegistrationForm from "./components/forms/RegistrationForm";
import AirlineForm from "./components/forms/AirlineForm";
import CrewsList from "./components/CrewsList";
import CrewForm from "./components/forms/CrewForm";
import CrewMembersList from "./components/CrewMembersList";
import CrewMemberForm from "./components/forms/CrewMemberForm";
import FlightsList from "./components/FlightsList";
import ReservationsList from "./components/ReservationsList";
import LuggageList from "./components/LuggageList";
import ReservationForm from "./components/forms/ReservationForm";

const BaseRouter = () => (
	<div id="router">
		<Switch>
			<Route exact path="/" component={LoginForm} />
			<Route exact path="/registration" component={RegistrationForm} />
			<Route exact path="/login" component={LoginForm} />
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
			<PrivateRoute
				exact
				path="/airlines/add-airline"
				component={AirlineForm}
			/>
			<PrivateRoute
				exact
				path="/airlines/:airlineID/edit"
				component={() => <AirlineForm edit />}
			/>
			<PrivateRoute exact path="/crews" component={CrewsList} />
			<PrivateRoute exact path="/crews/add-crew" component={CrewForm} />
			<PrivateRoute
				exact
				path="/crews/:crewID/edit"
				component={() => <CrewForm edit />}
			/>
			<PrivateRoute exact path="/crew-members" component={CrewMembersList} />
			<PrivateRoute
				exact
				path="/crew-members/add-crew-member"
				component={CrewMemberForm}
			/>
			<PrivateRoute
				exact
				path="/crew-members/:memberID/edit"
				component={() => <CrewMemberForm edit />}
			/>

			<PrivateRoute exact path="/flights" component={FlightsList} />

			<PrivateRoute exact path="/reservations" component={ReservationsList} />
			<PrivateRoute
				exact
				path="/reservations/add-reservation"
				component={ReservationForm}
			/>
			<PrivateRoute
				exact
				path="/reservations/:reservationID/edit"
				component={() => <ReservationForm edit />}
			/>

			<PrivateRoute exact path="/luggage" component={LuggageList} />
		</Switch>
	</div>
);

export default BaseRouter;

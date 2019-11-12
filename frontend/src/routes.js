import React from "react";
import { Route, Switch } from "react-router-dom";

import CountriesList from "./components/CountriesList";
import CountryForm from "./components/forms/CountryForm";
import AirportsList from "./components/AirportsList";
import AirplaneModelsList from "./components/AirplaneModelsList";
import AirportForm from "./components/forms/AirportForm";

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
      <Route exact path="/airplane-models" component={AirplaneModelsList} />
    </Switch>
  </div>
);

export default BaseRouter;

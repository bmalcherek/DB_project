import React from "react";
import { Route, Switch } from "react-router-dom";

import CountriesList from "./components/CountriesList";
import CountryForm from "./components/forms/CountryForm";

const BaseRouter = () => (
  <div id="router">
    <Switch>
      <Route exact path="/" component={CountriesList} />
      <Route exact path="/countries" component={CountriesList} />
      <Route exact path="/add-country" component={CountryForm} />
      <Route
        exact
        path="/countries/:countryID/edit"
        component={() => <CountryForm edit />}
      />
    </Switch>
  </div>
);

export default BaseRouter;

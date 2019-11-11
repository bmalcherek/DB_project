import React from "react";
import { Route, Switch } from "react-router-dom";

import CountriesList from "./components/CountriesList";

const BaseRouter = () => (
  <div id="router">
    <Switch>
      <Route exact path="/" component={CountriesList} />
    </Switch>
  </div>
);

export default BaseRouter;

import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import Admin from "./Admin";


function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/admin" component={Admin} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;
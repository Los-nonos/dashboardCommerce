import React from "react";
import { Route, Switch } from "react-router-dom";

// core components
import Auth from "./layouts/Auth.jsx";

import "./styles/css/material-dashboard-react.css?v=1.6.0";

const App = () => (
  <Switch>
    <Route path="/auth" component={Auth} />
  </Switch>
);

export default App;

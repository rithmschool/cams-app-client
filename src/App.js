import React from "react";
import { Route, Switch } from "react-router-dom";
import Main from "./Main";
import PatientWrapper from "./PatientWrapper";

const App = () => (
  <div>
    <Switch>
      <Route exact path="/assessment/home" component={PatientWrapper} />
      <Route component={Main} />
    </Switch>
  </div>
);

export default App;

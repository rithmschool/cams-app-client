import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Main from './Main'
import PatientWrapper from './PatientWrapper'

class App extends Component {

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/patient/home" component={PatientWrapper} />
          <Route component={Main} />
        </Switch>
      </div>
    );
  }
}

export default App;

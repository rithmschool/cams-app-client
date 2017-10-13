import React, { Component } from 'react';
import EditUserForm from './EditUserForm';
import banner from './images/banner.png';
import PlaylistWrapper from './PlaylistWrapper';
import Dashboard from './Dashboard';
import AssessmentsDashboard from './AssessmentsDashboard';
import LoginForm from './LoginForm';
import Home from './Home';
import Nav from './Nav';
import { ensureCorrectUser } from './helpers';
import { Route, Switch, Redirect } from 'react-router-dom';
import './index.css';
import './App.css';
import InviteDoctorForm from './InviteDoctorForm.js';
import DoctorRegisterForm from './DoctorRegisterForm.js';

const PrivateRoute = ({ component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem('token') ? (
        React.createElement(component, Object.assign(props, rest))
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />
      )}
  />
);

const EnsureCorrectUserRoute = ({ component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      ensureCorrectUser(props.match.params.userID) ? (
        React.createElement(component, Object.assign(props, rest))
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />
      )}
  />
);

const EnsureLoggedOut = ({ component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem('token') ? (
        <Redirect
          to={{
            pathname: '/dashboard',
            state: { from: props.location }
          }}
        />
      ) : (
        React.createElement(component, props)
      )}
  />
);

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { token: localStorage.getItem('token') };
  }

  componentWillReceiveProps() {
    this.setState({
      token: localStorage.getItem('token')
    });
  }

  render() {
    return (
      <div className="mainPage">
        <Nav isLoggedIn={!!this.state.token} />
        <div>
          <div className="gradient" />
          <img
            className="banner"
            src={banner}
            alt="patient and clinician smiling"
          />
        </div>
        <Switch>
          <Route exact path="/" component={Home} />
          <EnsureLoggedOut
            exact
            path="/doctor/register"
            component={DoctorRegisterForm}
          />
          <EnsureLoggedOut exact path="/login" component={LoginForm} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/assessments" component={AssessmentsDashboard} />
          <PrivateRoute
            path="/playlists/new"
            component={PlaylistWrapper}
            editPlaylist={false}
          />
          <PrivateRoute
            path="/playlists/:playlistID/edit"
            component={PlaylistWrapper}
            editPlaylist={true}
          />
          <EnsureCorrectUserRoute
            path="/users/:userID/edit"
            component={EditUserForm}
          />
          <PrivateRoute
            path="/users/:userID/invite"
            component={InviteDoctorForm}
          />
        </Switch>
        <div className="diagonalbottom" />
        <div className="footer">
          <div>
            <div className="me">
              <p>CAMS Corp</p>
              401 Parnassus Avenue San Francisco, CA 94143
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;

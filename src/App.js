import React, {Component} from 'react';
import './index.css';
import './App.css';
import Edit from './Edit'
import banner from './banner.png';
import PlaylistWrapper from './PlaylistWrapper';
import Dashboard from './Dashboard';
import AssessmentsDashboard from './AssessmentsDashboard';
import LoginForm from './Login';
import Home from './Home';
import Nav from './Nav';
import {ensureCorrectUser} from './helpers'
import PatientWrapper from './PatientWrapper';
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import './index.css';
import './App.css';


const PrivateRoute = ({ component, ...rest }) => (
  <Route {...rest} render={props => (
    localStorage.getItem('token') ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

const EnsureCorrectUserRoute = ({ component, ...rest }) => (
  <Route {...rest} render={props => (
    ensureCorrectUser(props.match.params.userId) ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

const EnsureLoggedOut = ({ component, ...rest }) => (
  <Route {...rest} render={props => (
    localStorage.getItem('token') ? (
      <Redirect to={{
        pathname: '/dashboard',
        state: { from: props.location }
      }}/>
    ) : (
      React.createElement(component, props)
    )
  )}/>
)

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {token: localStorage.getItem('token')}
  }

  componentWillReceiveProps() {
    this.setState({
      token: localStorage.getItem('token')
    })
  }

  render() {
    return (
      <div>
        <Nav isLoggedIn={!!this.state.token}/>
        <div>
          <img className="banner" src={banner} alt="patient and clinician smiling"/>
        </div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/patient/home" component={PatientWrapper} />
          <EnsureLoggedOut exact path="/login" component={LoginForm} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/assessments" component={AssessmentsDashboard}/>
          <PrivateRoute path="/playlists/new" component={PlaylistWrapper}/>
          <EnsureCorrectUserRoute path="/users/:userId/edit" component={Edit}/>
        </Switch>
        <div className="diagonalbottom"></div>
        <div className="footer">
          <p className="bold-shadow center">CAMS Corp</p>
          401 Parnassus Avenue
          San Francisco, CA 94143
        </div>
      </div>
    );
  }
}

export default App;

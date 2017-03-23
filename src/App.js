import React, {Component} from 'react';
import banner from './banner.png'
import './index.css';
import './App.css';
import PlaylistWrapper from './PlaylistWrapper'
import Dashboard from './Dashboard'
import Edit from './Edit'
import LoginForm from './Login';
import Home from './Home';
import Nav from './Nav';
import PatientWrapper from './PatientWrapper';
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

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
          <img className="banner" src={banner}/>
        </div>
        <div className="banner-text">
          <h1>Welcome to Not Free Cams</h1>
        </div>
        <div className="content">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/patient/home" component={PatientWrapper} />
            <EnsureLoggedOut exact path="/login" component={LoginForm} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/playlists/new" component={PlaylistWrapper}/>
            <PrivateRoute path="/<int:user_id>" component={Edit}/>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;

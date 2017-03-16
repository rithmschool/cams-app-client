import React, {Component} from 'react';
import './index.css';
import './App.css';
import Dashboard from './Dashboard'
import LoginForm from './Login';
import Home from './Home';
import Nav from './Nav';
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
      <div className="App">
        <Nav isLoggedIn={!!this.state.token}/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={LoginForm} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
        </Switch>
      </div>
    );
  }

}

export default App;

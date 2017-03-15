import React, {Component} from 'react';
import './App.css';
import {LoginForm} from './Login'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to CAMS!</h2>
        </div>
        <p className="App-intro">
          CAMS
        </p>
        <LoginForm/>
      </div>
    );
  }
}

export default App;

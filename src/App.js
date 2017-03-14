import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to CAMS!</h2>
        </div>
        <p className="App-intro">
        C-an A-nyone M-assage S-andwhiches?
        </p>
      </div>
    );
  }
}

export default App;

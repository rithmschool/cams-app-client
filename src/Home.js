import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Home extends Component {

  render() {
    return (
      <div>
        <Link to="/dashboard">Dashboard</Link>
        <br/>
        <h1>Welcome</h1>
      </div>
    )
  }
}

export default Home;

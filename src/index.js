import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {Dashboard} from './Dashboard'
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

ReactDOM.render(
    <Router>
        <div>
        <App />
        <Route path="/dashboard" component={Dashboard}/>
        </div>
    </Router>,
  document.getElementById('root')
);

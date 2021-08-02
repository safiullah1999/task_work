import React, { Component } from 'react';
import { Route, NavLink, BrowserRouter as Router } from 'react-router-dom';
import Ipform from './components/IPForm';
import Form from './components/Form'

import './App.css';
import IPForm from './components/IPForm';

function App() {
  return (
    <div className="App">
      <h3>Form validation</h3>
      <Router>
          <div className="container">
            {/* <ul className="nav">
              <li><NavLink exact to="/Form">Form</NavLink></li>
            </ul> */}


            <div className="pages">
              <Route exact path="/Form" component={Form}/>
            </div>
          </div>
        </Router>
        <IPForm />
    </div>
  );
}

export default App;

import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';
import LandingPage from './Components/landingPage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>App under construction</p>
        </header>
        <div>
          <LandingPage />
        </div>
      </div>
    );
  }
}

export default App;

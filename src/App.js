import React from 'react';
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import { RealTimeDashboard } from './realtimeDashboard';
import { Dashboard } from './Dashboard';
import NavBar from './components/navBar'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Switch>
        <Route
            exact
            path='/'
            component={(props) => <Dashboard />}
          />
          <Route
            exact
            path='/Dashboard'
            component={(props) => <Dashboard />}
          />
          <Route
            exact
            path='/LiveChart'
            component={(props) => <RealTimeDashboard />}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import NavbarComponent from './components/NavbarComponent';
import {Home, Succes} from './pages';

export default class App extends Component {
  render() {
    return (
      <div>
        <NavbarComponent />
        <Router>
          <main>
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/Succes" component={Succes} exact />
            </Switch>
          </main>
        </Router>
      </div>
    )
  }
}

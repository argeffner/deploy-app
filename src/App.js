import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from './Home';
import Snake from './Snake/Snake';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route exact path="/snake">
            <Snake/>
          </Route>
          {/* <Route exact path="/pacman">
            <PacMan/>
          </Route> */}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

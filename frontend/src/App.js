import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import Account from './Account';
import LogIn from './LogIn';
import Friends from './Friends';
import About from './About';
import Canvas from './Canvas';
import './App.css';

function App() {
  return (
    <Router>
      <div className='root'>
        <Switch>
          <Route path='/:userId/canvas/:canvasId'>
            <Canvas />
          </Route>
          <Route path='/:userId/account'>
            <Account />
          </Route>
          <Route path='/:userId/friends'>
            <Friends />
          </Route>
          <Route path='/about'>
            <About />
          </Route>
          <Route path='/'>
            <LogIn />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

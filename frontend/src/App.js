import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import Account from './Account';
import Friends from './Friends';
import About from './About';
import Canvas from './Canvas';
import AuthenticationButton from './components/authentication-button';

import { useAuth0 } from '@auth0/auth0-react';

import './App.css';

const App = () => {
  const { isLoading } = useAuth0;

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
            <AuthenticationButton />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

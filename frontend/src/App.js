import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import Account from './Account';
import LogIn from './LogIn';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/:userId/account'>
          <Account />
        </Route>
        <Route path='/:userId/friends'>
          <Account />
        </Route>
        <Route path='/about'>
          <Account />
        </Route>
        <Route path='/'>
          <LogIn />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

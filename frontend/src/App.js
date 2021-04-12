import React from 'react';
import { Switch, Route } from 'react-router-dom';
import About from "./views/About";
import Canvas from "./Canvas";
import Friends from "./views/Friends";
import Profile from "./views/Profile";
import ExternalApi from "./views/ExternalApi";
import AuthenticationButton from './components/authentication-button';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from './components/loading';
import ProtectedRoute from "./auth/protected-route";

import './App.css';

const App = () => {
  const { isLoading } = useAuth0;

  if (isLoading) {
    return <Loading />
  }

  return (
      <div id="app">
        <Switch>
          <Route path='/'>
            <AuthenticationButton />
          </Route>
          <Route path='/about' component={About} />
          <ProtectedRoute path='/profile' component={Profile} />
          <ProtectedRoute path='/canvas' component={Canvas} />
          <ProtectedRoute path='/friends' component={Friends} />
        </Switch>
      </div>
  );
}

export default App;

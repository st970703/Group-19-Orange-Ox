import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Main from "./views/Main";
import About from "./views/About";
import Canvas from "./Canvas";
import Friends from "./views/Friends";
import Profile from "./views/Profile";
import { useAuth0 } from '@auth0/auth0-react';
import Loading from './components/loading';
import ProtectedRoute from "./auth/protected-route";
import NavBar from './components/nav-bar';

import './App.css';

const App = () => {
  const { isLoading } = useAuth0;

  if (isLoading) {
    return <Loading />
  }

  return (
      <div id="app" className="d-flex flex-column h-100">
      <NavBar />
        <div className="mt-5">
          <Switch>
          <Route path='/' component={Main}>
            <Route path='/about' component={About} />
            <ProtectedRoute path='/profile' component={Profile} />
            <ProtectedRoute path='/canvas' component={Canvas} />
            <ProtectedRoute path='/friends' component={Friends} />
          </Route>
          </Switch>
        </div>
      </div>
  );
}

export default App;

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from "./views/Home";
import About from "./views/About";
import Canvas from "./Canvas";
import Friends from "./views/Friends";
import Profile from "./views/Profile";
import { useAuth0 } from '@auth0/auth0-react';
import Loading from './components/loading';
import ProtectedRoute from "./auth/protected-route";
import Header from './views/Header';

import { AppBar, CssBaseline, Divider, Drawer, IconButton, makeStyles, Typography } from '@material-ui/core';


const App = () => {
  const { isLoading } = useAuth0;

  if (isLoading) {
    return <Loading />
  }

  return (
    <div id="app">
      <Header />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/about' component={About} />
        <ProtectedRoute exact path='/profile' component={Profile} />
        <ProtectedRoute exact path='/canvas' component={Canvas} />
        <ProtectedRoute exact path='/friends' component={Friends} />
      </Switch>
    </div>
  );
}

export default App;

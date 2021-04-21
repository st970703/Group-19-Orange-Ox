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
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3F88C5',
    },
    secondary: {
      main: '#ffffff',
    },
  },
});

const App = () => {
  const { isLoading } = useAuth0;

  if (isLoading) {
    return <Loading />
  }

  return (
    <div id="app">
      <ThemeProvider theme={theme}>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/about' component={About} />
          <ProtectedRoute exact path='/profile' component={Profile} />
          <ProtectedRoute exact path='/canvas' component={Canvas} />
          <ProtectedRoute exact path='/friends' component={Friends} />
        </Switch>
      </ThemeProvider>
    </div>
  );
}

export default App;

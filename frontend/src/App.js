import React, { useState } from 'react';
import Header from './views/Header';
import Login from './views/Login';
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
  {/*
  const [token, setToken] = useState();
 
  if(!token) {
    return <Login setToken={setToken} />
  }
  */}

  return (
    <div id="app">
      <ThemeProvider theme={theme}>
        <Header /> 
      </ThemeProvider>
    </div>
  );
}

export default App;

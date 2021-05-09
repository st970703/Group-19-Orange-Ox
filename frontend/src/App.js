import React from 'react';
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
  return (
    <div id="app">
      <ThemeProvider theme={theme}>
        <Header /> 
      </ThemeProvider>
    </div>
  );
}

export default App;

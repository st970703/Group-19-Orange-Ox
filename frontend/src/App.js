import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from './components/loading';
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
      </ThemeProvider>
    </div>
  );
}

export default App;

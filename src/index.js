import React,{Suspense} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import theme from "theme"
ReactDOM.render(
  <Suspense fallback={<CircularProgress />} >
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </Suspense>,
  document.getElementById('root')
);

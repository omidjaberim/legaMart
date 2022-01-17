import {createTheme } from '@mui/material/styles';
export const theme = createTheme({
    palette: {
      primary: {
        main: "rgb(254,255,255)",
      },
      secondary: {
        main: 'rgb(236,29,99)',
      },
      error:{
        main : 'rgb(209,67,67)'
      },
      action:{
        main :'rgb(29,33,42,0.7)',
      },
    },
    typography:{
      fontFamily:'Tahoma',
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
  });
  export default theme
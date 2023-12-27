import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: 'IBM Plex Sans'
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'IBM Plex Sans';
          font-style: normal;
          font-weight: 400;
        }
      `,
    },
  },
});

export default theme;
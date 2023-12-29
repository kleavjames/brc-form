import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#5e367f",
    },
    secondary: {
      main: "#febd22",
    },
  },
  typography: {
    fontFamily: "IBM Plex Sans",
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

import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme.ts";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { HashRouter } from "react-router-dom";
import RegisterProfileProvider from "./store/RegisterProfileProvider.tsx";
import { ToastContainer } from "react-toastify";
import ProfileProvider from "./store/ProfileProvider.tsx";

import "@fontsource/ibm-plex-sans/300.css";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/700.css";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <HashRouter basename="/">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <ProfileProvider>
            <RegisterProfileProvider>
              <CssBaseline />
              <App />
              <ToastContainer />
            </RegisterProfileProvider>
          </ProfileProvider>
        </LocalizationProvider>
      </HashRouter>
    </ThemeProvider>
  </React.StrictMode>
);

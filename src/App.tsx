// import React from 'react'
import Box from "@mui/material/Box";
import Registration from "./pages/Registration";
import { useState } from "react";
import HeaderBar from "./components/HeaderBar";
import Sidebar from "./components/Sidebar";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";

const App = () => {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <HeaderBar open={open} toggleDrawer={toggleDrawer} />
      <Sidebar open={open} toggleDrawer={toggleDrawer} />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Grid container>
          <Grid item xs={12} md={8} sx={{ m: 3 }}>
            <Registration />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default App;

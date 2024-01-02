// import React from 'react'
import Box from "@mui/material/Box";
import Registration from "./pages/Registration";
import { useState } from "react";
import HeaderBar from "./components/HeaderBar";
import Sidebar from "./components/Sidebar";
import Toolbar from "@mui/material/Toolbar";
import { Route, Routes } from "react-router-dom";
import Profiles from "./pages/Profiles";
import Login from "./pages/Login";

const App = () => {
  // const [open, setOpen] = useState(true);

  // const toggleDrawer = () => {
  //   setOpen(!open);
  // };

  return (
    <Box sx={{ display: "flex" }}>
      {/* <HeaderBar open={open} toggleDrawer={toggleDrawer} />
      <Sidebar open={open} toggleDrawer={toggleDrawer} /> */}
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
        <Login />
        {/* <Toolbar />
        <Routes>
          <Route path="/" element={<Profiles />} />
          <Route path="/register" element={<Registration />} />
        </Routes> */}
      </Box>
    </Box>
  );
};

export default App;

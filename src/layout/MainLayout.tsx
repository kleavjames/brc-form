import { FC, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import HeaderBar from "../components/HeaderBar";
import Sidebar from "../components/Sidebar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { useAppDispatch } from "../redux/store";
import { loadProfileThunks } from "../redux/profiles/thunks";

const MainLayout: FC = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(true);

  useEffect(() => {
    dispatch(loadProfileThunks());
  }, [dispatch]);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
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
        <Outlet />
      </Box>
    </>
  );
};

export default MainLayout;

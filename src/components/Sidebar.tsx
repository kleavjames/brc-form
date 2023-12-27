import { FC } from "react";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { styled, useTheme } from "@mui/material/styles";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useLocation, useNavigate } from "react-router-dom";

const drawerWidth: number = 240;

const DesktopDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

type SidebarProps = {
  open: boolean;
  toggleDrawer: () => void;
};

const Sidebar: FC<SidebarProps> = ({ open, toggleDrawer }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const navigate = useNavigate();
  const location = useLocation();

  if (matches) {
    return (
      <DesktopDrawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          <ListItemButton disabled>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
          <ListItemButton
            onClick={() => navigate("/")}
            selected={location.pathname === "/"}
          >
            <ListItemIcon>
              <ContactPageIcon />
            </ListItemIcon>
            <ListItemText primary="Profiles" />
          </ListItemButton>
          <ListItemButton
            onClick={() => navigate("/register")}
            selected={location.pathname === "/register"}
          >
            <ListItemIcon>
              <PersonAddAlt1Icon />
            </ListItemIcon>
            <ListItemText primary="Register" />
          </ListItemButton>
        </List>
      </DesktopDrawer>
    );
  }

  return (
    <MuiDrawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
      variant="temporary"
      open={open}
      onClose={toggleDrawer}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
        }}
      >
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav" disablePadding>
        <ListItemButton disabled>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton
          onClick={() => navigate("/")}
          selected={location.pathname === "/"}
        >
          <ListItemIcon>
            <ContactPageIcon />
          </ListItemIcon>
          <ListItemText primary="Profiles" />
        </ListItemButton>
        <ListItemButton
          onClick={() => navigate("/register")}
          selected={location.pathname === "/register"}
        >
          <ListItemIcon>
            <PersonAddAlt1Icon />
          </ListItemIcon>
          <ListItemText primary="Register" />
        </ListItemButton>
      </List>
    </MuiDrawer>
  );
};

export default Sidebar;

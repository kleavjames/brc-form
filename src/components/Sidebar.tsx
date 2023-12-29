import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import { styled, useTheme } from "@mui/material/styles";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import useMediaQuery from "@mui/material/useMediaQuery";
import BRCLogo from "../assets/BRC_logo.png";
import Box from "@mui/material/Box";

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
      <DesktopDrawer variant="permanent" open>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        ></Toolbar>
        <List component="nav">
          <ListItemButton
            onClick={() => navigate("/")}
            selected={location.pathname === "/"}
          >
            <ListItemIcon>
              <ContactPageIcon
                color={location.pathname === "/" ? "primary" : "action"}
              />
            </ListItemIcon>
            <ListItemText
              primary="Profiles"
              sx={{
                color: ({ palette }) =>
                  location.pathname === "/"
                    ? palette.primary.main
                    : theme.palette.action.activatedOpacity,
              }}
            />
          </ListItemButton>
          <ListItemButton
            onClick={() => navigate("/register")}
            selected={location.pathname === "/register"}
          >
            <ListItemIcon>
              <PersonAddAlt1Icon
                color={location.pathname === "/register" ? "primary" : "action"}
              />
            </ListItemIcon>
            <ListItemText
              primary="Register"
              sx={{
                color: ({ palette }) =>
                  location.pathname === "/register"
                    ? palette.primary.main
                    : theme.palette.action.activatedOpacity,
              }}
            />
          </ListItemButton>
          <Box sx={{ position: "fixed", bottom: 0, left: 15 }}>
            <img src={BRCLogo} width={200} />
          </Box>
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
        <Box sx={{ mx: "auto" }}>
          <img src={BRCLogo} width={100} />
        </Box>
      </Toolbar>
      <Divider />
      <List component="nav" disablePadding>
        <ListItemButton
          onClick={() => {
            navigate("/");
            toggleDrawer();
          }}
          selected={location.pathname === "/"}
        >
          <ListItemIcon>
            <ContactPageIcon
              color={location.pathname === "/" ? "primary" : "action"}
            />
          </ListItemIcon>
          <ListItemText
            primary="Profiles"
            sx={{
              color: ({ palette }) =>
                location.pathname === "/"
                  ? palette.primary.main
                  : theme.palette.action.activatedOpacity,
            }}
          />
        </ListItemButton>
        <ListItemButton
          onClick={() => {
            navigate("/register");
            toggleDrawer();
          }}
          selected={location.pathname === "/register"}
        >
          <ListItemIcon>
            <PersonAddAlt1Icon
              color={location.pathname === "/register" ? "primary" : "action"}
            />
          </ListItemIcon>
          <ListItemText
            primary="Register"
            sx={{
              color: ({ palette }) =>
                location.pathname === "/register"
                  ? palette.primary.main
                  : theme.palette.action.activatedOpacity,
            }}
          />
        </ListItemButton>
      </List>
    </MuiDrawer>
  );
};

export default Sidebar;

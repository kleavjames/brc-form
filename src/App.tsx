import Box from "@mui/material/Box";
import Registration from "./pages/Registration";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Profiles from "./pages/Profiles";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./layout/MainLayout";
import Protected from "./components/Protected";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <Protected>
        <MainLayout />
      </Protected>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "profiles", element: <Profiles /> },
      { path: "register", element: <Registration /> },
    ],
  },
]);

const App = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <RouterProvider router={router} />
    </Box>
  );
};

export default App;

import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

interface LoaderProps {
  loading: boolean;
  indexIn?: "modal" | "drawer";
}

const Loader: React.FC<LoaderProps> = ({ loading, indexIn = "drawer" }) => {
  return (
    <div>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) =>
            indexIn === "modal"
              ? theme.zIndex.modal + 1
              : theme.zIndex.drawer + 1,
        }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Loader;

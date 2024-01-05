import { Navigate } from "react-router-dom";
import { FC } from "react";
import { getAuthToken, isTokenExpired } from "../auth/helpers";

interface Props {
  children: React.ReactNode;
}

const Protected: FC<Props> = ({ children }) => {
  const token = getAuthToken();
  const isExpired = isTokenExpired();

  if (token && !isExpired) {
    return children;
  }

  localStorage.removeItem("token");
  localStorage.removeItem("expiryDate");

  return <Navigate to="/login" />;
};

export default Protected;

import { useContext } from "react";
import { RegisterProfileContext } from "../store/RegisterProfileProvider";

export const useRegisterProfile = () => {
  return useContext(RegisterProfileContext);
};

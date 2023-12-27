import { useContext } from "react";
import { ProfileContext } from "../store/ProfileProvider";

export const useProfile = () => {
  return useContext(ProfileContext);
};

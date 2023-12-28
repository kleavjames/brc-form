import { errorHandler, instance } from "../config/axiosInstance";
import { Profile } from "../types/profile";

export const getProfiles = async () => {
  try {
    const response = await instance.get("/profiles");
    return response.data;
  } catch (error) {
    return errorHandler(error);
  }
};

export const addProfile = async (profile: Profile) => {
  try {
    const response = await instance.post("/profiles/create", {
      ...profile,
    });
    return response.data;
  } catch (error) {
    return errorHandler(error);
  }
};

import { instance } from "../config/axiosInstance";
import { Profiles } from "../redux/profiles/types";

export const getProfiles = async () => {
  const response = await instance.get("/profiles");
  return response;
};

export const addProfile = async (profile: Profiles) => {
  const response = await instance.post("/profiles/create", {
    ...profile,
  });
  return response;
};

export const updateProfile = async (profile: Profiles) => {
  const response = await instance.patch(`/profiles/${profile._id}`, {
    ...profile,
  });
  return response;
};

export const deleteProfile = async (id: string) => {
  const response = await instance.delete(`/profiles/${id}`);
  return response;
};

import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Profiles } from "./types";
import {
  addProfile,
  deleteProfile,
  getProfiles,
  updateProfile,
} from "../../api/profiles";
import { HttpStatusCode } from "axios";
import { toast } from "react-toastify";
import { errorToast, successToast } from "../../config/toastConfig";

export const loadProfileThunks = createAsyncThunk<
  Profiles[],
  undefined,
  { state: RootState }
>("profiles/loadProfileThunks", async () => {
  try {
    const response = await getProfiles();
    if (response.status === HttpStatusCode.Ok) {
      return response.data;
    }
  } catch (error) {
    toast.error("Failed to load the profiles", errorToast);
    throw new Error("failed");
  }
});

export const updateProfileThunk = createAsyncThunk<
  Profiles,
  undefined,
  { state: RootState }
>("profiles/updateProfileThunk", async (_, { getState }) => {
  const { defaultProfile, profiles } = getState().profiles;

  for await (const profile of profiles) {
    if (profile._id === defaultProfile._id) {
      continue;
    }
    if (
      profile.firstName.toLowerCase() ===
        defaultProfile.firstName.toLowerCase() &&
      profile.middleName.toLowerCase() ===
        defaultProfile.middleName.toLowerCase() &&
      profile.lastName.toLowerCase() === defaultProfile.lastName.toLowerCase()
    ) {
      toast.error(
        "Profile already exist. Create a new one or update the existing data",
        errorToast
      );
      throw new Error("failed");
    }
  }

  try {
    const response = await updateProfile(defaultProfile);

    if (response.status === HttpStatusCode.Ok) {
      toast.success("Successfully updated the profile", successToast);
      return response.data;
    }
  } catch (error) {
    toast.error("Failed to update profile", errorToast);
    throw new Error("failed");
  }
});

export const deleteProfileThunk = createAsyncThunk<
  string,
  undefined,
  { state: RootState }
>("profiles/deleteProfileThunk", async (_, { getState }) => {
  const { defaultProfile } = getState().profiles;

  try {
    const response = await deleteProfile(defaultProfile._id!);

    if (response.status === HttpStatusCode.Ok) {
      toast.success("Successfully deleted the profile", successToast);
      return response.data;
    }
  } catch (error) {
    toast.error("Failed to delete profile", errorToast);
    throw new Error("failed");
  }
});

export const submitProfileThunk = createAsyncThunk<
  Profiles,
  undefined,
  { state: RootState }
>("profiles/submitProfileThunk", async (_, { getState }) => {
  const { personalInfo, churchInfo, votersInfo, profiles } =
    getState().profiles;

  for await (const profile of profiles) {
    if (
      profile.firstName.toLowerCase() ===
        personalInfo.firstName.toLowerCase() &&
      profile.middleName.toLowerCase() ===
        personalInfo.middleName.toLowerCase() &&
      profile.lastName.toLowerCase() === personalInfo.lastName.toLowerCase()
    ) {
      toast.error(
        "Profile already exist. Create a new one or update the existing data",
        errorToast
      );
      throw new Error("failed");
    }
  }

  try {
    const response = await addProfile({
      ...personalInfo,
      ...churchInfo,
      ...votersInfo,
    });

    if (response.status === HttpStatusCode.Created) {
      toast.success("Successfully created the profile", successToast);
      return response.data;
    }
  } catch (error) {
    toast.error("Failed to create profile", errorToast);
    throw new Error("failed");
  }
});

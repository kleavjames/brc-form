/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Barangays, ObjectKeyValue, ProfileState } from "./types";
import * as thunks from "./thunks";
import {
  initialChurchInfo,
  initialPersonalInfo,
  initialProfile,
  initialVotersInfo,
} from "./constant";
import { Gender, LeadershipLevel, Status } from "./enums";
import { barangays } from "../../constants/barangay";

export const initialState: ProfileState = {
  loadingProfileTable: false,
  loadingProfile: false,
  profiles: [],
  defaultProfile: initialProfile,
  personalInfo: initialPersonalInfo,
  churchInfo: initialChurchInfo,
  votersInfo: initialVotersInfo,
};

const slice = createSlice({
  name: "profiles",
  initialState: initialState,
  reducers: {
    setPersonalInformation: (
      state,
      {
        payload,
      }: PayloadAction<{
        name: string;
        value: string | number | Gender | Status | Date | null;
      }>
    ) => {
      (state.personalInfo as ObjectKeyValue)[payload.name] = payload.value;
      if (state.personalInfo.district) {
        const districtNum = (barangays as unknown as Barangays)[
          state.personalInfo.district
        ][0].district;
        state.personalInfo.districtNumber = districtNum;
      }
    },
    setChurchInformation: (
      state,
      {
        payload,
      }: PayloadAction<{
        name: string;
        value: string | LeadershipLevel | Date | null | undefined;
      }>
    ) => {
      (state.churchInfo as ObjectKeyValue)[payload.name] = payload.value;
    },
    setVotersInformation: (
      state,
      {
        payload,
      }: PayloadAction<{
        name: string;
        value: boolean | string | number | null;
      }>
    ) => {
      (state.votersInfo as ObjectKeyValue)[payload.name] = payload.value;
      if (state.votersInfo.votingDistrict) {
        const districtNum = (barangays as unknown as Barangays)[
          state.votersInfo.votingDistrict
        ][0].district;
        state.votersInfo.votingDistrictNumber = districtNum;
      }
    },
    setVoterInfoIsRegistered: (state, { payload }: PayloadAction<boolean>) => {
      if (!payload) {
        state.votersInfo.votingBarangay = null;
        state.votersInfo.votingPrecinctId = null;
        state.votersInfo.votingDistrict = null;
        state.votersInfo.votingDistrictNumber = null;
        state.votersInfo.votingCity = null;
        state.votersInfo.votingRegion = null;
      }
      state.votersInfo.isRegistered = payload;
    },
    setProfileIsRegisterd: (state, { payload }: PayloadAction<boolean>) => {
      state.defaultProfile.isRegistered = payload;
    },
    setResetProfileInfo: (state) => {
      state.personalInfo = initialPersonalInfo;
      state.churchInfo = initialChurchInfo;
      state.votersInfo = initialVotersInfo;
      state.defaultProfile = initialProfile;
    },
    setSelectedProfile: (state, { payload }: PayloadAction<string | null>) => {
      if (payload === null) {
        state.defaultProfile = initialProfile;
        return;
      }
      const profile = state.profiles.find((profile) => profile._id === payload);
      state.defaultProfile = profile!;
    },
    setProfileUpdate: (
      state,
      {
        payload,
      }: PayloadAction<{
        name: string;
        value: any;
      }>
    ) => {
      (state.defaultProfile as ObjectKeyValue)[payload.name] = payload.value;
      if (state.defaultProfile.district) {
        const districtNum = (barangays as unknown as Barangays)[
          state.defaultProfile.district
        ][0].district;
        state.defaultProfile.districtNumber = districtNum;
      }
      if (state.defaultProfile.votingDistrict) {
        const districtNum = (barangays as unknown as Barangays)[
          state.defaultProfile.votingDistrict
        ][0].district;
        state.defaultProfile.votingDistrictNumber = districtNum;
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(thunks.loadProfileThunks.pending, (state) => {
      state.loadingProfileTable = true;
    });
    builder.addCase(
      thunks.loadProfileThunks.fulfilled,
      (state, { payload }) => {
        state.loadingProfileTable = false;
        state.profiles = payload;
      }
    );
    builder.addCase(thunks.loadProfileThunks.rejected, (state) => {
      state.loadingProfileTable = false;
    });
    builder.addCase(thunks.submitProfileThunk.pending, (state) => {
      state.loadingProfile = true;
    });
    builder.addCase(
      thunks.submitProfileThunk.fulfilled,
      (state, { payload }) => {
        state.loadingProfile = false;
        state.profiles.push(payload);
      }
    );
    builder.addCase(thunks.submitProfileThunk.rejected, (state) => {
      state.loadingProfile = false;
    });
    builder.addCase(thunks.updateProfileThunk.pending, (state) => {
      state.loadingProfile = true;
    });
    builder.addCase(
      thunks.updateProfileThunk.fulfilled,
      (state, { payload }) => {
        const profileIndex = state.profiles.findIndex(
          (profile) => profile._id === payload._id
        );
        state.profiles[profileIndex] = payload;
        state.loadingProfile = false;
      }
    );
    builder.addCase(thunks.updateProfileThunk.rejected, (state) => {
      state.loadingProfile = false;
    });
    builder.addCase(thunks.deleteProfileThunk.pending, (state) => {
      state.loadingProfile = true;
    });
    builder.addCase(
      thunks.deleteProfileThunk.fulfilled,
      (state, { payload }: PayloadAction<string>) => {
        state.profiles = state.profiles.filter(
          (profile) => profile._id !== payload
        );
        state.loadingProfile = false;
      }
    );
    builder.addCase(thunks.deleteProfileThunk.rejected, (state) => {
      state.loadingProfile = false;
    });
  },
});

export const reducer = slice.reducer;
export const actions = {
  ...slice.actions,
  ...thunks,
};

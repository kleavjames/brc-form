/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  Barangays,
  ObjectKeyValue,
  ProfileState,
  VoterCheckType,
} from "./types";
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
        if (state.personalInfo.district === "outside") {
          state.personalInfo.districtNumber = 0;
        } else {
          const districtNum = (barangays as unknown as Barangays)[
            state.personalInfo.district
          ][0].district;
          state.personalInfo.districtNumber = districtNum;
        }
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
      if (state.churchInfo.leadershipLevel === LeadershipLevel.Visitors) {
        state.churchInfo.divineAppointmentDate = null;
        state.churchInfo.networkHead = "";
      }
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
        if (state.votersInfo.votingDistrict === "outside") {
          state.votersInfo.votingDistrictNumber = 0;
        } else {
          const districtNum = (barangays as unknown as Barangays)[
            state.votersInfo.votingDistrict
          ][0].district;
          state.votersInfo.votingDistrictNumber = districtNum;
        }
      }
    },
    setAddressOutsideDavao: (state, { payload }: PayloadAction<boolean>) => {
      if (payload) {
        state.personalInfo.district = "outside";
        state.personalInfo.barangay = "";
      } else {
        state.personalInfo.district = "poblacion";
        state.personalInfo.barangay = "1-A";
      }
      state.personalInfo.outsideDvo = payload;
    },
    setVoterInfoChecked: (
      state,
      {
        payload,
      }: PayloadAction<{
        checked: boolean;
        type: VoterCheckType;
      }>
    ) => {
      // run logic for isRegistered checkbox
      if (payload.type === "forVoter") {
        // if isRegistered is unchecked, set values to null
        if (!payload.checked) {
          state.votersInfo.votingBarangay = null;
          state.votersInfo.votingPrecinctId = null;
          state.votersInfo.votingDistrict = null;
          state.votersInfo.votingDistrictNumber = null;
          state.votersInfo.votingCity = null;
          state.votersInfo.votingRegion = null;
        }
        // check only one checkbox isRegistered or votingOutsideDvo
        if (state.votersInfo.votingOutsideDvo) {
          state.votersInfo.votingOutsideDvo = !payload.checked;
          // if sameAddress is checked, mark to false
          if (state.votersInfo.sameAddress) {
            state.votersInfo.sameAddress = false;
          }
        }
        // uncheck same address if isRegistered is unchecked
        if (state.votersInfo.sameAddress && !payload.checked) {
          state.votersInfo.sameAddress = false;
        }
        state.votersInfo.isRegistered = payload.checked;
        // run logic for votingOutsideDvo checkbox
      } else if (payload.type === "outSideVoter") {
        state.votersInfo.votingBarangay = null;
        // if votingOutsideDvo is checked set district to outside and number to 0
        state.votersInfo.votingDistrict = payload.checked ? "outside" : null;
        state.votersInfo.votingDistrictNumber = payload.checked ? 0 : null;
        state.votersInfo.votingOutsideDvo = payload.checked;
        // check only one checkbox isRegistered or votingOutsideDvo
        if (state.votersInfo.isRegistered) {
          state.votersInfo.isRegistered = !payload.checked;
          // if sameAddress is checked, mark to false
          if (state.votersInfo.sameAddress) {
            state.votersInfo.sameAddress = false;
          }
        }
        // uncheck same address if votingOutsideDvo is unchecked
        if (state.votersInfo.sameAddress && !payload.checked) {
          state.votersInfo.sameAddress = false;
        }
        // run logic for sameAddress checkbox
      } else if (payload.type === "sameDetails") {
        // make voting address same with personal info address
        // if unchecked set to null and add input manually
        state.votersInfo.votingBarangay = payload.checked
          ? state.personalInfo.barangay
          : null;
        state.votersInfo.votingDistrict = payload.checked
          ? state.votersInfo.votingOutsideDvo
            ? "outside"
            : state.personalInfo.district
          : null;
        state.votersInfo.votingDistrictNumber = payload.checked
          ? state.personalInfo.districtNumber
          : null;
        state.votersInfo.votingCity = payload.checked
          ? state.personalInfo.city
          : null;
        state.votersInfo.votingRegion = payload.checked
          ? state.personalInfo.region
          : null;
        state.votersInfo.sameAddress = payload.checked;
      }
    },
    setUpdateProfileCheck: (
      state,
      {
        payload,
      }: PayloadAction<{
        checked: boolean;
        type: VoterCheckType;
      }>
    ) => {
      if (payload.type === "forVoter") {
        // if check is triggered, set all to null
        state.defaultProfile.votingPrecinctId = null;
        state.defaultProfile.votingDistrict = null;
        state.defaultProfile.votingBarangay = null;
        state.defaultProfile.votingCity = null;
        state.defaultProfile.votingRegion = null;
        state.defaultProfile.votingDistrictNumber = null;
        state.defaultProfile.sameAddress = false;
        if (state.defaultProfile.votingOutsideDvo) {
          state.defaultProfile.votingOutsideDvo = false;
        }
        state.defaultProfile.isRegistered = payload.checked;
      } else if (payload.type === "currOutside") {
        // set to right values if voter outside davao is triggered
        state.defaultProfile.address = "";
        state.defaultProfile.district = "outside";
        state.defaultProfile.barangay = "";
        state.defaultProfile.districtNumber = 0;
        state.defaultProfile.city = "";
        state.defaultProfile.region = "";
        state.defaultProfile.outsideDvo = payload.checked;
      } else if (payload.type === "outSideVoter") {
        state.defaultProfile.votingDistrict = payload.checked
          ? "outside"
          : null;
        state.defaultProfile.votingPrecinctId = null;
        state.defaultProfile.votingBarangay = null;
        state.defaultProfile.votingCity = null;
        state.defaultProfile.votingRegion = null;
        state.defaultProfile.votingDistrictNumber = payload.checked ? 0 : null;
        state.defaultProfile.sameAddress = false;
        if (state.defaultProfile.isRegistered) {
          state.defaultProfile.isRegistered = false;
        }
        state.defaultProfile.votingOutsideDvo = payload.checked;
      } else {
        if (payload.checked) {
          state.defaultProfile.votingBarangay = state.defaultProfile.barangay;
          state.defaultProfile.votingDistrict = state.defaultProfile.district;
          state.defaultProfile.votingDistrictNumber =
            state.defaultProfile.districtNumber;
          state.defaultProfile.votingCity = state.defaultProfile.city;
          state.defaultProfile.votingRegion = state.defaultProfile.region;
        } else {
          state.defaultProfile.votingBarangay = null;
          state.defaultProfile.votingDistrict = state.defaultProfile
            .votingOutsideDvo
            ? "outside"
            : null;
          state.defaultProfile.votingDistrictNumber = state.defaultProfile
            .votingOutsideDvo
            ? 0
            : null;
          state.defaultProfile.votingCity = null;
          state.defaultProfile.votingRegion = null;
        }
        state.defaultProfile.sameAddress = payload.checked;
      }
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
      if (state.defaultProfile.leadershipLevel === LeadershipLevel.Visitors) {
        state.defaultProfile.divineAppointmentDate = null;
        state.defaultProfile.networkHead = "";
      }
      if (state.defaultProfile.district) {
        if (state.defaultProfile.district === "outside") {
          state.defaultProfile.districtNumber = 0;
        } else {
          const districtNum = (barangays as unknown as Barangays)[
            state.defaultProfile.district
          ][0].district;
          state.defaultProfile.districtNumber = districtNum;
        }
      }
      if (state.defaultProfile.votingDistrict) {
        if (state.defaultProfile.votingDistrict === "outside") {
          state.defaultProfile.votingDistrictNumber = 0;
        } else {
          const districtNum = (barangays as unknown as Barangays)[
            state.defaultProfile.votingDistrict
          ][0].district;
          state.defaultProfile.votingDistrictNumber = districtNum;
        }
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

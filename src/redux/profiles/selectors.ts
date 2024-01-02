import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { LeadershipLevel } from "./enums";

const profilesSelector = (state: RootState) => state.profiles;

export const selectProfiles = createSelector(
  profilesSelector,
  (state) => state.profiles
);

export const selectDefaultProfile = createSelector(
  profilesSelector,
  (state) => state.defaultProfile
);

export const selectPersonalInfo = createSelector(
  profilesSelector,
  (state) => state.personalInfo
);

export const selectChurchInfo = createSelector(
  profilesSelector,
  (state) => state.churchInfo
);

export const selectVotersInfo = createSelector(
  profilesSelector,
  (state) => state.votersInfo
);

export const selectValidProfileInfo = createSelector(
  profilesSelector,
  (profile) => {
    const {
      firstName,
      lastName,
      middleName,
      birthdate,
      address,
      city,
      region,
    } = profile.personalInfo;

    if (
      !firstName ||
      !lastName ||
      !middleName ||
      !birthdate ||
      !address ||
      !city ||
      !region
    ) {
      return false;
    }
    return true;
  }
);

export const selectValidChurchInfo = createSelector(
  profilesSelector,
  (profile) => {
    const { leadershipLevel, divineAppointmentDate, networkHead } =
      profile.churchInfo;

    if (
      (leadershipLevel !== LeadershipLevel.SeniorPastor && !networkHead) ||
      !divineAppointmentDate
    ) {
      return false;
    }
    return true;
  }
);

export const selectValidVotersInfo = createSelector(
  profilesSelector,
  (profile) => {
    const {
      isRegistered,
      votingBarangay,
      votingCity,
      votingDistrict,
      votingRegion,
    } = profile.votersInfo;

    if (!isRegistered) {
      return true;
    }
    if (!votingDistrict || !votingBarangay || !votingCity || !votingRegion) {
      return false;
    }
    return true;
  }
);

import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { LeadershipLevel } from "./enums";
import { DistrictBarangayMap, DistrictBarangays } from "./types";

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

export const selectTotalProfiles = createSelector(profilesSelector, (state) => {
  let profileCount = 0;
  const profileRegistered = [];
  const nonRegisteredProfiles = [];
  // by districts registered / non registered
  let totalDistrict1 = 0;
  let totalDistrict2 = 0;
  let totalDistrict3 = 0;
  let nonTotalDistrict1 = 0;
  let nonTotalDistrict2 = 0;
  let nonTotalDistrict3 = 0;

  for (const profile of state.profiles) {
    if (profile.isRegistered) {
      profileRegistered.push(profile);
    } else {
      nonRegisteredProfiles.push(profile);
    }

    profileCount += 1;
  }

  for (const profReg of profileRegistered) {
    if (profReg.votingDistrictNumber === 1) {
      totalDistrict1 += 1;
    } else if (profReg.votingDistrictNumber === 2) {
      totalDistrict2 += 1;
    } else if (profReg.votingDistrictNumber === 3) {
      totalDistrict3 += 1;
    }
  }

  for (const nonProf of nonRegisteredProfiles) {
    if (nonProf.districtNumber === 1) {
      nonTotalDistrict1 += 1;
    } else if (nonProf.districtNumber === 2) {
      nonTotalDistrict2 += 1;
    } else if (nonProf.districtNumber === 3) {
      nonTotalDistrict3 += 1;
    }
  }

  return {
    totalProfiles: profileCount,
    totalRegistered: profileRegistered.length,
    totalDistrict1,
    totalDistrict2,
    totalDistrict3,
    nonTotalDistrict1,
    nonTotalDistrict2,
    nonTotalDistrict3,
  };
});

export const selectDistrictOneBarangay = createSelector(
  profilesSelector,
  (state) => {
    const mappedProfiles: DistrictBarangayMap = {};

    for (const profile of state.profiles) {
      if (profile.isRegistered && profile.votingDistrictNumber === 1) {
        if (mappedProfiles[profile.votingBarangay as string]) {
          mappedProfiles[profile.votingBarangay as string].total += 1;
          mappedProfiles[profile.votingBarangay as string].registered += 1;
        } else {
          mappedProfiles[profile.votingBarangay as string] = {
            total: 1,
            registered: 1,
            nonRegistered: 0,
          };
        }
      } else if (!profile.isRegistered && profile.districtNumber === 1) {
        if (mappedProfiles[profile.barangay as string]) {
          mappedProfiles[profile.barangay as string].total += 1;
          mappedProfiles[profile.barangay as string].nonRegistered += 1;
        } else {
          mappedProfiles[profile.barangay as string] = {
            total: 1,
            registered: 0,
            nonRegistered: 1,
          };
        }
      }
    }

    const districtBarangays: DistrictBarangays[] = [];
    for (const barangay in mappedProfiles) {
      districtBarangays.push({
        _id: barangay,
        name: barangay,
        ...mappedProfiles[barangay],
      });
    }

    return districtBarangays.sort((a, b) => {
      if (a.name > b.name) return 1;
      else return -1;
    });
  }
);

export const selectDistrictTwoBarangay = createSelector(
  profilesSelector,
  (state) => {
    const mappedProfiles: DistrictBarangayMap = {};

    for (const profile of state.profiles) {
      if (profile.isRegistered && profile.votingDistrictNumber === 2) {
        if (mappedProfiles[profile.votingBarangay as string]) {
          mappedProfiles[profile.votingBarangay as string].total += 1;
          mappedProfiles[profile.votingBarangay as string].registered += 1;
        } else {
          mappedProfiles[profile.votingBarangay as string] = {
            total: 1,
            registered: 1,
            nonRegistered: 0,
          };
        }
      } else if (!profile.isRegistered && profile.districtNumber === 2) {
        if (mappedProfiles[profile.barangay as string]) {
          mappedProfiles[profile.barangay as string].total += 1;
          mappedProfiles[profile.barangay as string].nonRegistered += 1;
        } else {
          mappedProfiles[profile.barangay as string] = {
            total: 1,
            registered: 0,
            nonRegistered: 1,
          };
        }
      }
    }

    const districtBarangays: DistrictBarangays[] = [];
    for (const barangay in mappedProfiles) {
      districtBarangays.push({
        _id: barangay,
        name: barangay,
        ...mappedProfiles[barangay],
      });
    }

    return districtBarangays.sort((a, b) => {
      if (a.name > b.name) return 1;
      else return -1;
    });
  }
);

export const selectDistrictThreeBarangay = createSelector(
  profilesSelector,
  (state) => {
    const mappedProfiles: DistrictBarangayMap = {};

    for (const profile of state.profiles) {
      if (profile.isRegistered && profile.votingDistrictNumber === 3) {
        if (mappedProfiles[profile.votingBarangay as string]) {
          mappedProfiles[profile.votingBarangay as string].total += 1;
          mappedProfiles[profile.votingBarangay as string].registered += 1;
        } else {
          mappedProfiles[profile.votingBarangay as string] = {
            total: 1,
            registered: 1,
            nonRegistered: 0,
          };
        }
      } else if (!profile.isRegistered && profile.districtNumber === 3) {
        if (mappedProfiles[profile.barangay as string]) {
          mappedProfiles[profile.barangay as string].total += 1;
          mappedProfiles[profile.barangay as string].nonRegistered += 1;
        } else {
          mappedProfiles[profile.barangay as string] = {
            total: 1,
            registered: 0,
            nonRegistered: 1,
          };
        }
      }
    }

    const districtBarangays: DistrictBarangays[] = [];
    for (const barangay in mappedProfiles) {
      districtBarangays.push({
        _id: barangay,
        name: barangay,
        ...mappedProfiles[barangay],
      });
    }

    return districtBarangays.sort((a, b) => {
      if (a.name > b.name) return 1;
      else return -1;
    });
  }
);

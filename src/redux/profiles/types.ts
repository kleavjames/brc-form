/* eslint-disable @typescript-eslint/no-explicit-any */
import { Gender, Status } from "./enums";

export interface Districts {
  name: string;
  subdistrict: {
    key: string;
    value: string;
  }[];
}

export interface PersonalInformation {
  firstName: string;
  lastName: string;
  middleName: string;
  birthdate: Date | null | undefined;
  gender: Gender;
  status: Status;
  address: string;
  district: string;
  districtNumber: number;
  barangay: string;
  city: string;
  region: string;
}

export type ObjectKeyValue = {
  [name: string]: any;
};

export interface ChurchInformation {
  networkHead: string;
  leadershipLevel: string;
  divineAppointmentDate: Date | null | undefined;
}

export interface VotersInformation {
  isRegistered: boolean;
  votingPrecinctId: string | null;
  votingDistrict: string | null;
  votingDistrictNumber: number | null;
  votingBarangay: string | null;
  votingCity: string | null;
  votingRegion: string | null;
}

export interface Barangays {
  [name: string]: [
    {
      key: string;
      value: string;
      district: number;
    }
  ];
}

export interface ProfileState {
  loadingProfileTable: boolean;
  loadingProfile: boolean;
  profiles: Profiles[];
  defaultProfile: Profiles;
  personalInfo: PersonalInformation;
  churchInfo: ChurchInformation;
  votersInfo: VotersInformation;
}

export interface Profiles
  extends PersonalInformation,
    ChurchInformation,
    VotersInformation {
  _id?: string;
}

export interface DistrictBarangayMap {
  [name: string]: {
    total: number;
    registered: number;
    nonRegistered: number;
  };
}

export interface DistrictBarangays {
  _id: string;
  name: string;
  total: number;
  registered: number;
  nonRegistered: number;
}

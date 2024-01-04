import { Gender, LeadershipLevel, Status } from "./enums";
import {
  ChurchInformation,
  PersonalInformation,
  Profiles,
  VotersInformation,
} from "./types";

export const initialProfile: Profiles = {
  _id: "",
  firstName: "",
  outsideDvo: false,
  lastName: "",
  middleName: "",
  birthdate: null,
  gender: Gender.Male,
  status: Status.Married,
  address: "",
  district: "poblacion",
  districtNumber: 0,
  barangay: "1-A",
  city: "",
  region: "",
  networkHead: "",
  leadershipLevel: LeadershipLevel.TwoEightEight,
  divineAppointmentDate: null,
  isRegistered: false,
  votingOutsideDvo: false,
  sameAddress: false,
  votingPrecinctId: null,
  votingBarangay: null,
  votingCity: null,
  votingDistrict: null,
  votingDistrictNumber: null,
  votingRegion: null,
};

export const initialPersonalInfo: PersonalInformation = {
  firstName: "",
  lastName: "",
  outsideDvo: false,
  middleName: "",
  birthdate: null,
  gender: Gender.Male,
  status: Status.Married,
  address: "",
  district: "poblacion",
  districtNumber: 0,
  barangay: "1-A",
  city: "",
  region: "",
};

export const initialChurchInfo: ChurchInformation = {
  networkHead: "",
  leadershipLevel: LeadershipLevel.TwoEightEight,
  divineAppointmentDate: null,
};

export const initialVotersInfo: VotersInformation = {
  isRegistered: false,
  votingOutsideDvo: false,
  sameAddress: false,
  votingPrecinctId: null,
  votingBarangay: null,
  votingCity: null,
  votingDistrict: null,
  votingDistrictNumber: null,
  votingRegion: null,
};

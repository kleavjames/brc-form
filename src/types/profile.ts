import {
  ChurchInformation,
  PersonalInformation,
  VotersInformation,
} from "./information";

export type Profile = PersonalInformation &
  ChurchInformation &
  VotersInformation;

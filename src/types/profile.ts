import {
  ChurchInformation,
  PersonalInformation,
  VotersInformation,
} from "./information";

export interface Profile
  extends PersonalInformation,
    ChurchInformation,
    VotersInformation {
  _id?: string;
}

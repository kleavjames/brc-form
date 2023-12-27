import { FC, ReactNode, createContext, useCallback, useMemo, useState } from "react";
import {
  ChurchInformation,
  Gender,
  LeadershipLevel,
  PersonalInformation,
  Status,
  VotersInformation,
} from "../types/information";

type ProfileProps = {
  personalInfo: PersonalInformation;
  churchInfo: ChurchInformation;
  votersInfo: VotersInformation;
  setPersonalInfo: React.Dispatch<React.SetStateAction<PersonalInformation>>;
  setChurchInfo: React.Dispatch<React.SetStateAction<ChurchInformation>>;
  setVotersInfo: React.Dispatch<React.SetStateAction<VotersInformation>>;
  handleSubmit: () => void;
  handleResetInfo: () => void;
  validProfileInfo: boolean;
  validChurchInfo: boolean;
  validVotersInfo: boolean;
};

type Props = {
  children: ReactNode;
};

const initialState = {
  personalInformation: {
    firstName: "",
    lastName: "",
    middleName: "",
    birthdate: null,
    gender: Gender.Male,
    status: Status.Married,
    address: "",
    district: "poblacion",
    barangay: "1-A",
    city: "",
    region: "",
  },
  churchInformation: {
    networkHead: "",
    leadershipLevel: LeadershipLevel.TwoEightEight,
    divineAppointmentDate: null,
  },
  votersInformation: {
    isRegistered: false,
    precinctId: null,
    barangay: null,
    city: null,
    district: null,
    region: null,
  },
};

const ProfileContext = createContext<ProfileProps>({
  personalInfo: initialState.personalInformation,
  churchInfo: initialState.churchInformation,
  votersInfo: initialState.votersInformation,
  setPersonalInfo: () => {},
  setChurchInfo: () => {},
  setVotersInfo: () => {},
  handleSubmit: () => {},
  handleResetInfo: () => {},
  validProfileInfo: false,
  validChurchInfo: false,
  validVotersInfo: false,
});

const ProfileProvider: FC<Props> = ({ children }) => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInformation>(
    initialState.personalInformation
  );
  const [churchInfo, setChurchInfo] = useState<ChurchInformation>(
    initialState.churchInformation
  );
  const [votersInfo, setVotersInfo] = useState<VotersInformation>(
    initialState.votersInformation
  );

  const validProfileInfo = useMemo(() => {
    const {
      firstName,
      lastName,
      middleName,
      birthdate,
      address,
      city,
      region,
    } = personalInfo;
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
  }, [personalInfo]);

  const validChurchInfo = useMemo(() => {
    const { leadershipLevel, divineAppointmentDate, networkHead } = churchInfo;
    if (
      (leadershipLevel !== LeadershipLevel.SeniorPastor && !networkHead) ||
      !divineAppointmentDate
    ) {
      return false;
    }
    return true;
  }, [churchInfo]);

  const validVotersInfo = useMemo(() => {
    const { isRegistered, district, barangay, city, region } = votersInfo;
    if (!isRegistered) {
      return true;
    }
    if (!district || !barangay || !city || !region) {
      return false;
    }
    return true;
  }, [votersInfo]);

  const handleSubmit = useCallback(() => {
    console.log("personal", personalInfo);
    console.log("church", churchInfo);
    console.log("voters", votersInfo);
  }, [churchInfo, personalInfo, votersInfo]);

  const handleResetInfo = useCallback(() => {
    setPersonalInfo(initialState.personalInformation);
    setChurchInfo(initialState.churchInformation);
    setVotersInfo(initialState.votersInformation);
  }, [])

  return (
    <ProfileContext.Provider
      value={{
        personalInfo,
        churchInfo,
        votersInfo,
        setPersonalInfo,
        setChurchInfo,
        setVotersInfo,
        handleSubmit,
        validProfileInfo,
        validChurchInfo,
        validVotersInfo,
        handleResetInfo,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export { ProfileContext };

export default ProfileProvider;

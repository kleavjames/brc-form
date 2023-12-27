import { FC, ReactNode, createContext, useMemo, useState } from "react";
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
  validProfileInfo: boolean;
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
    divineAppointmentDate: "",
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
  validProfileInfo: false
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
    const {firstName, lastName, middleName, birthdate, address, city, region} = personalInfo;
    if (!firstName || !lastName || !middleName || !birthdate || !address || !city || !region) return false;
    return true;
  }, [personalInfo])

  const handleSubmit = () => {
    console.log('personal', personalInfo);
    console.log('church', churchInfo);
    console.log('voters', votersInfo);
  }

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
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export { ProfileContext };

export default ProfileProvider;

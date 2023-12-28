import {
  FC,
  ReactNode,
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react";
import {
  ChurchInformation,
  Gender,
  LeadershipLevel,
  PersonalInformation,
  Status,
  VotersInformation,
} from "../types/information";
import { addProfile } from "../api/profiles";
import { toast } from "react-toastify";
import { errorToast, successToast } from "../config/toastConfig";

type RegisterProfileProps = {
  personalInfo: PersonalInformation;
  churchInfo: ChurchInformation;
  votersInfo: VotersInformation;
  setPersonalInfo: React.Dispatch<React.SetStateAction<PersonalInformation>>;
  setChurchInfo: React.Dispatch<React.SetStateAction<ChurchInformation>>;
  setVotersInfo: React.Dispatch<React.SetStateAction<VotersInformation>>;
  handleSubmit: () => Promise<void>;
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
    districtNumber: 0,
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
    votingPrecinctId: null,
    votingBarangay: null,
    votingCity: null,
    votingDistrict: null,
    votingDistrictNumber: null,
    votingRegion: null,
  },
};

const RegisterProfileContext = createContext<RegisterProfileProps>({
  personalInfo: initialState.personalInformation,
  churchInfo: initialState.churchInformation,
  votersInfo: initialState.votersInformation,
  setPersonalInfo: () => {},
  setChurchInfo: () => {},
  setVotersInfo: () => {},
  handleSubmit: async () => {},
  handleResetInfo: () => {},
  validProfileInfo: false,
  validChurchInfo: false,
  validVotersInfo: false,
});

const RegisterProfileProvider: FC<Props> = ({ children }) => {
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
    const {
      isRegistered,
      votingBarangay,
      votingCity,
      votingDistrict,
      votingRegion,
    } = votersInfo;
    if (!isRegistered) {
      return true;
    }
    if (!votingDistrict || !votingBarangay || !votingCity || !votingRegion) {
      return false;
    }
    return true;
  }, [votersInfo]);

  const handleSubmit = useCallback(async () => {
    try {
      await addProfile({
        ...personalInfo,
        ...churchInfo,
        ...votersInfo,
      });

      toast.success("Successfully created the profile", successToast);
    } catch (error) {
      toast.error("Failed to create profile", errorToast);
    }
  }, [churchInfo, personalInfo, votersInfo]);

  const handleResetInfo = useCallback(() => {
    setPersonalInfo(initialState.personalInformation);
    setChurchInfo(initialState.churchInformation);
    setVotersInfo(initialState.votersInformation);
  }, []);

  return (
    <RegisterProfileContext.Provider
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
    </RegisterProfileContext.Provider>
  );
};

export { RegisterProfileContext };

export default RegisterProfileProvider;

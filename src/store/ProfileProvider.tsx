/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FC,
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Gender, LeadershipLevel, Status } from "../types/information";
import { deleteProfile, getProfiles, updateProfile } from "../api/profiles";
import { Profile } from "../types/profile";
import { useToast } from "../hooks/useToast";

type ProfileProps = {
  profile: Profile[];
  initialProfile: Profile;
  onHandleUpdate: (profile: Profile, id: string) => Promise<void>;
  onHandleDelete: (id: string) => Promise<void>;
};

type Props = {
  children: ReactNode;
};

const initialState = {
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
  networkHead: "",
  leadershipLevel: LeadershipLevel.TwoEightEight,
  divineAppointmentDate: null,
  isRegistered: false,
  votingPrecinctId: null,
  votingBarangay: null,
  votingCity: null,
  votingDistrict: null,
  votingDistrictNumber: null,
  votingRegion: null,
};

const ProfileContext = createContext<ProfileProps>({
  profile: [],
  initialProfile: initialState,
  onHandleUpdate: async () => {},
  onHandleDelete: async () => {},
});

const ProfileProvider: FC<Props> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<Profile[]>([]);
  const { toastSuccess, toastError } = useToast();

  const fetchProfiles = useCallback(async () => {
    try {
      const profiles = await getProfiles();
      setUserProfile(profiles);
    } catch (error: any) {
      toastError(error.message);
    }
  }, [toastError]);

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  const onHandleUpdate = useCallback(
    async (profile: Profile, id: string) => {
      try {
        await updateProfile(profile, id);
        await fetchProfiles();
        toastSuccess("Successfully updated the profile");
      } catch (error: any) {
        toastError(error.message);
      }
    },
    [fetchProfiles, toastError, toastSuccess]
  );

  const onHandleDelete = useCallback(
    async (id: string) => {
      try {
        await deleteProfile(id);
        fetchProfiles();
        toastSuccess("Successfully deleted the profile");
      } catch (error: any) {
        toastError(error.message);
      }
    },
    [fetchProfiles, toastError, toastSuccess]
  );

  return (
    <ProfileContext.Provider
      value={{
        profile: userProfile,
        initialProfile: initialState,
        onHandleUpdate,
        onHandleDelete,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export { ProfileContext };

export default ProfileProvider;

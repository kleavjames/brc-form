import { FC, ReactNode, createContext, useEffect, useState } from "react";
import { getProfiles } from "../api/profiles";
import { Profile } from "../types/profile";

type ProfileProps = {
  profile: Profile[];
};

type Props = {
  children: ReactNode;
};

const ProfileContext = createContext<ProfileProps>({
  profile: [],
});

const ProfileProvider: FC<Props> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<Profile[]>([]);

  useEffect(() => {
    (async () => {
      const profiles = await getProfiles();
      setUserProfile(profiles);
    })();
  }, []);

  return (
    <ProfileContext.Provider
      value={{
        profile: userProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export { ProfileContext };

export default ProfileProvider;

import { ProfileEdit } from "../components/staffs/ProfileEdit";
import { AppUser } from "../types/UserRole";

interface Props {
  user: AppUser
}

export const Profile = ({user}:Props) => {
  
  return (
    <ProfileEdit user={user} />
  );
};

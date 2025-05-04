import { StaffEdit } from "../components/staffs/StaffEdit";
import { AppUser } from "../types/UserRole";

interface Props {
  user: AppUser;
}

export const Profile = ({user}:Props) => {
  return (
    <StaffEdit user={user}/>
  );
};

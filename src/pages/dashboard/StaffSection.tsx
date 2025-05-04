import { RegisterForm } from "../../components/auth/RegisterForm";
import { StaffList } from "../../components/staffs/StaffList";
import { AppUser } from "../../types/UserRole";

interface Props {
  user: AppUser;
}

export const StaffSection = ({ user }: Props) => (
  <>
    <StaffList brandId={user.brandId} />
    <RegisterForm user={user} />
  </>
);

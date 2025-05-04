import { RegisterForm } from "../../components/auth/RegisterForm";
import { StaffList } from "../../components/staffs/StaffList";
import { AppUser } from "../../types/UserRole";

interface Props {
  user: AppUser;
}

export const StaffSection = ({ user }: Props) => (
  <div className="space-y-4">
    <StaffList brandId={user.brandId} />
    <RegisterForm user={user} />
  </div>
);

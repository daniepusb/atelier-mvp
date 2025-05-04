import { RegisterForm } from "../../components/auth/RegisterForm";
import { StaffList } from "../../components/staffs/StaffList";
import { UserRole } from "../../types/UserRole";

interface Props {
  brandId: string;
}

export const StaffSection = ({ brandId }: Props) => (
  <div className="space-y-4">
    <StaffList brandId={brandId} />
    <RegisterForm brandId={brandId} />
  </div>
);

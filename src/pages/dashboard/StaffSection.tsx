import { useState } from "react";
import { RegisterForm } from "../../components/auth/RegisterForm";
import { StaffList } from "../../components/staffs/StaffList";
import { StaffEdit } from "../../components/staffs/StaffEdit";
import { AppUser } from "../../types/UserRole";

interface Props {
  user: AppUser;
}
export const StaffSection = ({ user }: Props) => {
  const [selectedStaff, setSelectedStaff] = useState<{uid:string, staff:AppUser} | null>(null);

  return (
    <>
      {selectedStaff ? (
        <StaffEdit user={user} selectedStaff={selectedStaff} onBack={() => setSelectedStaff(null)} />
      ) : (
        <>
          <StaffList user={user} onEdit={(uid,staff) => setSelectedStaff({uid,staff})} />
          <RegisterForm user={user} />
        </>
      )}
    </>
  );
};

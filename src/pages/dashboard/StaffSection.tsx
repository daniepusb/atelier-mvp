import { useState } from "react";
import { RegisterForm } from "../../components/auth/RegisterForm";
import { StaffList } from "../../components/staffs/StaffList";
import { StaffEdit } from "../../components/staffs/StaffEdit";
import { AppUser } from "../../types/UserRole";

export const StaffSection = ({ user }: { user: AppUser }) => {
  const [selectedStaff, setSelectedStaff] = useState<AppUser | null>(null);

  return (
    <>
      {selectedStaff ? (
        <StaffEdit user={user} selectedStaff={selectedStaff} onBack={() => setSelectedStaff(null)} />
      ) : (
        <>
          <StaffList user={user} onEdit={(staff) => setSelectedStaff(staff)} />
          <RegisterForm user={user} />
        </>
      )}
    </>
  );
};

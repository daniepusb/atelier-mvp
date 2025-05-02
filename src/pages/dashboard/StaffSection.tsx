import { RegisterForm } from "../../components/auth/RegisterForm";

export const StaffSection = ({ brandId }: { brandId: string }) => (
  <div className="space-y-4">
    <RegisterForm brandId={brandId} />
    {/* Aquí podrías agregar una lista de usuarios registrados si la tienes */}
  </div>
);

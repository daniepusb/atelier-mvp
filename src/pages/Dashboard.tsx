import { AppUser } from "../types/UserRole";

interface Props {
  user: AppUser;
}

export const Dashboard = ({ user }: Props) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Bienvenido, {user.role}</h1>

      {user.role === "admin" && <p>Este es el panel de administración.</p>}
      {user.role === "trabajador" && <p>Este es el panel para presupuestos.</p>}
    </div>
  );
};

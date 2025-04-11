import { AppUser } from "../types/UserRole";
import { ItemForm } from "../components/admin/ItemForm";
import { ItemList } from "../components/admin/ItemList";
import { TaskForm } from "../components/admin/TaskForm";
import { TaskList } from "../components/admin/TaskList";

import { ClientForm } from "../components/Clients/ClientForm";
import { ClientList } from "../components/Clients/ClientList";

const brandId = "M1";

export const Dashboard = ({ user }: { user: AppUser }) => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Bienvenido {user.role}</h1>

      {user.role === "admin" && (
        <div className="space-y-8">
          <ItemForm brandId={brandId} />
          <ItemList brandId={brandId} />
          <TaskForm brandId={brandId} />
          <TaskList brandId={brandId} />
        </div>
      )}

      {user.role === "trabajador" && (
        <>
          <ClientForm brandId="M1" userId={user.uid} />
          <ClientList brandId="M1" />
        </>
      )}
    </div>
  );
};

import { AppUser } from "../types/UserRole";
import { ItemForm } from "../components/Admin/ItemForm";
import { ItemList } from "../components/Admin/ItemList";
import { TaskForm } from "../components/Admin/TaskForm";
import { TaskList } from "../components/Admin/TaskList";

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
        <p>Próximo paso: crear presupuestos para clientes</p>
      )}
    </div>
  );
};

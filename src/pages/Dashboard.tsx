import { AppUser } from "../types/UserRole";
import { ItemForm } from "../components/admin/ItemForm";
import { ItemList } from "../components/admin/ItemList";
import { TaskForm } from "../components/admin/TaskForm";
import { TaskList } from "../components/admin/TaskList";

import { ClientForm } from "../components/clients/ClientForm";
import { ClientList } from "../components/clients/ClientList";

import { BudgetForm } from "../components/budget/BudgetForm";
import { QuoteList } from "../components/quotes/QuoteList";

export const Dashboard = ({ user }: { user: AppUser }) => {
  //console.log('brandID: ' + user.brandId + ' email: ' + user.email + '  role: ' + user.role + '  uid: ' + user.uid);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Bienvenido {user.role}</h1>
      {user.role === "admin" && (
        <div className="space-y-8">
          <ItemForm brandId={user.brandId} userId={user.uid} />
          <ItemList brandId={user.brandId} userId={user.uid} />
          <TaskForm brandId={user.brandId} userId={user.uid} />
          <TaskList brandId={user.brandId} userId={user.uid} />
        </div>
      )}

      {user.role === "trabajador" && (
        <>
          <ClientForm brandId={user.brandId} userId={user.uid} />
          <ClientList brandId={user.brandId} userId={user.uid} />
          <BudgetForm brandId={user.brandId} userId={user.uid} />
          <QuoteList  brandId={user.brandId} userId={user.uid} />
        </>
      )}
    </div>
  );
};

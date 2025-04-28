import { useEffect, useState } from "react";
import { AppUser } from "../types/UserRole";
import { ItemForm } from "../components/admin/ItemForm";
import { ItemList } from "../components/admin/ItemList";
import { TaskForm } from "../components/admin/TaskForm";
import { TaskList } from "../components/admin/TaskList";

import { ClientForm } from "../components/clients/ClientForm";
import { ClientList } from "../components/clients/ClientList";

import { BudgetForm } from "../components/budget/BudgetForm";
import { QuoteList } from "../components/quotes/QuoteList";

import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { ItemDoc, TaskDoc } from "../types/firestoreSchemas";

export const Dashboard = ({ user }: { user: AppUser }) => {
  const [items, setItems] = useState<{ id: string; data: ItemDoc }[]>([]);
  const [tasks, setTasks] = useState<{ id: string; data: TaskDoc }[]>([]);

  const fetchItems = async () => {
    const snapshot = await getDocs(collection(db, `brands/${user.brandId}/items`));
    const itemsData = snapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data() as ItemDoc,
    }));
    setItems(itemsData);
  };

  const fetchTasks = async () => {
    const snapshot = await getDocs(collection(db, `brands/${user.brandId}/tasks`));
    const tasksData = snapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data() as TaskDoc,
    }));
    setTasks(tasksData);
  };

  useEffect(() => {
    fetchItems();
    fetchTasks();
  }, []);

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Bienvenido {user.role}</h1>
      {user.role === "admin" && (
        <div className="space-y-8">
          <ItemList brandId={user.brandId} items={items} onDelete={fetchItems} />
          <ItemForm brandId={user.brandId} userId={user.uid} onItemCreated={fetchItems} />
          <hr />
          <TaskList brandId={user.brandId} tasks={tasks} onDelete={fetchTasks} />
          <TaskForm brandId={user.brandId} userId={user.uid} onTaskCreated={fetchTasks} />
        </div>
      )}

      {user.role === "trabajador" && (
        <>
          <ClientForm brandId={user.brandId} userId={user.uid} />
          <ClientList brandId={user.brandId} userId={user.uid} />
          <BudgetForm brandId={user.brandId} userId={user.uid} />
          <QuoteList brandId={user.brandId} userId={user.uid} />
        </>
      )}
    </div>
  );
};

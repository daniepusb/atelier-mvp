import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { BudgetSummary } from "./BudgetSummary";

interface Props {
  brandId: string;
  userId: string;
}

export const BudgetForm = ({ brandId, userId }: Props) => {
  const [clients, setClients] = useState<any[]>([]);
  const [items, setItems] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);

  const [selectedClient, setSelectedClient] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [clientsSnap, itemsSnap, tasksSnap] = await Promise.all([
        getDocs(collection(db, `brands/${brandId}/clients`)),
        getDocs(collection(db, `brands/${brandId}/items`)),
        getDocs(collection(db, `brands/${brandId}/tasks`)),
      ]);

      setClients(clientsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setItems(itemsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setTasks(tasksSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchData();
  }, [brandId]);

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Nuevo Presupuesto</h2>

      {/* Cliente */}
      <select
        value={selectedClient}
        onChange={(e) => setSelectedClient(e.target.value)}
        className="w-full border p-2"
      >
        <option value="">Seleccionar Cliente</option>
        {clients.map((client) => (
          <option key={client.id} value={client.id}>
            {client.name}
          </option>
        ))}
      </select>

      {/* Vestido */}
      <select
        value={selectedItem}
        onChange={(e) => setSelectedItem(e.target.value)}
        className="w-full border p-2"
      >
        <option value="">Seleccionar Vestido</option>
        {items.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name} - €{item.price}
          </option>
        ))}
      </select>

      {/* Tareas manuales */}
      <div className="space-y-2">
        <p className="font-medium">Tareas Manuales:</p>
        {tasks.map((task) => (
          <label key={task.id} className="flex gap-2 items-center">
            <input
              type="checkbox"
              checked={selectedTasks.includes(task.id)}
              onChange={() =>
                setSelectedTasks((prev) =>
                  prev.includes(task.id)
                    ? prev.filter((id) => id !== task.id)
                    : [...prev, task.id]
                )
              }
            />
            {task.name} - €{task.price}
          </label>
        ))}
      </div>

      {/* Presupuesto */}
      {selectedClient && selectedItem && (
        <BudgetSummary
          client={clients.find((c) => c.id === selectedClient)}
          item={items.find((i) => i.id === selectedItem)}
          tasks={tasks.filter((t) => selectedTasks.includes(t.id))}
          brandId={brandId}
          userId={userId}
        />
      )}
    </div>
  );
};

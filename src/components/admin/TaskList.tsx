import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { TaskDoc } from "../../types/firestoreSchemas";

interface Props {
  brandId: string;
}

export const TaskList = ({ brandId }: Props) => {
  const [tasks, setTasks] = useState<{ id: string; data: TaskDoc }[]>([]);

  const fetchTasks = async () => {
    const snapshot = await getDocs(collection(db, `brands/${brandId}/tasks`));
    const tasksData = snapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data() as TaskDoc,
    }));
    setTasks(tasksData);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, `brands/${brandId}/tasks/${id}`));
    fetchTasks();
  };

  return (
    <div className="mt-6">
      <h3 className="font-bold text-lg mb-2">Lista de Tareas</h3>
      <ul className="space-y-2">
        {tasks.map(({ id, data }) => (
          <li
            key={id}
            className="flex justify-between border p-2 rounded shadow-sm"
          >
            <div>
              {data.name} — <span className="text-sm text-gray-600">€{data.price}</span>
            </div>
            <button
              onClick={() => handleDelete(id)}
              className="text-red-500 hover:underline"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

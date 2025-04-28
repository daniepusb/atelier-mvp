import { deleteDoc, doc } from "firebase/firestore";
import { TaskDoc } from "../../types/firestoreSchemas";
import { db } from "../../firebaseConfig";

interface Props {
  brandId: string;
  tasks: { id: string; data: TaskDoc }[];
  onDelete: () => void;
}

export const TaskList = ({ brandId, tasks, onDelete }: Props) => {
  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, `brands/${brandId}/tasks/${id}`));
    onDelete();
  };

  return (
    <div className="mt-6">
      <h3 className="font-bold text-lg mb-2">Lista de Tareas</h3>
      {tasks.length === 0 ? (
        <div className="text-gray-500 italic">No hay tareas aún 😢</div>
      ) : (
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
      )}
    </div>
  );
};

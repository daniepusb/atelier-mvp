import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { TaskDoc } from "../../types/firestoreSchemas";

interface Props {
  brandId: string;
}

export const TaskForm = ({ brandId }: Props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);

  const handleSubmit = async () => {
    if (!name || price <= 0) return alert("Completa los campos");

    const newTask: TaskDoc = {
      name,
      price,
    };

    await addDoc(collection(db, `brands/${brandId}/tasks`), newTask);
    setName("");
    setPrice(0);
  };

  return (
    <div className="space-y-2 p-4 border rounded-xl shadow-sm">
      <h3 className="font-semibold text-lg">Agregar Tarea Manual</h3>
      <input
        className="border p-2 w-full"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="border p-2 w-full"
        placeholder="Precio (€)"
        type="number"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
      />
      <button
        onClick={handleSubmit}
        className="bg-purple-600 text-white px-4 py-2 rounded"
      >
        Crear
      </button>
    </div>
  );
};

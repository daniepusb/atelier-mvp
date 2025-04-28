import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { ItemDoc } from "../../types/firestoreSchemas";
import { db } from "../../firebaseConfig";

interface Props {
  brandId: string;
  userId?: string;
  onItemCreated: () => void; // nueva prop
}

export const ItemForm = ({ brandId, onItemCreated }: Props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);

  const handleSubmit = async () => {
    if (!name || price <= 0) return alert("Completa los campos");

    const newItem: ItemDoc = {
      name,
      price,
    };

    await addDoc(collection(db, `brands/${brandId}/items`), newItem);
    setName("");
    setPrice(0);
    onItemCreated(); // avisar que se creó un nuevo item
  };

  return (
    <div className="space-y-2 p-4 border rounded-xl shadow-sm">
      <h3 className="font-semibold text-lg">Agregar Prenda</h3>
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
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Crear
      </button>
    </div>
  );
};

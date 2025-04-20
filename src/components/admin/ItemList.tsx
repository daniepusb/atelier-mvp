import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { ItemDoc } from "../../types/firestoreSchemas";

interface Props {
  brandId: string;
  userId?: string;
}

export const ItemList = ({ brandId }: Props) => {
  const [items, setItems] = useState<{ id: string; data: ItemDoc }[]>([]);

  const fetchItems = async () => {
    const snapshot = await getDocs(collection(db, `brands/${brandId}/items`));
    const itemsData = snapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data() as ItemDoc,
    }));
    setItems(itemsData);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, `brands/${brandId}/items/${id}`));
    fetchItems();
  };

  return (
    <div className="mt-6">
      <h3 className="font-bold text-lg mb-2">Lista de Prendas</h3>
      <ul className="space-y-2">
        {items.map(({ id, data }) => (
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

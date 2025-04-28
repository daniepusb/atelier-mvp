import { deleteDoc, doc } from "firebase/firestore";
import { ItemDoc } from "../../types/firestoreSchemas";
import { db } from "../../firebaseConfig";

interface Props {
  brandId: string;
  items: { id: string; data: ItemDoc }[];
  onDelete: () => void;
}

export const ItemList = ({ brandId, items, onDelete }: Props) => {

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, `brands/${brandId}/items/${id}`));
    onDelete();
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

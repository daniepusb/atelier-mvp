import { useEffect, useState } from 'react';
import { AppUser } from '../../types/UserRole';
import { doc, getDoc, updateDoc} from 'firebase/firestore';
import { db, PROJECT_PREFIX } from '../../firebaseConfig';
import { ItemDoc } from '../../types/firestoreSchemas';

interface Props {
  user: AppUser,
  selectedItem: {id:string, item:ItemDoc}
  onBack: () => void;
}

export const ItemEdit = ({ user, selectedItem, onBack }: Props) => {
  
  const [name, setName] = useState(selectedItem.item.name);
  const [price, setPrice] = useState(selectedItem.item.price);
  const [isLoading, setIsLoading] = useState(false);


  const fetchItemData = async () => {
    const userRef = doc(db, PROJECT_PREFIX + `brands/${user.brandId}/items/${selectedItem.id}`);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const data = userSnap.data() as ItemDoc;
      setName(data.name),
      setPrice(data.price)
    }
  };

  const updateItem = async () => {
    setIsLoading(true);
    try {
      const userRef = doc(db, PROJECT_PREFIX + `brands/${user.brandId}/items/${selectedItem.id}`);
      await updateDoc(userRef, { name, price});
      onBack();
      console.log("✅ Perfil actualizado correctamente.");
    } catch (error) {
      console.error("❌ Error al actualizar el perfil:", error);
    } finally {
      setIsLoading(false);
    }
    
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateItem();
  };

  useEffect(() => {
    fetchItemData();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div className="">
        <div className="mt-10 bg-gray-50 dark:bg-gray-50 border-gray rounded-md p-3 ">
          <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">

            <div className="sm:col-span-3 md:col-span-3">
              <label htmlFor="name" className="block text-xs font-medium">Nombre</label>
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>

            <div className="sm:col-span-3 md:col-span-3">
              <label htmlFor="price" className="block text-xs font-medium">Precio</label>
              <input
                id="price"
                name="price"
                type='number'
                value={price}
                onChange={(e) => setPrice(e.target.valueAsNumber)}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>

          </div>
        </div>
      </div>

      {user.isAdmin && (
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" className="text-sm font-semibold text-gray-900" onClick={onBack}>
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            {isLoading ? "Guardando..." : "Guardar"}
          </button>
        </div>
      )}
    </form>
  );
};

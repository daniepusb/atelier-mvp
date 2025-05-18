import { useEffect, useState } from 'react';
import { AppUser } from '../../types/UserRole';
import { doc, getDoc, updateDoc} from 'firebase/firestore';
import { db, PROJECT_PREFIX } from '../../firebaseConfig';
import { TaskDoc } from '../../types/firestoreSchemas';


interface Props {
  user: AppUser,
  selectedTask: {id:string, task:TaskDoc}
  onBack: () => void;
}

export const TaskEdit = ({ user, selectedTask, onBack }: Props) => {
  
  const [name, setName] = useState(selectedTask.task.name);
  const [price, setPrice] = useState(selectedTask.task.price);
  const [isLoading, setIsLoading] = useState(false);


  const fetchItemsData = async () => {
    const userRef = doc(db, PROJECT_PREFIX + `brands/${user.brandId}/items/${selectedTask.id}`);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const data = userSnap.data() as TaskDoc;
      setName(data.name),
      setPrice(data.price)
    }
  };

  const updateTask = async () => {
    setIsLoading(true);
    try {
      const userRef = doc(db, PROJECT_PREFIX + `brands/${user.brandId}/tasks/${selectedTask.id}`);
      await updateDoc(userRef, { name, price });
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
    updateTask();
  };

  useEffect(() => {
    fetchItemsData();
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

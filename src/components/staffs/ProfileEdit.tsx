import { ChevronDownIcon } from '@heroicons/react/16/solid';
import { useEffect, useState } from 'react';
import { AppUser } from '../../types/UserRole';
import { collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { db, PROJECT_PREFIX } from '../../firebaseConfig';
import { StoreDoc } from '../../types/firestoreSchemas';

interface Props {
  user: AppUser
}

export const ProfileEdit = ({ user }: Props) => {
  const [stores, setStores] = useState<{ id: string; data: StoreDoc }[]>([]);
  const [name, setName] = useState(user.name);
  const [lastName, setLastName] = useState(user.lastName);
  const [storeId, setStoreId] = useState(user.storeId);
  const [email, setEmail] = useState(user.email);
  const [isLoading, setIsLoading] = useState(false);
  
  const fetchStores = async () => {
    const snapshot = await getDocs(collection(db, PROJECT_PREFIX + `brands/${user.brandId}/stores`));
    const storesData = snapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data() as StoreDoc,
    }));
    setStores(storesData);
  };

  const fetchUserData = async () => {
    const userRef = doc(db, PROJECT_PREFIX + `brands/${user.brandId}/staff/${user.uid}`);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const data = userSnap.data() as AppUser;
      setName(data.name);
      setLastName(data.lastName);
      setStoreId(data.storeId);
      setEmail(data.email);
    }
  };

  const updateUserProfile = async () => {
    setIsLoading(true);
    try {
      const userRef = doc(db, PROJECT_PREFIX + `brands/${user.brandId}/staff/${user.uid}`);
      await updateDoc(userRef, { name, lastName, storeId });
      console.log("✅ Perfil actualizado correctamente.");
    } catch (error) {
      console.error("❌ Error al actualizar el perfil:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile();
  };

  const selectedStore = stores.find((store) => store.id === storeId);

  useEffect(() => {
    fetchStores();
    fetchUserData();
  }, [user.brandId, user.uid]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="">
        <div className="mt-10 bg-gray-50 dark:bg-gray-50 border-gray rounded-md p-3 ">
          <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">

            <div className="sm:col-span-3">
              <label htmlFor="name" className="block text-xs font-medium">Nombre</label>
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!user.isAdmin}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="lastName" className="block text-xs font-medium">Apellido</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={!user.isAdmin}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="email" className="block text-xs font-medium">Correo electrónico</label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                disabled
                className="bg-white text-gray-500 cursor-not-allowed block w-full rounded-md bg-white px-3 py-1.5 sm:text-sm/6"
              />
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="brand" className="block text-xs font-medium">Marca</label>
              <input
                id="brand"
                name="brand"
                type="brand"
                value={user.brandId}
                disabled
                className="bg-white text-gray-500 cursor-not-allowed block w-full  rounded-md bg-white px-3 py-1.5 sm:text-sm/6"
              />
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="storeId" className="block text-xs font-medium">Local</label>
              <div className="relative">
                <select
                  id="storeId"
                  name="storeId"
                  value={storeId}
                  onChange={(e) => setStoreId(e.target.value)}
                  disabled={!user.isAdmin}
                  className="block w-full appearance-none rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                >
                  {stores.map((store) => (
                    <option key={store.id} value={store.id}>
                      {store.data.address}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon aria-hidden="true" className="absolute right-2 top-2 h-5 w-5 text-gray-400 pointer-events-none"/>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="address" className="block text-xs font-medium">Dirección</label>
              <input
                id="address"
                name="address"
                type="text"
                value={selectedStore?.data.address || ''}
                disabled
                className="bg-white text-gray-500 cursor-not-allowed block w-full  rounded-md bg-white px-3 py-1.5 sm:text-sm/6"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="city" className="block text-xs font-medium">Ciudad</label>
              <input
                id="city"
                name="city"
                type="text"
                value={selectedStore?.data.city || ''}
                disabled
                className="bg-white text-gray-500 cursor-not-allowed block w-full  rounded-md bg-white px-3 py-1.5 sm:text-sm/6"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="region" className="block text-xs font-medium">Región / Provincia</label>
              <input
                id="region"
                name="region"
                type="text"
                value={selectedStore?.data.region || ''}
                disabled
                className="bg-white text-gray-500 cursor-not-allowed block w-full  rounded-md bg-white px-3 py-1.5 sm:text-sm/6"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="zipcode" className="block text-xs font-medium">Código Postal</label>
              <input
                id="zipcode"
                name="zipcode"
                type="text"
                value={selectedStore?.data.zipcode || ''}
                disabled
                className="bg-white text-gray-500 cursor-not-allowed block w-full  rounded-md bg-white px-3 py-1.5 sm:text-sm/6"
              />
            </div>

          </div>
        </div>
      </div>

      {user.isAdmin && (
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" className="text-sm font-semibold text-gray-900">
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

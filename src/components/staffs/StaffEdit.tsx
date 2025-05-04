import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { useEffect, useState } from 'react'
import { AppUser } from '../../types/UserRole'
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { StoreDoc } from "../../types/firestoreSchemas";

interface Props {
  user: AppUser;
}
export const StaffEdit = ({user}:Props) => {

  const [stores, setStores] = useState<{ id: string; data: StoreDoc }[]>([]);
  const fetchStores = async () => {
    const snapshot = await getDocs(collection(db, `brands/${user.brandId}/stores`));
    const storesData = snapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data() as StoreDoc,
    }));
    setStores(storesData);
  };
  
  useEffect(() => {
    fetchStores();
  }, []);




  return (
    <form>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 ">
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">Nombre</label>
              <div className="mt-2">
                <input
                  id="first-name"
                  name="first-name"
                  type="text"
                  value={user.name}
                  disabled={!user.isAdmin}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="lastName" className="block text-sm/6 font-medium text-gray-900">Apellido</label>
              <div className="mt-2">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={user.lastName}
                  disabled={!user.isAdmin}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <hr className='sm:col-span-6 border-b border-gray-900/10'/>

            <div className="sm:col-span-3">
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Correo electrónico</label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={user.email}
                  disabled={!user.isAdmin}
                  className="block rounded-md w-full bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="store" className="block text-sm/6 font-medium text-gray-900">Local</label>
              <div className="mt-2 grid grid-cols-1">
                <select
                  id="store"
                  name="store"
                  autoComplete="store-address"
                  value={user.storeId ? stores.find(store => store.id === user.storeId)?.data.address : ""}
                  disabled={!user.isAdmin}
                  className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                >
                  {stores.map((store) => (
                    <option id={store.id} value={store.data.address}>{store.data.address}</option>
                  ))}
                </select>
                <ChevronDownIcon
                  aria-hidden="true"
                  className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="address" className="block text-sm/6 font-medium text-gray-900">Dirección</label>
              <div className="mt-2">
                <input
                  id="address"
                  name="address"
                  type="text"
                  value={user.storeId ? stores.find(store => store.id === user.storeId)?.data.address : ""}
                  disabled={!user.isAdmin}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="city" className="block text-sm/6 font-medium text-gray-900">Ciudad</label>
              <div className="mt-2">
                <input
                  id="city"
                  name="city"
                  type="text"
                  value={user.storeId ? stores.find(store => store.id === user.storeId)?.data.city : ""}
                  disabled={!user.isAdmin}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="region" className="block text-sm/6 font-medium text-gray-900">Region / Provincia</label>
              <div className="mt-2">
                <input
                  id="region"
                  name="region"
                  type="text"
                  value={user.storeId ? stores.find(store => store.id === user.storeId)?.data.region : ""}
                  disabled={!user.isAdmin}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="zipcode" className="block text-sm/6 font-medium text-gray-900">Código Postal</label>
              <div className="mt-2">
                <input
                  id="zipcode"
                  name="zipcode"
                  type="text"
                  value={user.storeId ? stores.find(store => store.id === user.storeId)?.data.zipcode : ""}
                  disabled={!user.isAdmin}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {user.isAdmin && (
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" className="text-sm/6 font-semibold text-gray-900">
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
        )}
    </form>
  )
}

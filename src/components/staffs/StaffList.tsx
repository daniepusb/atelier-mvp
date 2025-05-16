import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db, PROJECT_PREFIX } from "../../firebaseConfig";
import Table from "../lists/Table";
import { PencilSquareIcon, TrashIcon, EyeIcon, LockClosedIcon } from '@heroicons/react/24/solid';
import { StoreDoc } from "../../types/firestoreSchemas";
import { AppUser } from "../../types/UserRole";
import { ArrowPathIcon, LockOpenIcon } from "@heroicons/react/24/outline";

interface Props {
  user: AppUser,
  onEdit: (uid:string, staff: AppUser) => void
}

export const StaffList = ({user, onEdit }: Props) => {
  const [staffs, setStaffs] = useState<{uid: string, data: AppUser  }[]>([]);
  const [stores, setStores] = useState<{ id: string; data: StoreDoc }[]>([]);

  const fetchStaffs = async () => {
    //console.log("✅ FetchStaffs()")
    const snapshot = await getDocs(collection(db, PROJECT_PREFIX + `brands/${user.brandId}/staff`));
    const docs = snapshot.docs.map((doc) => ({
      uid: doc.id,
      data: doc.data() as AppUser
    }));
    setStaffs(docs);
  };

  const fetchStores = async () => {
    const snapshot = await getDocs(collection(db, PROJECT_PREFIX + `brands/${user.brandId}/stores`));
    const storesData = snapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data() as StoreDoc,
    }));
    setStores(storesData);
  };

  useEffect(() => {
    fetchStores();
    fetchStaffs();
  }, []);


  const renderRow = (item: { uid: string; data: AppUser }) => {
  const { data } = item;
  const  uid =  item.uid;
  return (
    <tr key={uid} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
      <td className="flex items-center gap-4 p-4">
        <div className="flex flex-col">
          <h3 className="font-semibold">{data.name}</h3>
          <p className="text-xs text-gray-500">{data.email}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">
        <div className="flex flex-col">
          <h3 className="font-semibold">{stores.find((store) => store.id === data.storeId)?.data.city}</h3>
          <p className="text-xs text-gray-500">{stores.find((store) => store.id === data.storeId)?.data.address}</p>
        </div>
      </td>
      <td>
        {user.isAdmin && (
          <div className="flex justify-end flex-row">
            {/* Ver */}
            <button
              className="w-7 h-7 flex items-center justify-center rounded-full"
              onClick={() => console.log("Ver", item)}
            >
              <EyeIcon className="w-5 h-5 text-gray-700" />
            </button>

            {/* Bloquear */}
            <button
              className="w-7 h-7 flex items-center justify-center rounded-full"
              onClick={() => console.log("Bloquear", item)}
            >
              {data.isBlocked? <LockClosedIcon className="w-5 h-5 text-yellow-700" /> : <LockOpenIcon className="w-5 h-5 text-yellow-700" /> }
            </button>

            {/* Editar */}
            <button
              className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky"
              onClick={() => onEdit(uid,data)}
            >
              <PencilSquareIcon className="w-5 h-5" />
            </button>

            {/* Eliminar */}
            <button
              className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple"
              onClick={() => onEdit(uid,data)}
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        )}
      </td>
    </tr>
  )};

  const columns = [
    { header: "Información", accessor: "info" },
    { header: "Local", accessor: "store", className: "hidden md:table-cell" },
    { header: "Acciones", accessor: "action", className: "text-right" },
  ];

  return (
    <div className="w-full bg-white p-4 rounded-lg flex-1">
      <div className="flex justify-between items-center">
        <h1 className="hidden md:block text-lg font-semibold">Staff</h1>
        <button onClick={() => fetchStaffs()} >
          <ArrowPathIcon className="h-6 w-6  hover:bg-green-100 hover:border " />
        </button>
      </div>
      <Table columns={columns} renderRow={renderRow} data={staffs} />
    </div>
  );
};

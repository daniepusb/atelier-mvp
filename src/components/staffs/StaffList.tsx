import { useEffect, useState } from "react";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import Table from "../lists/Table";
import { UserRole } from '../../types/UserRole'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import { StoreDoc } from "../../types/firestoreSchemas";

interface Props {
  brandId: string;
  role?: UserRole;
}

type Staff = {
  uid: string;
  brandId: string;
  email: string;
  isAdmin: boolean;
  lastName: string;
  name: string;
  role: UserRole;
  storeId: string;
  createdAt: Timestamp;
  createdBy: string;
  createdByName: string;
};

export const StaffList = ({brandId}: Props) => {
  const [staffs, setStaffs] = useState<any[]>([]);
  const fetchStaffs = async () => {
    const snapshot = await getDocs(collection(db, `brands/${brandId}/staff`));
    const docs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setStaffs(docs);
  };
  const columns = [
    {
      header: "Información",
      accessor: "info",
    },
    {
      header: "Local",
      accessor: "store",
      className: "hidden md:table-cell",
    },
    {
      header: "Acciones",
      accessor: "action",
    }
  ];
  const [stores, setStores] = useState<{ id: string; data: StoreDoc }[]>([]);
  const fetchStores = async () => {
    const snapshot = await getDocs(collection(db, `brands/${brandId}/stores`));
    const storesData = snapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data() as StoreDoc,
    }));
    setStores(storesData);
  };

  useEffect(() => {
    console.log("Fetching stores...");
    fetchStores();
    fetchStaffs();
  }, []);

  const renderRow = (item: Staff) => (
    <tr key={item.uid} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
      <td className="flex items-center gap-4 p-4">
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{item?.email}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">
        <div className="flex flex-col">
          <h3 className="font-semibold">{stores.find((store) => store.id === item.storeId)?.data.city}</h3>
          <p className="text-xs text-gray-500">{stores.find((store) => store.id === item.storeId)?.data.address}</p>
        </div>
      </td>
      <td>
        <div className="flex items-center gap-2">
          <a href="">
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
            <PencilSquareIcon className="w-5 h-5" />
            </button>
          </a>
          <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple">
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      </td>
    </tr>
  );
  return (
    <div className="w-full bg-white p-4 rounded-lg flex-1 m-4 mt-0">
      <div className="flex justify-between items-center">
        <h1 className="hidden md:block text-lg font-semibold">Staff</h1>
      </div>

      <div className="">
        <Table columns={columns} renderRow={renderRow} data={staffs} />
      </div>
    </div>
  );
}

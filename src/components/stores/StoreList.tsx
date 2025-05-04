import { useEffect, useState } from "react";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import Table from "../lists/Table";
import { UserRole } from '../../types/UserRole'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';

interface Props {
  brandId: string;
  role: UserRole;
}

type Store = {
  id: number;
  address: string;
  city: string;
  phone: number;
  region: string;
  zipcode: number
};

export const StoreList = ({brandId, role}: Props) => {
  const [stores, setStores] = useState<any[]>([]);
  const columns = [
    {
      header: "Dirección",
      accessor: "address",
    },
    {
      header: "Telefono",
      accessor: "phone",
      className: "hidden md:table-cell",
    },
    {
      header: "Region",
      accessor: "region",
      className: "hidden md:table-cell",
    },
    {
      header: "Código Postal",
      accessor: "zipcode",
      className: "hidden md:table-cell",
    },
    {
      header: "Acciones",
      accessor: "action",
    }
  ];
  useEffect(() => {
    const fetchStores = async () => {
      const snapshot = await getDocs(collection(db, `brands/${brandId}/stores`));
      const docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStores(docs);
    };

    fetchStores();
  }, [brandId]);

  const renderRow = (item: Store) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
      <td className="flex items-center gap-4 p-4">
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.address}</h3>
          <p className="text-xs text-gray-500">{item?.city}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.phone}</td>
      <td className="hidden md:table-cell">{item.region}</td>
      <td className="hidden md:table-cell">{item.zipcode}</td>
      <td>
        <div className="flex items-center gap-2">
          <a href="">
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
            <PencilSquareIcon className="w-5 h-5" />
            </button>
          </a>
          {UserRole.admin === role  && (
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple">
              <TrashIcon className="w-5 h-5" />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
  return (
    <div className="w-full bg-white p-4 rounded-lg flex-1 m-4 mt-0">
      <div className="flex justify-between items-center">
        <h1 className="hidden md:block text-lg font-semibold">Clientes</h1>
      </div>

      <div className="">
        <Table columns={columns} renderRow={renderRow} data={stores} />
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import Table from "../lists/Table";
import { AppUser, UserRole} from '../../types/UserRole'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';

interface Props {
  user: AppUser;
}

type Dress = {
  id: string;
  name: string;
  price: number;
};

export const DressList = ({user}: Props) => {
  const [dresses, setDresses] = useState<any[]>([]);
  const columns = [
    {
      header: "Información",
      accessor: "info",
    },
    {
      header: "Precio",
      accessor: "price",
      className: "hidden md:table-cell",
    },
    {
      header: "Acciones",
      accessor: "action",
      className: "text-right",
    }
  ];
  useEffect(() => {
    const fetchDresses = async () => {
      const snapshot = await getDocs(collection(db, `brands/${user.brandId}/items`));
      const docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDresses(docs);
    };

    fetchDresses();
  }, [user.brandId]);

  const renderRow = (item: Dress) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
      <td className="flex items-center p-4">
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500"></p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.price}</td>
      <td>
        <div className="flex justify-end flex-row gap-2">
          <a href="">
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
            <PencilSquareIcon className="w-5 h-5" />
            </button>
          </a>
          {UserRole.admin === user.role  && (
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple">
              <TrashIcon className="w-5 h-5" />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
  return (
    <div className="w-full bg-white p-4 rounded-lg flex-1">
      <div className="flex justify-between items-center">
        <h1 className="hidden md:block text-lg font-semibold">Prendas</h1>
      </div>

      <div className="">
        <Table columns={columns} renderRow={renderRow} data={dresses} />
      </div>
    </div>
  );
}

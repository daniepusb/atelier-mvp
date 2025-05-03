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

type Client = {
  id: number;
  name: string;
  email: string;
  phone: string;
  createdBy: string;
  createdByTempName: string; //TODO
  createdAt: Timestamp;
};

export const ClientList = ({brandId, role}: Props) => {
  const [clients, setClients] = useState<any[]>([]);
  const columns = [
    {
      header: "Información",
      accessor: "info",
    },
    {
      header: "Telefono",
      accessor: "phone",
      className: "hidden md:table-cell",
    },
    {
      header: "Registrada",
      accessor: "registeredBy",
      className: "hidden md:table-cell",
    },
    {
      header: "Acciones",
      accessor: "action",
    }
  ];
  useEffect(() => {
    const fetchClients = async () => {
      const snapshot = await getDocs(collection(db, `brands/${brandId}/clients`));
      const docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setClients(docs);
    };

    fetchClients();
  }, [brandId]);

  const renderRow = (item: Client) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
      <td className="flex items-center gap-4 p-4">
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{item?.email}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.phone}</td>
      <td className="flex items-center hidden md:table-cell">
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.createdByTempName}</h3>
          <p className="text-xs text-gray-500">
            {item.createdAt && item.createdAt.toDate().toLocaleDateString("es-MX", { year: "numeric", month: "2-digit", day: "2-digit" })}{" "}

            </p>
        </div>
      </td>
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
        <Table columns={columns} renderRow={renderRow} data={clients} />
      </div>
    </div>
  );
}

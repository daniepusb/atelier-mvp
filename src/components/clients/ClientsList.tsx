import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db, PROJECT_PREFIX } from "../../firebaseConfig";
import Table from "../lists/Table";
import { AppUser } from '../../types/UserRole'
import { PencilSquareIcon, TrashIcon, DocumentCurrencyEuroIcon } from '@heroicons/react/24/solid';
import { ClientDoc } from "../../types/firestoreSchemas";

interface Props {
  user: AppUser,
  onEdit: (id:string, client: ClientDoc) => void
  onQuote: (id:string, client:ClientDoc) => void
}

export const ClientsList = ({ user, onEdit, onQuote }: Props) => {
  const [clients, setClients] = useState<{ id:string; data:ClientDoc }[]>([]);

  const fetchClients = async () => {
    const snapshot = await getDocs(collection(db, PROJECT_PREFIX + `brands/${user.brandId}/clients`));
    const docs = snapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data() as ClientDoc,
    }));
    setClients(docs);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const renderRow = (item: {id:string, data:ClientDoc}) => {
    const { data } = item;
    const  id =  item.id;
    return (
      <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
        <td className="flex items-center gap-4 p-4">
          <div className="flex flex-col">
            <h3 className="font-semibold">{data.name}</h3>
            <p className="text-xs text-gray-500">{data.email}</p>
          </div>
        </td>
        <td className="hidden md:table-cell">{data.phone}</td>
        <td className="flex items-center hidden md:table-cell">
          <div className="flex flex-col">
            <h3 className="font-semibold">{data.createdByTempName}</h3>
            <p className="text-xs text-gray-500">
              {data.createdAt && data.createdAt.toDate().toLocaleDateString("es-MX", { year: "numeric", month: "2-digit", day: "2-digit" })}{" "}

            </p>
          </div>
        </td>
        <td>
          <div className="flex justify-end flex-row gap-2">
            <button
              onClick={() => onQuote(id, data)}
              className="w-7 h-7 flex items-center justify-center rounded-full bg-emerald-500 text-white"
              title="👀 Ver presupuestos"
            >
              <DocumentCurrencyEuroIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => onEdit(id, data)}
              className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky"
              title="📝 Editar cliente"
            >
              <PencilSquareIcon className="w-5 h-5" />
            </button>
            {user.isAdmin && (
              <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple">
                <TrashIcon className="w-5 h-5" title="❌Elimnar cliente"/>
              </button>
            )}
          </div>
        </td>
      </tr>
    )
  };
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
      className: "text-right",
    }
  ];

  return (
    <div className="w-full bg-white p-4 rounded-lg flex-1">
      <div className="flex justify-between items-center">
        <h1 className="hidden md:block text-lg font-semibold">Clientes</h1>
      </div>

      <div className="">
        <Table columns={columns} renderRow={renderRow} data={clients} />
      </div>
    </div>
  );
}

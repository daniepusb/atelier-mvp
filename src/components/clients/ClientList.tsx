import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";

interface Props {
  brandId: string;
}

export const ClientList = ({ brandId }: Props) => {
  const [clients, setClients] = useState<any[]>([]);

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

  return (
    <div className="mt-6">
      <h3 className="font-bold text-lg mb-2">Clientes Registrados</h3>
      <ul className="space-y-3">
        {clients.map((client) => (
          <li key={client.id} className="border rounded p-3">
            <div className="font-medium">{client.name}</div>
            {client.email && <div className="text-sm text-gray-500">{client.email}</div>}
            <div className="text-sm text-gray-700">
              Medidas: {Object.entries(client.measurements).map(([k, v]) => `${k}: ${v}`).join(", ")}
            </div>
            {client.photos?.length > 0 && (
              <div className="flex gap-2 mt-2">
                {client.photos.map((url: string, idx: number) => (
                  <img
                    key={idx}
                    src={url}
                    alt="Foto cliente"
                    className="w-16 h-16 object-cover rounded"
                  />
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

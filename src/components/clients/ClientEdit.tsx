import { useEffect, useState } from 'react';
import { AppUser } from '../../types/UserRole';
import { doc, getDoc, updateDoc} from 'firebase/firestore';
import { db, PROJECT_PREFIX } from '../../firebaseConfig';
import { ClientDoc } from '../../types/firestoreSchemas';

interface Props {
  user: AppUser,
  selectedClient: {id:string, client:ClientDoc}
  onBack: () => void;
}

export const ClientEdit = ({ user, selectedClient, onBack }: Props) => {
  
  const [name, setName] = useState(selectedClient.client.name);
  const [phone, setPhone] = useState(selectedClient.client.phone);
  const [email, setEmail] = useState(selectedClient.client.email);
  const [measurements, setMeasurements] = useState(selectedClient.client.measurements);
  const photos    = selectedClient.client.photos;
  const createdAt = selectedClient.client.createdAt;
  const createdByTempName =  selectedClient.client.createdByTempName;
  const [isLoading, setIsLoading] = useState(false);


  const fetchClientData = async () => {
    const userRef = doc(db, PROJECT_PREFIX + `brands/${user.brandId}/clients/${selectedClient.id}`);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const data = userSnap.data() as ClientDoc;
      setName(data.name),
      setPhone(data.phone) ,
      setEmail(data.email),
      setMeasurements(data.measurements)
    }
  };

  const updateClient = async () => {
    setIsLoading(true);
    try {
      const userRef = doc(db, PROJECT_PREFIX + `brands/${user.brandId}/clients/${selectedClient.id}`);
      await updateDoc(userRef, { name, phone, measurements });
      onBack();
      console.log("✅ Perfil actualizado correctamente.");
    } catch (error) {
      console.error("❌ Error al actualizar el perfil:", error);
    } finally {
      setIsLoading(false);
    }
    
  };

  const handleMeasurementChange = (key: string, value: number) => {
    setMeasurements(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateClient();
  };

  useEffect(() => {
    fetchClientData();
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
              <label htmlFor="phone" className="block text-xs font-medium">Telefono</label>
              <input
                id="phone"
                name="phone"
                type='number'
                value={phone}
                onChange={(e) => setPhone(e.target.valueAsNumber)}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>

            <div className="sm:col-span-3 md:col-span-6">
              <label htmlFor="email" className="block text-xs font-medium">Correo electrónico</label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>

            <div className="sm:col-span-3 md:col-span-3">
              <label htmlFor="measurements" className="block text-xs font-medium">Medidas</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(measurements).sort().map(([key, value]) => (
                  <div key={key} className="sm:col-span-3 md:col-span-3">
                    <label className="text-xs capitalize mb-1">
                      {key.replaceAll("_", " ").replace(/ +/g, " ")}
                    </label>
                    <input
                      type="number"
                      value={value}
                      step="0.1"
                      onChange={(e) => handleMeasurementChange(key, parseFloat(e.target.value))}
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                ))}
              </div>

            </div>

            <div className="sm:col-span-3 md:col-span-6">
              <label htmlFor="photos" className="block text-xs font-medium">Fotos</label>
              <div className="flex flex-wrap gap-4">
                {photos.map((url, idx) => (
                  <img
                    key={idx}
                    src={url}
                    alt={`Foto ${idx + 1}`}
                    className="w-32 h-32 object-cover rounded border"
                  />
                ))}
              </div>
            </div>
            
            <div className="sm:col-span-3">
              <label htmlFor="createdAt" className="block text-xs font-medium">Registrado el</label>
              <input
                id="createdAt"
                name="createdAt"
                type="date"
                value={createdAt.toDate().toISOString().split("T")[0]}
                disabled
                className="bg-white text-gray-500 cursor-not-allowed block w-full rounded-md bg-white px-3 py-1.5 sm:text-sm/6"
              />
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="createdBy" className="block text-xs font-medium">Registrado por</label>
              <input
                id="createdBy"
                name="createdBy"
                type="text"
                value={createdByTempName}
                disabled
                className="bg-white text-gray-500 cursor-not-allowed block w-full rounded-md bg-white px-3 py-1.5 sm:text-sm/6"
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

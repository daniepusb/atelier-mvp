import { useState } from "react";
import { db, storage } from "../../firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

interface Props {
  brandId: string;
  userId: string; // trabajador actual
}

export const ClientForm = ({ brandId, userId }: Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [measurements, setMeasurements] = useState<Record<string, number>>({});
  const [files, setFiles] = useState<FileList | null>(null);

  const handleMeasurementChange = (field: string, value: number) => {
    setMeasurements((prev) => ({ ...prev, [field]: value }));
  };

  const uploadPhotos = async (): Promise<string[]> => {
    if (!files) return [];

    const urls: string[] = [];

    for (let i = 0; i < Math.min(files.length, 5); i++) {
      const file = files[i];
      const storageRef = ref(storage, `clients/${userId}/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      urls.push(url);
    }

    return urls;
  };

  const handleSubmit = async () => {
    if (!name) return alert("Falta nombre");

    const photoUrls = await uploadPhotos();

    await addDoc(collection(db, `brands/${brandId}/clients`), {
      name,
      email,
      measurements,
      photos: photoUrls,
      createdAt: Timestamp.now(),
      createdBy: userId,
    });

    setName("");
    setEmail("");
    setFiles(null);
    setMeasurements({});
    alert("Cliente creado correctamente");
  };

  return (
    <div className="p-4 border rounded-xl shadow-sm space-y-4">
      <h2 className="text-lg font-semibold">Registrar Cliente</h2>
      <input
        className="border p-2 w-full"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="border p-2 w-full"
        placeholder="Email (opcional)"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <div className="grid grid-cols-2 gap-2">
        {["busto", "cintura", "pecho", "cuello", "brazos", "piernas"].map((field) => (
          <input
            key={field}
            type="number"
            placeholder={field}
            className="border p-2"
            onChange={(e) => handleMeasurementChange(field, Number(e.target.value))}
          />
        ))}
      </div>

      <input
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => setFiles(e.target.files)}
      />

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Guardar Cliente
      </button>
    </div>
  );
};

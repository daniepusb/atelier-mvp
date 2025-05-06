import { ClientDoc } from "../../../types/firestoreSchemas";

interface Props {
  selectedClient: ClientDoc;
  onConfirm: () => void;
}

export const BudgetStep2 = ({ selectedClient, onConfirm }: Props) => {
  if (!selectedClient) return null;

  return (
    <fieldset>
      <legend className="text-lg font-semibold">Confirmar información</legend>
      <div className="space-y-2 border p-3 rounded-md bg-gray-50">
        <p className="font-semibold">Datos del cliente:</p>
        <p><strong>Nombre:</strong> {selectedClient.name}</p>
        <p><strong>Email:</strong> {selectedClient.email}</p>
        <p className="font-semibold">Medidas:</p>
        {Array.isArray(selectedClient.measurements) &&
          selectedClient.measurements.map((m: string, idx: number) => (
            <p key={idx}>• {m}</p>
        ))}
        <p className="font-semibold">Fotos:</p>
        <div className="flex gap-2 flex-wrap">
          {selectedClient.photos?.map((url: string, idx: number) => (
            <img key={idx} src={url} alt={`Foto ${idx + 1}`} className="h-20 w-20 object-cover rounded" />
          ))}
        </div>
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded mt-2"
          onClick={onConfirm}
        >
          Continuar
        </button>
      </div>
    </fieldset>
  );
};

import { db } from "../../firebaseConfig";
import { doc as docFIrebase, getDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ClientDoc, StoreDoc } from "../../types/firestoreSchemas";
import { AppUser } from "../../types/UserRole";
import { generateBudgetPDF } from "../../utils/pdfUtils";


interface Props {
  client: ClientDoc;
  item: any;
  tasks: any[];
  user: AppUser;
}
export const BudgetSummary = ({ client, item, tasks, user }: Props) => {
  if (!client || !item ) {
    return <div className="p-4 border mt-4 rounded-lg bg-gray-50 text-gray-500">Faltan datos para mostrar el resumen.</div>;
  }

  const total = Number(item.price) + tasks.reduce((sum, t) => sum + Number(t.price), 0);

  const saveQuote = async () => {
    const quote = {
      clientId: client.id,
      clientName: client.name,
      item: {
        id: item.id,
        name: item.name,
        price: Number(item.price),
      },
      tasks: tasks.map((t) => ({
        id: t.id,
        name: t.name,
        price: Number(t.price),
      })),
      total,
      createdBy: user.uid,
      createdAt: serverTimestamp(),
    };

    await addDoc(collection(db, `brands/${user.brandId}/quotes`), quote);
    console.log("Presupuesto guardado ✅");
  };

  const downloadPDF = async () => {
    await saveQuote();
  
    const storeRef = docFIrebase(db, `brands/${user.brandId}/stores/${user.storeId}`);
    const storeSnap = await getDoc(storeRef);
    if (!storeSnap.exists()) {
      alert("No se encontró la tienda.");
      return;
    }
    const store = storeSnap.data() as StoreDoc;
  
    await generateBudgetPDF(client, item, tasks, store, user);
  };
  
  
  

  return (
    <div className="p-4 border mt-4 rounded-lg space-y-2 bg-gray-50">
      <h1 className="font-semibold text-lg">Resumen</h1>
      <p role="contentClientNameInfo"><strong>Cliente:</strong> {client.name}</p>
      <p role="contentDressNameInfo"><strong>Prenda:</strong> {item.name} (€{item.price})</p>
      <p role="contentTasksInfo"><strong>Modificaciones:</strong></p>
      <ul className="list-disc list-inside">
        {tasks.map((task) => (
          <li key={task.id}>
            {task.name} (€{task.price})
          </li>
        ))}
      </ul>
      <span role="contentTotalInfo"><strong>Total:</strong> €{total}</span>

      <div className="flex gap-2 mt-4">
        <button onClick={saveQuote} className="bg-green-600 text-white px-4 py-2 rounded">Guardar</button>
        <button onClick={downloadPDF} className="bg-blue-600 text-white px-4 py-2 rounded">Descargar PDF</button>
      </div>
    </div>
  );
};
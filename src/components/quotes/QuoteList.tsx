import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db, PROJECT_PREFIX} from "../../firebaseConfig";
import { AppUser } from "../../types/UserRole";
import { ClientDoc, QuoteDoc, StoreDoc } from "../../types/firestoreSchemas";
import { generateBudgetPDF } from "../../utils/pdfUtils";

interface Props {
  user: AppUser,
  selectedQuoteClient: {id:string, client:ClientDoc}
  onBack: () => void;
}
export const QuoteList = ({ user, selectedQuoteClient, onBack  }: Props) => {
  const [quotes, setQuotes] = useState<{ id:string; data:QuoteDoc }[]>([]);
  const [store, setStore] = useState<StoreDoc>();
  
  const fetchStore = async () => {
    const docRef = doc(db, PROJECT_PREFIX + `brands/${user.brandId}/stores/${user.storeId}`);
    const storeSnap = await getDoc(docRef);
    if (storeSnap.exists()) {
      const data = storeSnap.data() as StoreDoc;
      setStore(data);
    }
  };

  const fetchQuotes = async () => {
    const queryWithFilter= query( collection(db, PROJECT_PREFIX + `brands/${user.brandId}/quotes`)
      ,where("clientId", "==", selectedQuoteClient.id)
    );
    const snapshot = await getDocs(queryWithFilter);
    const docs = snapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data() as QuoteDoc,
    }));
    setQuotes(docs);
  };
  
  const downloadPDF = async (quote:QuoteDoc) => {
    //await generateBudgetPDF(client, item, tasks, store);
    if (!store) {
      alert("La información de la tienda aún no está disponible.");
      return;
    }
    generateBudgetPDF(selectedQuoteClient.client, quote.item, quote.tasks, store);
  };
  
  useEffect(() => {
    fetchStore();
    fetchQuotes();
  }, []);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-2">Historial de Presupuestos</h2>
      <ul className="space-y-2">
        {quotes.map((q) => (
          <div key={q.id} className="bg-white dark:bg-gray-900 shadow rounded-lg p-4 mt-5 flex items-center space-x-4">
            <div className="text-indigo-500 dark:text-indigo-400">
              <button  onClick={() => downloadPDF(q.data)} className="bg-blue-600 text-white px-4 py-2 rounded">
                Descargar PDF
              </button>
            </div>
            <div>
              <p className="text-xl font-semibold text-gray-800 dark:text-white"><strong>TOTAL:</strong> €{q.data.total}</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm"><strong>creado el:</strong> {q.data.createdAt.toDate().toLocaleDateString("es-ES", { year: "numeric", month: "2-digit", day: "2-digit", hour:"2-digit", minute: "2-digit" })}</p>
            </div>
          </div>
        ))}
      </ul>
      <button onClick={onBack} type="button" className="text-sm font-semibold text-gray-900" >
        Cancelar
      </button>
    </div>
    
  );
};


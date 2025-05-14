import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db, PROJECT_PREFIX} from "../../firebaseConfig";

export const QuoteList = ({ brandId, userId }: { brandId: string; userId: string }) => {
  const [quotes, setQuotes] = useState<any[]>([]);

  useEffect(() => {
    const fetchQuotes = async () => {
      const q = query(
        collection(db, PROJECT_PREFIX+`brands/${brandId}/quotes`),
        where("createdBy", "==", userId)
      );
      const snap = await getDocs(q);
      setQuotes(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    fetchQuotes();
  }, [brandId, userId]);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-2">Historial de Presupuestos</h2>
      <ul className="space-y-2">
        {quotes.map((q) => (
          <li key={q.id} className="p-2 border rounded shadow-sm">
            Cliente: <strong>{q.clientName}</strong><br />
            Vestido: {q.item.name} (€{q.item.price})<br />
            Total: €{q.total}
          </li>
        ))}
      </ul>
    </div>
  );
};

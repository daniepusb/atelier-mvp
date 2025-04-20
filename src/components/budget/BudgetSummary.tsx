import { db } from "../../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { jsPDF } from "jspdf";

interface Props {
  client: any;
  item: any;
  tasks: any[];
  brandId: string;
  userId: string;
}

export const BudgetSummary = ({ client, item, tasks, brandId, userId }: Props) => {
  const total =
    Number(item.price) + tasks.reduce((sum, t) => sum + Number(t.price), 0);

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
      createdBy: userId,
      createdAt: serverTimestamp(),
    };

    await addDoc(collection(db, `brands/${brandId}/quotes`), quote);
    alert("Presupuesto guardado ✅");
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Presupuesto", 20, 20);
    doc.setFontSize(12);
    doc.text(`Cliente: ${client.name}`, 20, 30);
    doc.text(`Vestido: ${item.name} - €${item.price}`, 20, 40);

    tasks.forEach((task, idx) => {
      doc.text(`Tarea ${idx + 1}: ${task.name} - €${task.price}`, 20, 50 + idx * 10);
    });

    doc.text(`Total: €${total}`, 20, 60 + tasks.length * 10);
    doc.save(`presupuesto_${client.name}.pdf`);
  };

  return (
    <div className="p-4 border mt-4 rounded-lg space-y-2 bg-gray-50">
      <h3 className="font-semibold text-lg">Resumen</h3>
      <span role="contentClientNameInfo"><strong>Cliente:</strong> {client.name}</span>
      <span role="contentDressNameInfo"><strong>Vestido:</strong> {item.name} (€{item.price})</span>
      <span role="contentTasksInfo"><strong>Tareas:</strong></span>
      <ul className="list-disc list-inside">
        {tasks.map((task) => (
          <li key={task.id}>
            {task.name} (€{task.price})
          </li>
        ))}
      </ul>
      <span role="contentTotalInfo"><strong>Total:</strong> €{total}</span>

      <div className="flex gap-2 mt-4">
        <button onClick={saveQuote} className="bg-green-600 text-white px-4 py-2 rounded">
          Guardar
        </button>
        <button onClick={downloadPDF} className="bg-blue-600 text-white px-4 py-2 rounded">
          Descargar PDF
        </button>
      </div>
    </div>
  );
};

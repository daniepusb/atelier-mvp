import { jsPDF } from "jspdf";

interface Props {
  client: any;
  item: any;
  tasks: any[];
}

export const BudgetSummary = ({ client, item, tasks }: Props) => {
  const total =
    Number(item.price) + tasks.reduce((sum, t) => sum + Number(t.price), 0);

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
      <p><strong>Cliente:</strong> {client.name}</p>
      <p><strong>Vestido:</strong> {item.name} (€{item.price})</p>
      <p><strong>Tareas:</strong></p>
      <ul className="list-disc list-inside">
        {tasks.map((task) => (
          <li key={task.id}>
            {task.name} (€{task.price})
          </li>
        ))}
      </ul>
      <p><strong>Total:</strong> €{total}</p>

      <button
        onClick={downloadPDF}
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Descargar PDF
      </button>
    </div>
  );
};

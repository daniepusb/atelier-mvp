import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { ClientDoc, StoreDoc } from "../types/firestoreSchemas";

import LOGO from "../assets/logo.png";

interface Task {
  id: string;
  name: string;
  price: number;
}

interface Item {
  id: string;
  name: string;
  price: number;
}

export const generateBudgetPDF = async (
  client: ClientDoc,
  item: Item,
  tasks: Task[],
  store: StoreDoc,
  //user: AppUser
) => {
  const doc = new jsPDF();
  const logoImg = new Image();
  logoImg.src = LOGO;
  const marginLeft = 20;
  const lineHeight = 10; 
  doc.addImage(logoImg, "PNG", marginLeft, lineHeight*1, 10, 10);

  doc.setFont("Helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(30, 30, 30);
  doc.text("PRESUPUESTO", marginLeft, lineHeight*3);

  doc.setFontSize(12);
  doc.setFont("Helvetica", "normal");
  doc.setTextColor(50, 50, 50);
  doc.text(`Fecha: ${new Date().toLocaleDateString()}`, marginLeft, lineHeight*4);
  doc.text(`Cliente: ${client.name}  ${client.phone}  ${client.email} `, 20, lineHeight*5);
  doc.text(`Prenda: ${item.name} - €${item.price}`, marginLeft, lineHeight*6);

  // Modificaciones
  const taskRows = tasks.map((t) => [t.name, `€${t.price.toFixed(2)}`]);

  autoTable(doc, {
    startY: 70,
    margin: { left: marginLeft },
    head: [["Modificación", "Precio"]],
    body: taskRows,
    theme: "grid",
    styles: {
      fontSize: 11,
    },
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: 255,
    },
  });

  const total = Number(item.price) + tasks.reduce((sum, t) => sum + Number(t.price), 0);
  const totalY = lineHeight*8 + tasks.length * 10;
  //const finalY = doc.table.length || 80;

  doc.setFontSize(14);
  doc.setTextColor(20, 20, 20);
  doc.text(`Total: €${total.toFixed(2)}`, marginLeft, totalY + 15);

  // Footer
  doc.setFontSize(10);
  doc.setTextColor(120, 120, 120);
  doc.line(20, 280, 190, 280);
  doc.text(`Local: ${store.address}`, marginLeft, 285);
  doc.text(`Ciudad: ${store.city}`, 90, 285);
  doc.text(`Telefono: ${store.phone}`, 150, 285);

  doc.save(`presupuesto_${client.name}.pdf`);
};



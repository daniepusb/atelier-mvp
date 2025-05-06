import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { BudgetStep1 } from "./steps/Step1_SelectClient";
import { BudgetStep2 } from "./steps/Step2_ConfirmClient";
import { BudgetStep3 } from "./steps/Step3_SelectItem";
import { BudgetStep4 } from "./steps/Step4_SelectTasks";
import { ClientDoc } from "../../types/firestoreSchemas";

interface Props {
  brandId: string;
  userId: string;
  step: number;
  setStep: (step: number) => void;
  selectedClient: ClientDoc;
  setSelectedClient: (client: ClientDoc) => void;
  selectedItem: string;
  setSelectedItem: (item: string) => void;
}

export const BudgetForm = ({
  brandId,
  userId,
  step,
  setStep,
  selectedClient,
  setSelectedClient,
  selectedItem,
  setSelectedItem,
}: Props) => {
  const [clients, setClients] = useState<any[]>([]);
  const [items, setItems] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [clientsSnap, itemsSnap, tasksSnap] = await Promise.all([
        getDocs(collection(db, `brands/${brandId}/clients`)),
        getDocs(collection(db, `brands/${brandId}/items`)),
        getDocs(collection(db, `brands/${brandId}/tasks`)),
      ]);
      setClients(clientsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setItems(itemsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setTasks(tasksSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchData();
  }, [brandId]);

  return (
    <div className="p-4 mt-10 space-y-6">
      {step === 1 && (
        <BudgetStep1
          clients={clients}
          selectedClient={selectedClient}
          setSelectedClient={(client) => {
            setSelectedClient(client);
            setStep(2);
          }}
        />
      )}
      {step === 2 && (
        <BudgetStep2
          selectedClient={selectedClient}
          onConfirm={() => setStep(3)}
        />
      )}
      {step === 3 && (
        <BudgetStep3
          items={items}
          selectedItem={selectedItem}
          setSelectedItem={(itemId) => {
            setSelectedItem(itemId);
            setStep(4);
          }}
        />
      )}
      {step === 4 && (
        <BudgetStep4
          tasks={tasks}
          selectedTasks={selectedTasks}
          setSelectedTasks={setSelectedTasks}
          selectedItem={items.find(i => i.id === selectedItem)}
          selectedClient={selectedClient}
          brandId={brandId}
          userId={userId}
        />
      )}
    </div>
  );
};

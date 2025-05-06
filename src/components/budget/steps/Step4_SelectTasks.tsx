// components/budget/steps/Step4_SelectTasks.tsx
import { BudgetSummary } from "../BudgetSummary";
import { ClientDoc } from "../../../types/firestoreSchemas";

interface Props {
  tasks: { id: string; name: string; price: number }[];
  selectedTasks: string[];
  setSelectedTasks: React.Dispatch<React.SetStateAction<string[]>>;
  selectedItem: { id: string; name: string; price: number } | undefined;
  selectedClient: ClientDoc;
  brandId: string;
  userId: string;
}

export const BudgetStep4 = ({
  tasks,
  selectedTasks,
  setSelectedTasks,
  selectedItem,
  selectedClient,
  brandId,
  userId,
}: Props) => {
    const toggleTask = (taskId: string) => {
        setSelectedTasks((prev: string[]) =>
            prev.includes(taskId)
            ? prev.filter((id: string) => id !== taskId)
            : [...prev, taskId]
        );
    };
      

  return (
    <fieldset>
      <legend className="text-lg font-semibold">Seleccionar modificaciones</legend>
      <div className="space-y-2">
        {tasks.map((task) => (
          <label key={task.id} className="flex gap-2 items-center">
            <input
              type="checkbox"
              checked={selectedTasks.includes(task.id)}
              onChange={() => toggleTask(task.id)}
            />
            {task.name} - €{task.price}
          </label>
        ))}
      </div>

      <div className="mt-4">
        <BudgetSummary
          client={selectedClient}
          item={selectedItem}
          tasks={tasks.filter((t) => selectedTasks.includes(t.id))}
          brandId={brandId}
          userId={userId}
        />
      </div>
    </fieldset>
  );
};

import { useState } from "react";
import { ItemsList } from "../../components/items/ItemsList";
import { TasksList } from "../../components/tasks/TasksList";
import { ItemEdit } from "../../components/items/ItemEdit";
import { TaskEdit } from "../../components/tasks/TaskEdit";
import { ItemDoc, TaskDoc } from "../../types/firestoreSchemas";
import { AppUser } from "../../types/UserRole";

interface Props {
  user: AppUser;
}

export const ItemsSection = ({user}: Props) => {
  const [selectedItem, setSelectedItem] = useState<{id:string, item:ItemDoc} | null>(null);
  const [selectedTask, setSelectedTask] = useState<{id:string, task:TaskDoc} | null>(null);

return (
    <>
      {!selectedItem && !selectedTask && (
        <>
          <ItemsList user={user} onEdit={(id, item) => setSelectedItem({ id, item })} />
          <TasksList user={user} onEdit={(id, task) => setSelectedTask({ id, task })} />
        </>
      )}

      {selectedItem && (
        <ItemEdit user={user} selectedItem={selectedItem} onBack={() => setSelectedItem(null)} />
      )}

      {selectedTask && (
        <TaskEdit user={user} selectedTask={selectedTask} onBack={() => setSelectedTask(null)} />
      )}
    </>
  );
};
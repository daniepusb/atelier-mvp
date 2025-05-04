import { DressList } from "../../components/dresses/DressList";
import { TaskList } from "../../components/tasks/TaskList";
import { AppUser } from "../../types/UserRole";

interface Props {
  user: AppUser;
}

export const DressSection = ({user}: Props) => (
  <>
    <DressList user={user} />
    <TaskList user={user} />
  </>
);

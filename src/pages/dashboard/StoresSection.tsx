import { StoreList } from "../../components/stores/StoreList";
import { AppUser } from "../../types/UserRole";

interface Props {
  user: AppUser
}

export const StoresSection = ( user : Props) => (
  <>
    <StoreList user={user.user} />
  </>
);

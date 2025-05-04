import { StoreList } from "../../components/stores/StoreList";
import { UserRole } from "../../types/UserRole";

interface Props {
  brandId: string;
  role: UserRole;
}

export const StoresSection = ({ brandId, role }: Props) => (
  <>
    <StoreList brandId={brandId} role={role} />
  </>
);

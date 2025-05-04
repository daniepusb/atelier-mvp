import { StoreList } from "../../components/stores/StoreList";
import { UserRole } from "../../types/UserRole";

interface Props {
  brandId: string;
  role: UserRole;
}

export const StoresSection = ({ brandId, role }: Props) => (
  <div className="space-y-4">
    <StoreList brandId={brandId} role={role} />
  </div>
);

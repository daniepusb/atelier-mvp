import { ClientList } from "../../components/clients/ClientList";
import { UserRole } from '../../types/UserRole'

interface Props {
  brandId: string;
  role: UserRole;
}

export const ClientsSection = ({brandId, role}: Props ) => (
  <>
    <ClientList brandId={brandId} role={role}/>
  </>
);

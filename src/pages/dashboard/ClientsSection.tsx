import { ClientForm } from "../../components/clients/ClientForm";
import { ClientList } from "../../components/clients/ClientList";
import { UserRole } from "../../types/UserRole";

export const ClientsSection = ({
  brandId,
  userId,
  role,
}: {
  brandId: string;
  userId: string;
  role: UserRole;
}) => (
  <>
    {role === UserRole.trabajador && (
      <ClientForm brandId={brandId} userId={userId} />
    )}

    <ClientList brandId={brandId} userId={userId}/>
  </>
);

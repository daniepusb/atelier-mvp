import { useState } from "react";
import { ClientsList } from "../../components/clients/ClientsList";
import { ClientEdit } from "../../components/clients/ClientEdit";
import { AppUser } from '../../types/UserRole'
import { ClientDoc } from "../../types/firestoreSchemas";

interface Props {
  user: AppUser;
}

export const ClientsSection = ({user}: Props ) => {
  const [selectedClient, setSelectedClient] = useState<{id:string, client:ClientDoc} | null>(null);
 
  return (
    <>
      {selectedClient ? (
        <ClientEdit user={user} selectedClient={selectedClient} onBack={() => setSelectedClient(null)} />
      ) : (
        <>
          <ClientsList user={user} onEdit={(id,client) => setSelectedClient({id,client})} />
        </>
      )}
    </>
  );
};

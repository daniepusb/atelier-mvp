import { useState } from "react";
import { ClientList } from "../../components/clients/ClientList";
import { ClientEdit } from "../../components/clients/ClientEdit";
import { AppUser } from '../../types/UserRole'
import { ClientDoc } from "../../types/firestoreSchemas";


export const ClientsSection = ({user}: { user: AppUser } ) => {
  const [selectedClient, setSelectedClient] = useState<{id:string, client:ClientDoc} | null>(null);
 
  return (
    <>
      {selectedClient ? (
        <ClientEdit user={user} selectedClient={selectedClient} onBack={() => setSelectedClient(null)} />
      ) : (
        <>
          <ClientList user={user} onEdit={(id,client) => setSelectedClient({id,client})} />
        </>
      )}
    </>
  );
};

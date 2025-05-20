import { useState } from "react";
import { ClientsList } from "../../components/clients/ClientsList";
import { ClientEdit } from "../../components/clients/ClientEdit";
import { AppUser } from '../../types/UserRole'
import { ClientDoc } from "../../types/firestoreSchemas";
import { QuoteList } from "../../components/quotes/QuoteList";

interface Props {
  user: AppUser;
}

export const ClientsSection = ({user}: Props ) => {
  const [selectedClient, setSelectedClient] = useState<{id:string, client:ClientDoc} | null>(null);
  const [selectedQuoteClient, setSelectedQuoteClient] = useState<{id:string, client:ClientDoc} | null>(null);
 
  return (
    <>
      {!selectedClient && !selectedQuoteClient && (
        <>
          <ClientsList user={user} onEdit={(id,client) => setSelectedClient({id,client})} onQuote={(id, client) => setSelectedQuoteClient({id,client})} />
        </>
      )}

      {selectedClient && (
        <ClientEdit user={user} selectedClient={selectedClient} onBack={() => setSelectedClient(null)} />
      )}

      {selectedQuoteClient && (
        <QuoteList user={user} selectedQuoteClient={selectedQuoteClient} onBack={() => setSelectedQuoteClient(null)} />
      )}

    </>
  );
};

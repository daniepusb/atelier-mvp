import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { ClientDoc } from "../../../types/firestoreSchemas";

interface Props {
  clients: ClientDoc[];
  selectedClient: ClientDoc;
  setSelectedClient: (client: ClientDoc) => void;
}

export const BudgetStep1 = ({ clients, selectedClient, setSelectedClient }: Props) => {
  return (
    <fieldset>
      <legend className="text-lg font-semibold">Seleccionar cliente</legend>
      <Listbox value={selectedClient} onChange={setSelectedClient}>
        <div className="relative mt-2">
          <ListboxButton className="relative w-full cursor-pointer rounded-md bg-white py-2 pl-3 pr-10 text-left shadow-md">
            <span className="block truncate">{selectedClient?.name || "Seleccionar Cliente"}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
            </span>
          </ListboxButton>
          <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 sm:text-sm">
            {clients.map((client) => (
              <ListboxOption
                key={client.id}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? "bg-indigo-600 text-white" : "text-gray-900"}`
                }
                value={client}
              >
                {({ selected }) => (
                  <>
                    <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                      {client.name}
                    </span>
                    {selected && (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                        <CheckIcon className="h-5 w-5" />
                      </span>
                    )}
                  </>
                )}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
    </fieldset>
  );
};

// components/budget/steps/Step3_SelectItem.tsx
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

interface Props {
  items: { id: string; name: string; price: number }[];
  selectedItem: string;
  setSelectedItem: (itemId: string) => void;
}

export const BudgetStep3 = ({ items, selectedItem, setSelectedItem }: Props) => {
  return (
    <fieldset>
      <legend className="text-lg font-semibold">Seleccionar prenda</legend>
      <Listbox value={selectedItem} onChange={setSelectedItem}>
        <div className="relative mt-2">
          <ListboxButton className="relative w-full cursor-pointer rounded-md bg-white py-2 pl-3 pr-10 text-left shadow-md">
            <span className="block truncate">
              {selectedItem ? items.find(i => i.id === selectedItem)?.name : "Seleccionar Prenda"}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
            </span>
          </ListboxButton>
          <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 sm:text-sm">
            {items.map((item) => (
              <ListboxOption
                key={item.id}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? "bg-indigo-600 text-white" : "text-gray-900"}`
                }
                value={item.id}
              >
                {({ selected }) => (
                  <>
                    <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                      {item.name} - €{item.price}
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

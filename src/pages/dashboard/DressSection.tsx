import { ItemForm } from "../../components/admin/ItemForm";
import { ItemList } from "../../components/admin/ItemList";
import { ItemDoc } from "../../types/firestoreSchemas";

export const DressSection = ({
  brandId,
  userId,
  items,
  refreshItems,
}: {
  brandId: string;
  userId: string;
  items: { id: string; data: ItemDoc }[];
  refreshItems: () => void;
}) => (
  <>
    <ItemList brandId={brandId} items={items} onDelete={refreshItems} />
    <ItemForm brandId={brandId} userId={userId} onItemCreated={refreshItems} />
  </>
);

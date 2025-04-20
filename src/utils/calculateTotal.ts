export const calculateTotal = (itemPrice: number, tasks: { price: number }[]) => {
  return itemPrice + tasks.reduce((sum, t) => sum + t.price, 0);
};

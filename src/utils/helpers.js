export const formatPrice = (price, currency = "S/") => {
  const numericPrice = Number(price) || 0;
  return `${currency} ${numericPrice.toFixed(2)}`;
};

export const calculateTotal = (cartItems = []) => {
  return cartItems.reduce((acc, item) => {
    const itemPrice = Number(item.price) || 0;
    const itemQty = Number(item.quantity) || 0;
    return acc + itemPrice * itemQty;
  }, 0);
};
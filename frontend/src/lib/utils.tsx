import { OrderItemProps } from '@/providers/order';

export function wordToWordCapitalize(text: string) {
  return text
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function calculateTotal(orders: OrderItemProps[]) {
  return orders.reduce((total, item) => {
    const itemTotal = parseFloat(item.product.price) * item.amount;
    return total + itemTotal;
  }, 0);
}

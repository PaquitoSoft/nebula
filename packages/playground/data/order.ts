export const sampleOrder = {
  id: '1332823',
  createdDate: '05/04/2023',
  modifiedDate: '14/04/2023',
  store: 'Sweden',
  // orderItems: [],
  productsCost: 98.25,
  shippingCosts: 4.99,
  taxRate: 16
};

export const orderWorkflowStatuses = [
  { value: 'new-order', label: 'New order' },
  { value: 'processing', label: 'Processing' },
  { value: 'warehouse', label: 'Warehouse' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'cancelled', label: 'Cancelled' },
];
export const orderStatuses = [
  { value: 'open', label: 'Open' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
];
export const orderPaymentStatuses = [
  { value: 'balance-due', label: 'Balance due' },
  { value: 'pending', label: 'Pending' },
  { value: 'paid', label: 'Paid' },
  { value: 'credit-owed', label: 'Credit owed' },
  { value: 'failed', label: 'Failed' },
];

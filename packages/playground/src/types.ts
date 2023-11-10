export type TFieldErrors = Record<string, boolean>;

export type TFormErrors<Values> = {
  [K in keyof Values]?: TFieldErrors;
};

export type TOption = {
  value: string;
  label: string;
};

export type TOrder = {
  id: string;
  createdDate: string;
  modifiedDate: string;
  store: string;
  // orderItems: [],
  productsCost: number;
  shippingCosts: number;
  taxRate: number;
}

export type TOrderOptions = {
  statuses: TOption[];
  paymentStatuses: TOption[];
  workflows: TOption[];
};

export type TUser = {
  id: string;
};

import { TOrder, TOrderOptions } from "../types";
import {
  sampleOrder,
  orderWorkflowStatuses,
  orderStatuses,
  orderPaymentStatuses,
} from '../../data/order';

const TIMEOUT = 100;

export function loadOrder(): Promise<TOrder> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(sampleOrder);
    }, TIMEOUT);
  });
}

export function getOrderOptions(): Promise<TOrderOptions> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        statuses: orderStatuses,
        paymentStatuses: orderPaymentStatuses,
        workflows: orderWorkflowStatuses,
      });
    }, TIMEOUT);
  });
}

import { TOrder } from "../types";
import { sampleOrder } from '../../data/order';

const TIMEOUT = 1000;

export function loadOrder(): Promise<TOrder> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(sampleOrder);
    }, TIMEOUT);
  });
}

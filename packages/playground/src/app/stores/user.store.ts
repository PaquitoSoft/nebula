import { signal } from "@preact/signals-react";
import { TUser } from "../../types";

const USER_ID_KEY = 'uid';

const storageUser = window.sessionStorage.getItem(USER_ID_KEY);

export const user = signal<TUser | undefined>(
  storageUser ? JSON.parse(storageUser) : undefined
);

export const updateUser = (_user: TUser) => {
  user.value = _user;
  window.sessionStorage.setItem(USER_ID_KEY, JSON.stringify(_user));
}

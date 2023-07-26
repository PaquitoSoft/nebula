export type TFieldErrors = Record<string, boolean>;

export type TFormErrors<Values> = {
  [K in keyof Values]?: TFieldErrors;
};

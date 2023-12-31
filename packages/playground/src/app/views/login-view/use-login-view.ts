import { useFormik } from "formik";
import { TFormErrors } from "../../../types";
import { updateUser } from "../../stores/user.store";

export type TFormValues = {
  email: string;
  password: string;
}

type TUserLoginViewProps = {
  initialValues: TFormValues;
}

const validateForm = (values: Record<string, string>) => {
  const errors: TFormErrors<TFormValues> = {};

  if (!values.email) {
    errors.email = { missing: true };
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
  ) {
    errors.email = { invalidEmail: true };
  }
  if (!values.password) {
    errors.password = { missing: true }
  }
  return errors;
}

function useLoginView({ initialValues }: TUserLoginViewProps) {
  const formConfig = useFormik({
    initialValues,
    validate: validateForm,
    onSubmit: (values) => {
      updateUser({
        id: btoa(`${values.email}:${values.password}`)
      });
    }
  });

  return {
    formConfig
  };
}

export default useLoginView;

import {
  Card,
  Constraints,
  TextField,
  PasswordField,
  PrimaryButton,
  Spacings
} from '@commercetools-frontend/ui-kit';
import useLoginView, { TFormValues } from './use-login-view';

import styles from './login-view.module.css';

const errorRenderer = (key: string) => {
  switch (key) {
    case 'invalidEmail':
      return 'Invalid email address';
    default:
      return undefined;
  }
};

function LoginView() {
  const { formConfig } = useLoginView({
    initialValues: {
      email: '',
      password: ''
    }
  });

  console.log('Form validation output:',
    TextField.toFieldErrors<TFormValues>(formConfig.errors)
  );

  console.log({ touched: formConfig.touched });

  return (
    <form className={styles.container} onSubmit={formConfig.handleSubmit}>
      <Constraints.Horizontal max={10}>
        <Card type="raised">
          <Spacings.Stack scale="l">
            <Spacings.Stack scale="m">
              <TextField
                title="Email"
                name='email'
                value={formConfig.values.email}
                onChange={formConfig.handleChange}
                onBlur={formConfig.handleBlur}
                touched={formConfig.touched.email}
                errors={TextField.toFieldErrors<TFormValues>(formConfig.errors).email}
                renderError={errorRenderer}
              />
              <PasswordField
                title="Password"
                name='password'
                value={formConfig.values.password}
                onChange={formConfig.handleChange}
                onBlur={formConfig.handleBlur}
                touched={formConfig.touched.password}
                errors={TextField.toFieldErrors<TFormValues>(formConfig.errors).password}
              />
            </Spacings.Stack>

            <PrimaryButton
              label="Login"
              type="submit"
            />
          </Spacings.Stack>
        </Card>
      </Constraints.Horizontal>
    </form>
  );
}

export default LoginView;

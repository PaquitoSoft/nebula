import {
  Card,
  Constraints,
  TextField,
  PasswordField,
  PrimaryButton,
  Spacings
} from '@commercetools-frontend/ui-kit';

import styles from './login-view.module.css';
import { useState } from 'react';
import { useUser } from '../../components/user-context';

function LoginView() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { updateUserId } = useUser();

  const handleLogin = () => {
    updateUserId(btoa(`${email}:${password}`));
  }

  return (
    <form className={styles.container} onSubmit={handleLogin}>
      <Constraints.Horizontal max={10}>
        <Card type="raised">
          <Spacings.Stack scale="l">
            <Spacings.Stack scale="m">
              <TextField
                title="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <PasswordField
                title="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
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

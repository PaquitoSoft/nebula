import { IntlProvider } from 'react-intl';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@commercetools-uikit/design-system';
import { UserProvider, useUser } from '../components/user-context';
import HomeView from './home-view/home-view';
import LoginView from './login-view/login-view';

import './app.module.css';

export function RoutesConfig() {
  const { userId } = useUser();

  if (!userId) {
    return <LoginView />
  }

  return (
    <Switch>
      <Route path="/">
        <HomeView />
      </Route>
    </Switch>
  )
}

export function App() {
  return (
    <UserProvider>
      <ThemeProvider theme="default" />
      <BrowserRouter>
        <IntlProvider locale="en">
          <RoutesConfig />
        </IntlProvider>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;

import { IntlProvider } from 'react-intl';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { currentTheme } from './stores/theme.store';
import { user } from './stores/user.store';
import { ThemeProvider } from './components';
import HomeView from './views/home-view/home-view';
import LoginView from './views/login-view/login-view';

import './app.module.css';

export function RoutesConfig() {
  if (!user.value) {
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
    <>
      <ThemeProvider theme={currentTheme.value} />
      <BrowserRouter>
        <IntlProvider locale="en">
          <RoutesConfig />
        </IntlProvider>
      </BrowserRouter>
    </>
  );
}

export default App;

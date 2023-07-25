// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UserProvider, useUser } from '../components/user-context';
import styles from './app.module.css';
import HomeView from './home-view/home-view';
import LoginView from './login-view/login-view';

import NxWelcome from './nx-welcome';

import { ThemeProvider } from '@commercetools-uikit/design-system';
import { IntlProvider } from 'react-intl';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';


export function RoutesConfig() {
  const { userId } = useUser();

  if (!userId) {
    return <LoginView />
  }

  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
    </Routes>
  )
}

export function App() {
  return (
    <UserProvider>
      <ThemeProvider theme="default" />
      <BrowserRouter>
        <IntlProvider locale={navigator.language}>
          <RoutesConfig />
        </IntlProvider>
      </BrowserRouter>
    </UserProvider>
  );
}

export function App_v32() {
  return (
    <div>
      <NxWelcome title="playground" />

      {/* START: routes */}
      {/* These routes and navigation have been generated for you */}
      {/* Feel free to move and update them to fit your needs */}
      <br />
      <hr />
      <br />
      <div role="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/page-2">Page 2</Link>
          </li>
        </ul>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              This is the generated root route.{' '}
              <Link to="/page-2">Click here for page 2.</Link>
            </div>
          }
        />
        <Route
          path="/page-2"
          element={
            <div>
              <Link to="/">Click here to go back to root page.</Link>
            </div>
          }
        />
      </Routes>
      {/* END: routes */}
    </div>
  );
}

export default App;

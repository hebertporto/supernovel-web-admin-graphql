import React from 'react';
import { useUser } from './context/user-context';
import { useAuth } from './context/auth-context';
// import AuthenticatedApp from './authenticated-app';
// import UnauthenticatedApp from './unauthenticated-app';

// const AuthenticatedApp = React.lazy(() => import('./authenticated-app'));
// const UnauthenticatedApp = React.lazy(() => import('./unauthenticated-app'));

function Logado() {
  const { logout } = useAuth();
  return (
    <div>
      <p>*@ LOGADO @*</p>
      <button onClick={logout}>LOGOUT</button>
    </div>
  );
}

function NaoLogado() {
  const { login } = useAuth();
  return (
    <div>
      <p>### NÃO LOGADO ###</p>
      <button onClick={login}>LOGIN</button>
    </div>
  );
}

function App() {
  const user = useUser();
  console.log('user: ', user);
  return user ? <Logado /> : <NaoLogado />;
}

export { App };

import React from 'react';
import { useUser } from './context/user-context';
import AuthenticatedApp from './routes/authenticated-app';
import UnauthenticatedApp from './routes/unauthenticated-app';

// const AuthenticatedApp = React.lazy(() => import('./routes/authenticated-app'));
// const UnauthenticatedApp = React.lazy(() => import('./unauthenticated-app'));

function App() {
  const user = useUser();
  return !user ? <AuthenticatedApp /> : <UnauthenticatedApp />;
}

export { App };

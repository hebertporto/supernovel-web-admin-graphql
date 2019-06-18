import React from 'react';
import { useUser } from './context/auth';
import AuthenticatedApp from './authenticated-app';
import UnauthenticatedApp from './unauthenticated-app';

function App() {
  const user = useUser();
  return user ? <AuthenticatedApp /> : <UnauthenticatedApp />;
}

export { App };

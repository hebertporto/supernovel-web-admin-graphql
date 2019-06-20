import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import { Container, Menu } from 'semantic-ui-react';
import { useAuth } from '../context/auth-context';

import Novels from '../screens/Novels';

function AuthenticatedApp() {
  const { logout } = useAuth();
  return (
    <Router>
      <Menu fixed="top" inverted>
        <Container>
          <Menu.Item header>
            <Link to="/">Super Novel Admin</Link>
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item>
              <Link to="/novels">Novels</Link>
            </Menu.Item>
            <Menu.Item onClick={logout}>Logout</Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu>
      <Container style={{ marginTop: '7em' }}>
        <Route path="/" exact component={Novels} />
        <Route render={() => <Redirect to="/" />} />
      </Container>
    </Router>
  );
}

export default AuthenticatedApp;

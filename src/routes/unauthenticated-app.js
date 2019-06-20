import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Container, Menu } from 'semantic-ui-react';

import Login from '../screens/Login';

function AuthenticatedApp() {
  return (
    <Router>
      <Menu fixed="top" inverted>
        <Container>
          <Menu.Item header>Super Novel Admin</Menu.Item>
        </Container>
      </Menu>
      <Container text style={{ marginTop: '7em' }}>
        <Route path="/login" exact component={Login} />
        <Route render={() => <Redirect to="/login" />} />
      </Container>
    </Router>
  );
}

export default AuthenticatedApp;

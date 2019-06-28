import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Container, Menu } from 'semantic-ui-react';

import Login from '../screens/Login';
import Register from '../screens/Register';

function AuthenticatedApp() {
  return (
    <Router>
      <Menu fixed="top" inverted>
        <Container>
          <Menu.Item header>Super Novel Admin</Menu.Item>
        </Container>
      </Menu>
      <Container text style={{ marginTop: '7em' }}>
        <Route path="/" exact component={Login} />
        <Route path="/register" exact component={Register} />
        {/* <Route render={() => <Redirect to="/login" />} /> */}
      </Container>
    </Router>
  );
}

export default AuthenticatedApp;

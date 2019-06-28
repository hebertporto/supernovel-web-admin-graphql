import React from 'react';
import { Router, Route, Link } from 'react-router-dom';
import { Container, Menu } from 'semantic-ui-react';
import history from './history';

import { useAuth } from '../context/auth-context';

import Novels from '../screens/Novels';
import CreateChapter from '../screens/CreateChapter';
import EditChapter from '../screens/EditChapter';
import CreateNovel from '../screens/CreateNovel';
import EditNovel from '../screens/EditNovel';
import Chapters from '../screens/Chapters';

function AuthenticatedApp() {
  const { logout } = useAuth();
  return (
    <Router history={history}>
      <Menu fixed="top" inverted>
        <Container>
          <Menu.Item header>
            <Link to="/">Super Novel Admin</Link>
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item>
              <Link to="/">Novels</Link>
            </Menu.Item>
            <Menu.Item onClick={logout}>Logout</Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu>
      <Container style={{ marginTop: '4em' }}>
        <Route path="/" exact component={Novels} />
        <Route path="/new-chapter/" exact component={CreateChapter} />
        <Route path="/edit-chapter/" exact component={EditChapter} />
        <Route path="/new-novel/" exact component={CreateNovel} />
        <Route path="/edit-novel/" exact component={EditNovel} />
        <Route path="/chapters/" exact component={Chapters} />
        {/* <Route component={() => <Redirect to="/" />} /> */}
      </Container>
    </Router>
  );
}

export default AuthenticatedApp;

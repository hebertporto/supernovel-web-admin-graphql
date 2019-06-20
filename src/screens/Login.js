import React from 'react';
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/auth-context';

const LoginForm = () => {
  const { login } = useAuth();
  return (
    <Grid textAlign="center" style={{ height: '60vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="black" textAlign="center">
          Super Novel Admin
        </Header>
        <Form size="large">
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="E-mail address"
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
            />

            <Button color="teal" fluid size="large" onClick={login}>
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? <Link to="/register">Sign Up</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default LoginForm;

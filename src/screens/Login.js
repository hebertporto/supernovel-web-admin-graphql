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
import { useFormState } from 'react-use-form-state';
import { LOGIN_MUTATION } from '../graphql/Mutation';
import { useMutation } from 'react-apollo-hooks';

const LoginForm = () => {
  // TODO: handle loading and error
  const { setUser } = useAuth();
  const [formState, { email, password }] = useFormState({
    email: '',
    password: '',
  });

  const onSubmit = useMutation(LOGIN_MUTATION, {
    update: (proxy, mutationResult) => {
      const { user, token } = mutationResult.data.login;
      setUser({
        name: user.name,
        email: user.email,
        token: token,
      });
    },
    variables: {
      email: formState.values.email,
      password: formState.values.password,
    },
  });
  return (
    <Grid textAlign="center" style={{ height: '60vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="black" textAlign="center">
          Super Novel Admin
        </Header>
        <Form size="large">
          <Segment stacked>
            <input
              name="email"
              placeholder="email@example.com"
              {...email('email')}
              required
              style={{ marginBottom: 20 }}
            />
            <input
              name="password"
              type="password"
              placeholder="password"
              {...password('password')}
              style={{ marginBottom: 20 }}
            />

            <Button color="teal" fluid size="large" onClick={onSubmit}>
              Login
            </Button>
          </Segment>
        </Form>
        {/* <Message>
          New to us? <Link to="/register">Sign Up</Link>
        </Message> */}
      </Grid.Column>
    </Grid>
  );
};

export default LoginForm;

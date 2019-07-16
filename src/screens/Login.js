import React, { useState } from 'react';
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Dimmer,
  Loader,
} from 'semantic-ui-react';
import { useAuth } from '../context/auth-context';
import { useFormState } from 'react-use-form-state';
import { LOGIN_MUTATION } from '../graphql/Mutation';
import { useMutation } from 'react-apollo-hooks';

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, seterror] = useState(false);
  const { setUser } = useAuth();
  const [formState, { email, password }] = useFormState({
    email: 'hebertporto@gmail.com',
    password: 'Senha0025',
  });

  const handleLogin = useMutation(LOGIN_MUTATION);

  const onSubmit = () => {
    setLoading(true);
    handleLogin({
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
  };

  return (
    <Grid textAlign="center" style={{ height: '60vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="black" textAlign="center">
          Super Novel Admin
        </Header>
        <Form size="large">
          {loading ? (
            <div>loading...</div>
          ) : (
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
          )}
        </Form>
        {error && <Message>Usuário ou senha inválidos</Message>}
        {/* <Message>
          New to us? <Link to="/register">Sign Up</Link>
        </Message> */}
      </Grid.Column>
    </Grid>
  );
};

export default LoginForm;

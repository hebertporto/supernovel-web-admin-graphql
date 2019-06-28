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
import { REGISTER_USER_MUTATION } from '../graphql/Mutation';
import { useMutation } from 'react-apollo-hooks';

const Register = () => {
  // TODO: handle loading and error
  const { setUser } = useAuth();
  const [formState, { text, email, password }] = useFormState({
    email: '',
    password: '',
  });

  const onSubmit = useMutation(REGISTER_USER_MUTATION, {
    update: (proxy, mutationResult) => {
      console.log('mutationResult.data', mutationResult);
    },
    variables: {
      name: formState.values.name,
      email: formState.values.email,
      password: formState.values.password,
    },
  });
  return (
    <Grid textAlign="center" style={{ height: '60vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="black" textAlign="center">
          Super Novel Admin - Register User
        </Header>
        <Form size="large">
          <Segment stacked>
            <input
              name="name"
              placeholder="name"
              {...text('name')}
              required
              style={{ marginBottom: 20 }}
            />
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
              Criar
            </Button>
          </Segment>
        </Form>
        <Message>
          Log in instead <Link to="/">Log In</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Register;

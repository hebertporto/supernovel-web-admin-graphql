import React from 'react';
import { Button, Form, Grid, Header } from 'semantic-ui-react';
import { LOGIN_MUTATION } from '../graphql/Mutation';
import { useMutation } from 'react-apollo-hooks';
import { useFormState } from 'react-use-form-state';

const EditNovel = () => {
  const [formState, { text, number }] = useFormState({});

  const onSubmit = useMutation(LOGIN_MUTATION, {
    update: (proxy, mutationResult) => {},
    variables: {
      email: formState.values.email,
      password: formState.values.password,
    },
  });
  return (
    <Grid verticalAlign="middle">
      <Grid.Column width={9}>
        <Header as="h2" color="black" textAlign="center">
          Edit Novel
        </Header>
        <Form size="big">
          <input
            name="number"
            placeholder="Number"
            {...number('number')}
            required
            style={{ marginBottom: 20 }}
          />
          <input
            name="title"
            placeholder="Title"
            {...text('title')}
            style={{ marginBottom: 20 }}
          />
          <input
            name="translators"
            placeholder="Tradutores"
            {...text('translators')}
            style={{ marginBottom: 20 }}
          />
          <Button color="facebook" fluid size="large" onClick={onSubmit}>
            CADASTRAR
          </Button>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default EditNovel;

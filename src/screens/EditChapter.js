import React, { useEffect } from 'react';
import { Button, Form, Grid, Header } from 'semantic-ui-react';
import { useFormState } from 'react-use-form-state';
import { CREATE_CHAPTER_MUTATION } from '../graphql/Mutation';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { CHAPTER_QUERY } from '../graphql/Query';
import history from '../routes/history';

function EditChapter(props) {
  const { id } = props.location.state;
  const { data } = useQuery(CHAPTER_QUERY, {
    variables: { id },
  });
  const [formState, { text, textarea, number }] = useFormState({
    number: 0,
  });

  useEffect(() => {
    if (data.chapter) {
      const {
        number,
        title,
        translators,
        revisors,
        content,
        novel,
      } = data.chapter;
      formState.setField('number', number);
      formState.setField('title', title);
      formState.setField('translators', translators);
      formState.setField('revisors', revisors);
      formState.setField('content', content);
      formState.setField('novel', novel.id);
    }
  }, [data]); // eslint-disable-line

  const onSubmit = useMutation(CREATE_CHAPTER_MUTATION, {
    update: () => {
      history.goBack();
    },
    variables: {
      id: id,
      number: formState.values.number.toString(),
      title: formState.values.title,
      translators: formState.values.translators,
      revisors: formState.values.revisors,
      content: formState.values.content,
      novel: formState.values.novel,
    },
  });

  return (
    <React.Fragment>
      <Grid>
        <Grid.Column>
          {data.chapter && data.chapter.novel && (
            <Header size="large">Editar - {data.chapter.novel.name}</Header>
          )}
        </Grid.Column>
      </Grid>

      <Grid>
        <Grid.Column width={9}>
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
            <input
              name="revisors"
              placeholder="Revisores"
              {...text('revisors')}
              style={{ marginBottom: 20 }}
            />
            <textarea
              name="content"
              placeholder="Conteudo"
              {...textarea('content')}
              style={{ marginBottom: 20 }}
            />
            <Button color="facebook" fluid size="large" onClick={onSubmit}>
              ATUALIZAR
            </Button>
          </Form>
        </Grid.Column>
      </Grid>
    </React.Fragment>
  );
}

export default EditChapter;

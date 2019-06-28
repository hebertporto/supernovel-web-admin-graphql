import React, { useEffect } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useFormState } from 'react-use-form-state';
import { useMutation } from 'react-apollo-hooks';
import { CREATE_CHAPTER_MUTATION } from '../../graphql/Mutation';
import { NOVEL_INFO_QUERY, NOVELS_QUERY } from '../../graphql/Query';
import { get } from 'lodash';

function ChapterForm({ novelId, formData }) {
  const [formState, { text, textarea, number }] = useFormState({ number: 0 });

  useEffect(() => {
    formState.setField('number', get(formData, 'number', 0) || 0);
    formState.setField('title', get(formData, 'title', ''));
    formState.setField('translators', get(formData, 'translators', ''));
    formState.setField('revisors', get(formData, 'revisors', ''));
    formState.setField('content', get(formData, 'content', ''));
  }, [formData]); // eslint-disable-line

  const onSubmit = useMutation(CREATE_CHAPTER_MUTATION, {
    update: () => {
      formState.setField('number', 0);
      formState.setField('title', '');
      formState.setField('translators', '');
      formState.setField('revisors', '');
      formState.setField('content', '');
    },
    variables: {
      number: formState.values.number.toString(),
      title: formState.values.title,
      translators: formState.values.translators,
      revisors: formState.values.revisors,
      content: formState.values.content,
      novel: novelId,
    },
    refetchQueries: () => [
      {
        query: NOVEL_INFO_QUERY,
        variables: { id: novelId },
      },
      {
        query: NOVELS_QUERY,
      },
    ],
  });

  return (
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
        CADASTRAR
      </Button>
    </Form>
  );
}

export { ChapterForm };

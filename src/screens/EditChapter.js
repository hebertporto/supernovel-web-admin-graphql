import React, { useState } from 'react';
import { Button, Form, Grid, Header, Icon } from 'semantic-ui-react';
import moment from 'moment';
import { useFormState } from 'react-use-form-state';
import {
  CREATE_CHAPTER_MUTATION,
  CRAWLER_CHAPTER_MUTATION,
} from '../graphql/Mutation';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { NOVEL_INFO_QUERY } from '../graphql/Query';

const CreateChapter = (props) => {
  const { id } = props.location.state;
  const { data, error, loading } = useQuery(NOVEL_INFO_QUERY, {
    variables: { id },
  });
  const [showLoadingUrl, setLoadingUrl] = useState(false);
  const [showSavedChapter, setShowSavedChapter] = useState(false);
  const [formState, { text, textarea, number }] = useFormState({});

  const onSubmitUrl = useMutation(CRAWLER_CHAPTER_MUTATION, {
    update: (proxy, mutationResult) => {
      const {
        number,
        title,
        translators,
        revisors,
        content,
      } = mutationResult.data.crawledChapter;
      formState.setField('number', number.toString());
      formState.setField('title', title);
      formState.setField('translators', translators);
      formState.setField('revisors', revisors);
      formState.setField('content', content);
      setLoadingUrl(false);
    },
    variables: {
      url: formState.values.url,
    },
  });

  const handleUrl = () => {
    setLoadingUrl(true);
    onSubmitUrl();
  };

  const onSubmit = useMutation(CREATE_CHAPTER_MUTATION, {
    update: (proxy, mutationResult) => {
      formState.setField('number', 0);
      formState.setField('title', '');
      formState.setField('translators', '');
      formState.setField('revisors', '');
      formState.setField('content', '');
    },
    variables: {
      number: formState.values.number,
      title: formState.values.title,
      translators: formState.values.translators,
      revisors: formState.values.revisors,
      content: formState.values.content,
      novel: id,
    },
  });

  return (
    <React.Fragment>
      <Header as="h2" color="black">
        Crawler
      </Header>
      <Form size="big">
        <Grid>
          <Grid.Row>
            <Grid.Column width={9}>
              <input
                name="url"
                placeholder="http://saikai..."
                {...text('url')}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={3}>
              <Button
                color="green"
                fluid
                size="large"
                onClick={handleUrl}
                disabled={showLoadingUrl}
              >
                PESQUISAR
              </Button>
            </Grid.Column>
            <Grid.Column width={1}>
              {showLoadingUrl && <Icon loading name="spinner" />}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>

      <Grid>
        <Grid.Column>
          {data.novel && (
            <div>
              <Header size="large">{data.novel.name}</Header>
              <p>
                Último capítulo: {data.novel.lastChapter.number} |{' '}
                <Icon name="calendar outline" />
                {moment(parseInt(data.novel.lastChapter.createdAt, 10)).format(
                  'DD/MM/YYYY',
                )}
              </p>
            </div>
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
              CADASTRAR
            </Button>
          </Form>
        </Grid.Column>
      </Grid>
    </React.Fragment>
  );
};

export default CreateChapter;

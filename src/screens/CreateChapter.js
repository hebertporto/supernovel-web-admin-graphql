import React, { useState } from 'react';
import {
  Button,
  Form,
  Grid,
  Header,
  Icon,
  Message,
  Divider,
} from 'semantic-ui-react';
import moment from 'moment';
import { useFormState } from 'react-use-form-state';
import { CRAWLER_CHAPTER_MUTATION } from '../graphql/Mutation';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { NOVEL_INFO_QUERY } from '../graphql/Query';
import { ChapterForm } from './components/ChapterForm';
import { get } from 'lodash';

const CreateChapter = (props) => {
  const { id } = props.location.state;
  const { data } = useQuery(NOVEL_INFO_QUERY, {
    variables: { id },
    fetchPolicy: 'network-only',
  });
  const [showLoadingUrl, setLoadingUrl] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState(false);
  const [formState, { text }] = useFormState({});

  const handleDismiss = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };
  const onSubmitUrl = useMutation(CRAWLER_CHAPTER_MUTATION, {
    update: (proxy, mutationResult) => {
      setFormData(mutationResult.data.crawledChapter);
      formState.setField('url', '');
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
  const novelName = get(data, 'novel.name', '');
  const chapterNumer = get(data, 'novel.lastChapter.number', '');
  const chapterDate = get(data, 'novel.lastChapter.createdAt');
  return (
    <React.Fragment>
      <Header as="h2" color="black">
        Crawler
      </Header>
      <Form size="big">
        <Grid>
          <Grid.Row>
            <Grid.Column width={16}>
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
      <Divider />
      <Grid>
        <Grid.Column>
          {data.novel && (
            <div>
              <Header size="large">{novelName}</Header>
              {chapterNumer ? (
                <p>
                  Último capítulo: {chapterNumer} |{' '}
                  <Icon name="calendar outline" />
                  {chapterDate &&
                    moment(parseInt(chapterDate, 10)).format('DD/MM/YYYY')}
                </p>
              ) : (
                <p>-</p>
              )}
            </div>
          )}
        </Grid.Column>
      </Grid>

      <Grid>
        <Grid.Column width={9}>
          {showMessage && (
            <Message
              success
              header="Sucesso"
              content="Capitulo cadastrado !!"
            />
          )}
          <ChapterForm
            formData={formData}
            novelId={id}
            handleShowMessage={handleDismiss}
          />
        </Grid.Column>
      </Grid>
    </React.Fragment>
  );
};

export default CreateChapter;

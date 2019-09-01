import React, { useState } from 'react';
import { Button, Form, Grid, Header, Icon, Divider } from 'semantic-ui-react';
import moment from 'moment';
import { useFormState } from 'react-use-form-state';
import { CRAWLER_CHAPTER_MUTATION } from '../graphql/Mutation';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { NOVEL_INFO_QUERY } from '../graphql/Query';
import { ChapterForm } from './components/ChapterForm';
import { get } from 'lodash';
import { ListLink } from './components/ListLink';

const CreateChapter = (props) => {
  const [showLoadingUrl, setLoadingUrl] = useState(false);
  const [formData, setFormData] = useState(false);
  const [formState, { text }] = useFormState({});

  const { id } = props.location.state;
  const { data } = useQuery(NOVEL_INFO_QUERY, {
    variables: { id },
  });

  const onSubmitUrl = useMutation(CRAWLER_CHAPTER_MUTATION, {
    update: (proxy, mutationResult) => {
      setFormData(mutationResult.data.crawledChapter);
      formState.setField('url', '');
      setLoadingUrl(false);
    },
  });

  const handleUrl = (url) => {
    setLoadingUrl(true);
    onSubmitUrl({
      variables: {
        url,
      },
    });
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
                onClick={() => handleUrl(formState.values.url)}
                disabled={showLoadingUrl || !formState.values.url}
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
                <div>
                  Último capítulo:
                  <h3>
                    {chapterNumer} | <Icon name="calendar outline" />
                    {chapterDate &&
                      moment(parseInt(chapterDate, 10)).format('DD/MM/YYYY')}
                  </h3>
                </div>
              ) : (
                <p>-</p>
              )}
            </div>
          )}
        </Grid.Column>
      </Grid>

      <Grid>
        <Grid.Column width={8}>
          <ChapterForm formData={formData} novelId={id} />
        </Grid.Column>
        <Grid.Column width={8}>
          <ListLink loadChapter={handleUrl} chapterNumer={chapterNumer} />
        </Grid.Column>
      </Grid>
    </React.Fragment>
  );
};

export default CreateChapter;

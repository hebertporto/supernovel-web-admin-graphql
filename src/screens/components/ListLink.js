import React, { useState } from 'react';
import { useFormState } from 'react-use-form-state';

import {
  Grid,
  Form,
  Button,
  Header,
  Dimmer,
  Loader,
  Icon,
} from 'semantic-ui-react';
import { useMutation } from 'react-apollo-hooks';
import { CRAWLER_NOVEL_CHAPTERS_MUTATION } from '../../graphql/Mutation';

function ListLink({ loadChapter, chapterNumer }) {
  const [showLoadingUrl, setLoadingUrl] = useState(false);
  const [chaptersLinks, setChaptersLinks] = useState([]);
  const [formState, { text }] = useFormState({});

  const onSubmitUrl = useMutation(CRAWLER_NOVEL_CHAPTERS_MUTATION, {
    update: (proxy, mutationResult) => {
      const indice = parseInt(chapterNumer, 10);
      const remove = indice > 0 ? indice : 0;
      const chapters = mutationResult.data.crawledNovelChapters.slice(remove);
      setChaptersLinks(chapters);
      formState.setField('urlNovel', '');
      setLoadingUrl(false);
    },
    variables: {
      url: formState.values.urlNovel,
    },
  });

  const handleSubmit = () => {
    setLoadingUrl(true);
    onSubmitUrl();
  };

  const removeFromList = (description) => {
    const newList = chaptersLinks.filter(
      (item) => item.description !== description,
    );
    setChaptersLinks(newList);
  };

  if (showLoadingUrl) {
    return (
      <Dimmer active inverted>
        <Loader>Loading</Loader>
      </Dimmer>
    );
  }

  return (
    <div
      style={{
        maxHeight: 550,
        height: 450,
        overflowY: 'scroll',
        overflowX: 'hidden',
      }}
    >
      <Grid>
        <Grid.Row>
          <Grid.Column width={16}>
            <Header as="h3">Carregar Todos Capítulos</Header>
            <Form size="big">
              <input
                name="urlNovel"
                placeholder="Url da Novel"
                {...text('urlNovel')}
              />
            </Form>
          </Grid.Column>
          <Grid.Column width={16}>
            <Button
              color="green"
              fluid
              size="large"
              onClick={handleSubmit}
              disabled={showLoadingUrl || !formState.values.urlNovel}
            >
              Carregar
            </Button>
          </Grid.Column>
        </Grid.Row>
        {chaptersLinks.map(({ link, description }) => {
          return (
            <Grid.Row key={description}>
              <Grid.Column width={3}>
                <Button icon onClick={() => loadChapter(link)}>
                  <Icon color="teal" name="arrow alternate circle left" />
                </Button>
              </Grid.Column>
              <Grid.Column width={10}>{description}</Grid.Column>
              <Grid.Column width={3}>
                <Button icon>
                  <Icon
                    onClick={() => removeFromList(description)}
                    name="trash alternate"
                  />
                </Button>
              </Grid.Column>
            </Grid.Row>
          );
        })}
      </Grid>
    </div>
  );
}

export { ListLink };

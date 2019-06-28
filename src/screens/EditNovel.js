import React, { useState, useEffect } from 'react';
import { Button, Form, Grid, Header, Image } from 'semantic-ui-react';
import { UPDATE_NOVEL_MUTATION } from '../graphql/Mutation';
import { NOVEL_FULL_INFO_QUERY, NOVELS_QUERY } from '../graphql/Query';
import { useMutation, useQuery } from 'react-apollo-hooks';
import { useFormState } from 'react-use-form-state';
import history from '../routes/history';

const EditNovel = (props) => {
  const { id } = props.location.state;

  const [image, setImage] = useState(false);
  const { data } = useQuery(NOVEL_FULL_INFO_QUERY, {
    variables: { id },
  });
  const [formState, { text, textarea }] = useFormState({
    coverUrl: '',
  });

  useEffect(() => {
    if (data && data.novel) {
      const {
        name,
        description,
        author,
        translationTeam,
        coverUrl,
      } = data.novel;
      formState.setField('name', name);
      formState.setField('description', description);
      formState.setField('author', author);
      formState.setField('translationTeam', translationTeam);
      setImage(coverUrl);
    }
  }, [data]); // eslint-disable-line

  const uploadImmage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'kkzgiffrsupernovel');
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/dwvrdf3zg/image/upload',
      { method: 'POST', body: data },
    );
    const fileUploaded = await res.json();
    setImage(fileUploaded.secure_url);
  };

  const onSubmit = useMutation(UPDATE_NOVEL_MUTATION, {
    update: (a, b) => {
      console.log('b: ', b);
      history.push('/');
    },
    variables: {
      name: formState.values.name,
      description: formState.values.description,
      author: formState.values.author,
      translationTeam: formState.values.translationTeam,
      coverUrl: image,
      id,
    },
    refetchQueries: () => [
      {
        query: NOVELS_QUERY,
      },
    ],
  });

  return (
    <Grid columns={2} style={{ marginTop: 50 }}>
      <Grid.Column>
        <Header as="h2" color="black">
          Nova Novel
        </Header>
        <Form size="big">
          <input
            name="name"
            placeholder="Novel's name"
            {...text('name')}
            required
            style={{ marginBottom: 20 }}
          />
          <textarea
            name="description"
            placeholder="Description"
            required
            {...textarea('description')}
            style={{ marginBottom: 20 }}
          />
          <input
            name="author"
            placeholder="Author"
            required
            {...text('author')}
            style={{ marginBottom: 20 }}
          />
          <input
            name="translationTeam"
            required
            placeholder="Projeto Resposavel "
            {...text('translationTeam')}
            style={{ marginBottom: 20 }}
          />
          <p>Imagem de Capa: Tamanho da imagem deve ser 600x200</p>
          <input
            type="file"
            id="file"
            placeholder="novel cover"
            onChange={uploadImmage}
            style={{ marginBottom: 20 }}
          />
          <Button color="facebook" fluid size="large" onClick={onSubmit}>
            ATUALIZAR
          </Button>
        </Form>
      </Grid.Column>
      <Grid.Column>
        {image && (
          <div>
            <Header as="h4" color="black">
              Preview de Capa
            </Header>
            <Image src={image} size="large" />
          </div>
        )}
      </Grid.Column>
    </Grid>
  );
};

export default EditNovel;

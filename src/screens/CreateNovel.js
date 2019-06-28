import React, { useState } from 'react';
import { Button, Form, Grid, Header, Image } from 'semantic-ui-react';
import { CREATE_NOVEL_MUTATION } from '../graphql/Mutation';
import { NOVELS_QUERY } from '../graphql/Query';
import { useMutation } from 'react-apollo-hooks';
import { useFormState } from 'react-use-form-state';
import history from '../routes/history';

const CreateNovel = () => {
  const [formState, { text, textarea }] = useFormState({
    coverUrl: '',
  });
  const [image, setImage] = useState(false);

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

  const onSubmit = useMutation(CREATE_NOVEL_MUTATION, {
    update: () => {
      history.push('/');
    },
    variables: {
      name: formState.values.name,
      description: formState.values.description,
      author: formState.values.author,
      translationTeam: formState.values.translationTeam,
      coverUrl: image,
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
          Editar Novel
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
            CADASTRAR
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

export default CreateNovel;

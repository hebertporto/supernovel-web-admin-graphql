import React, { useState } from 'react';
import {
  Container,
  Header,
  Table,
  Icon,
  Button,
  Confirm,
} from 'semantic-ui-react';
import moment from 'moment';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { Link } from 'react-router-dom';
import { CHAPTERS_QUERY } from '../graphql/Query';
import { DELETE_CHAPTER_MUTATION } from '../graphql/Mutation';

const Chapters = (props) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [chapterId, setChapterId] = useState(false);
  const { name, id } = props.location.state;
  const {
    data: { chapters },
    error,
  } = useQuery(CHAPTERS_QUERY, { variables: { id } });

  const deleteMutation = useMutation(DELETE_CHAPTER_MUTATION);

  const deleteChapter = () => {
    deleteMutation({
      variables: { id: chapterId },
      refetchQueries: () => [
        {
          query: CHAPTERS_QUERY,
          variables: { id },
        },
      ],
    });
    setShowConfirm(false);
  };
  const openConfirm = (id) => {
    setChapterId(id);
    setShowConfirm(true);
  };
  return (
    <React.Fragment>
      <Container>
        <Header as="h1">
          Capítulos - <small>{name}</small>
        </Header>
        <Link
          to={{
            pathname: `/new-chapter/`,
            state: { id },
          }}
        >
          <Button color="facebook">Adicionar Capítulo</Button>
        </Link>
      </Container>
      <Container>
        {error && <p style={{ color: 'red' }}>Error ao carregar capitulos </p>}
      </Container>
      <Container style={{ marginTop: 20 }}>
        <Table striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Número</Table.HeaderCell>
              <Table.HeaderCell>Título</Table.HeaderCell>
              <Table.HeaderCell>Data lançado</Table.HeaderCell>
              <Table.HeaderCell>Ações</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {chapters &&
              chapters.map(({ id, title, createdAt, number }) => {
                return (
                  <Table.Row key={id}>
                    <Table.Cell> {number}</Table.Cell>
                    <Table.Cell singleLine> {title}</Table.Cell>
                    <Table.Cell>
                      {moment(parseInt(createdAt, 10)).format('DD/MM/YYYY')}
                    </Table.Cell>
                    <Table.Cell>
                      <Link
                        to={{
                          pathname: `/edit-chapter/`,
                          state: { id },
                        }}
                      >
                        <Icon name="edit" size="big" link />
                      </Link>
                      <Icon
                        link
                        name="trash"
                        size="big"
                        onClick={() => openConfirm(id)}
                      />
                    </Table.Cell>
                  </Table.Row>
                );
              })}
          </Table.Body>
        </Table>
        <Confirm
          open={showConfirm}
          onCancel={() => setShowConfirm(false)}
          onConfirm={deleteChapter}
          content={`Deletar capítulo ?`}
        />
      </Container>
    </React.Fragment>
  );
};

export default Chapters;

// deleteMutation({
//   variables: { id: chapterId },
//   options: {
//     refetchQueries: {
//       query: ['chapters'],
//       variables: { id },
//     },
//   },
// });

// deleteMutation({
//   variables: { id: chapterId },
//   options: {
//     refetchQueries: [
//       {
//         query: 'chapters',
//         variables: { id },
//       },
//     ],
//   },
// });

// deleteMutation({
//   variables: { id: chapterId },
//   refetchQueries: [
//     {
//       query: 'chapters',
//       variables: { id },
//     },
//   ],
// });

// deleteMutation({
//   variables: { id: chapterId },
//   refetchQueries: () => ['chapters'],
// });

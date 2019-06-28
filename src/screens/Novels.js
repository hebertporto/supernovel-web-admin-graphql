import React from 'react';
import { Container, Header, Table, Icon, Button } from 'semantic-ui-react';
import { useQuery } from 'react-apollo-hooks';
import { Link } from 'react-router-dom';
import { NOVELS_QUERY } from '../graphql/Query';
import moment from 'moment';
import { get } from 'lodash';

const Novels = () => {
  const {
    data: { novels },
    error,
  } = useQuery(NOVELS_QUERY);
  return (
    <React.Fragment>
      <Container>
        <Header as="h1">Lista de Novels</Header>
        <Link to="/new-novel/">
          <Button color="facebook">
            <Icon name="plus" /> Criar Novel
          </Button>
        </Link>
      </Container>
      <Container>
        {error && <p style={{ color: 'red' }}>Error ao carregar novels </p>}
      </Container>
      <Container style={{ marginTop: 20 }}>
        <Table striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Last Chapter Info</Table.HeaderCell>
              <Table.HeaderCell>Novel</Table.HeaderCell>
              <Table.HeaderCell>Chapter</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {novels &&
              novels.map(({ id, name, lastChapter }) => {
                const number = get(lastChapter, 'number', '');
                const date = get(lastChapter, 'createdAt', false);
                return (
                  <Table.Row key={id}>
                    <Table.Cell singleLine> {name}</Table.Cell>
                    <Table.Cell>
                      {number} -{' '}
                      {date && moment(parseInt(date, 10)).format('DD/MM/YYYY')}
                    </Table.Cell>
                    <Table.Cell>
                      <Link
                        to={{
                          pathname: `/edit-novel/`,
                          state: { id },
                        }}
                      >
                        <Icon name="edit" size="big" link />
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      <Link
                        to={{
                          pathname: `/chapters/`,
                          state: { id, name },
                        }}
                      >
                        <Icon name="list ul" size="big" link />
                      </Link>
                      <Link
                        to={{
                          pathname: `/new-chapter/`,
                          state: { id },
                        }}
                      >
                        <Icon name="add circle" size="big" link />
                      </Link>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
          </Table.Body>
        </Table>
      </Container>
    </React.Fragment>
  );
};

export default Novels;

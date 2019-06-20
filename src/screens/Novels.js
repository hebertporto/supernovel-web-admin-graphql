import React from 'react';
import { Container, Header, Table, Icon, Button } from 'semantic-ui-react';
import { useQuery } from 'react-apollo-hooks';
import { NOVELS_QUERY } from '../graphql/Query';

const Novels = () => {
  const {
    data: { novels },
    error,
    loading,
  } = useQuery(NOVELS_QUERY);
  console.log('novels', novels);
  console.log('error', error);
  console.log('loading', loading);
  return (
    <React.Fragment>
      <Container>
        <Header as="h1">Lista de Novels</Header>
        <Button color="facebook">
          <Icon name="plus" /> Create Novel
        </Button>
      </Container>

      <Container style={{ marginTop: 20 }}>
        <Table celled padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Last Chapter</Table.HeaderCell>
              <Table.HeaderCell>Novel</Table.HeaderCell>
              <Table.HeaderCell>Chapter</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {novels &&
              novels.map(({ id, name, lastChapter: { number, createdAt } }) => {
                return (
                  <Table.Row key={id}>
                    <Table.Cell singleLine>{name}</Table.Cell>
                    <Table.Cell>
                      {number} - {createdAt}
                    </Table.Cell>
                    <Table.Cell>
                      <Icon link name="edit" size="big" />
                    </Table.Cell>
                    <Table.Cell>
                      <Icon
                        onClick={() => console.log('#####')}
                        name="list ul"
                        size="big"
                        link
                      />
                      <Icon name="add circle" size="big" link />
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

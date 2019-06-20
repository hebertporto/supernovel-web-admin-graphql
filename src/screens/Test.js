import React from 'react';
import {
  Container,
  Header,
  Image,
  List,
  Segment,
  Table,
  Rating,
} from 'semantic-ui-react';

const FixedMenuLayout = () => (
  <React.Fragment>
    <Container text>
      <Header as="h1">Semantic UI React Fixed Template</Header>
      <p>This is a basic fixed menu template using fixed size containers.</p>
      <p>
        A text container is used for the main container, which is useful for
        single column layouts.
      </p>
    </Container>

    <Container>
      <Table.Body celled padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell singleLine>Evidence Rating</Table.HeaderCell>
            <Table.HeaderCell>Effect</Table.HeaderCell>
            <Table.HeaderCell>Efficacy</Table.HeaderCell>
            <Table.HeaderCell>Consensus</Table.HeaderCell>
            <Table.HeaderCell>Comments</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Header as="h2" textAlign="center">
                A
              </Header>
            </Table.Cell>
            <Table.Cell singleLine>Power Output</Table.Cell>
            <Table.Cell>
              <Rating icon="star" defaultRating={3} maxRating={3} />
            </Table.Cell>
            <Table.Cell textAlign="right">
              80% <br />
              <a href="#">18 studies</a>
            </Table.Cell>
            <Table.Cell>
              Creatine supplementation is the reference compound for increasing
              muscular creatine levels; there is variability in this increase,
              however, with some nonresponders.
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Header as="h2" textAlign="center">
                A
              </Header>
            </Table.Cell>
            <Table.Cell singleLine>Weight</Table.Cell>
            <Table.Cell>
              <Rating icon="star" defaultRating={3} maxRating={3} />
            </Table.Cell>
            <Table.Cell textAlign="right">
              100% <br />
              <a href="#">65 studies</a>
            </Table.Cell>
            <Table.Cell>
              Creatine is the reference compound for power improvement, with
              numbers from one meta-analysis to assess potency
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Body>
    </Container>
  </React.Fragment>
);

export default FixedMenuLayout;

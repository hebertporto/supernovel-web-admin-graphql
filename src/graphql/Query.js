import gql from 'graphql-tag';

export const NOVELS_QUERY = gql`
  query {
    novels {
      id
      name
      lastChapter {
        id
        number
        title
        createdAt
      }
    }
  }
`;

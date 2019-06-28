import gql from 'graphql-tag';

export const NOVELS_QUERY = gql`
  query NOVELS_QUERY {
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

export const NOVEL_QUERY = gql`
  query NOVEL_QUERY($id: ID!) {
    novel(id: $id) {
      name
      description
      author
      translationTeam
      coverUrl
      lastChapter {
        title
        number
      }
    }
    chapters(id: $id) {
      id
      title
      number
      createdAt
      novel {
        name
      }
    }
  }
`;

export const NOVEL_INFO_QUERY = gql`
  query NOVEL_INFO_QUERY($id: ID!) {
    novel(id: $id) {
      name
      lastChapter {
        title
        number
        createdAt
      }
    }
  }
`;

export const NOVEL_FULL_INFO_QUERY = gql`
  query NOVEL_FULL_INFO_QUERY($id: ID!) {
    novel(id: $id) {
      id
      name
      description
      author
      translationTeam
      coverUrl
    }
  }
`;

export const CHAPTER_QUERY = gql`
  query CHAPTER_QUERY($id: ID!) {
    chapter(id: $id) {
      id
      title
      number
      translators
      revisors
      content
      novel {
        id
        name
      }
      createdAt
    }
  }
`;

export const CHAPTERS_QUERY = gql`
  query CHAPTERS_QUERY($id: ID!) {
    chapters(id: $id) {
      id
      title
      number
      translators
      revisors
      content
      createdAt
    }
  }
`;

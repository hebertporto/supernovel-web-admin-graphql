import gql from 'graphql-tag';

export const LOGIN_MUTATION = gql`
  mutation LOGIN_MUTATION($email: String!, $password: String!) {
    login(data: { email: $email, password: $password }) {
      user {
        id
        name
        email
      }
      token
    }
  }
`;

export const CRAWLER_CHAPTER_MUTATION = gql`
  mutation CRAWLER_CHAPTER_MUTATION($url: String!) {
    crawledChapter(url: $url) {
      number
      title
      translators
      revisors
      content
    }
  }
`;

export const CREATE_CHAPTER_MUTATION = gql`
  mutation CREATE_CHAPTER_MUTATION(
    $number: String!
    $title: String!
    $translators: String!
    $revisors: String!
    $content: String!
    $novel: String!
  ) {
    createChapter(
      data: {
        number: $number
        title: $title
        translators: $translators
        revisors: $revisors
        content: $content
        novel: $novel
      }
    ) {
      number
    }
  }
`;

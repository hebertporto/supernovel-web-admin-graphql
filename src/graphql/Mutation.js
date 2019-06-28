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

export const REGISTER_USER_MUTATION = gql`
  mutation REGISTER_USER_MUTATION(
    $name: String!
    $email: String!
    $password: String!
  ) {
    createUser(data: { name: $name, email: $email, password: $password })
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

export const UPDATE_CHAPTER_MUTATION = gql`
  mutation CREATE_CHAPTER_MUTATION(
    $id: ID!
    $number: String!
    $title: String!
    $translators: String!
    $revisors: String!
    $content: String!
    $novel: String!
  ) {
    createChapter(
      id: $id
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

export const CREATE_NOVEL_MUTATION = gql`
  mutation CREATE_NOVEL_MUTATION(
    $name: String!
    $description: String!
    $author: String!
    $translationTeam: String!
    $coverUrl: String!
  ) {
    createNovel(
      data: {
        name: $name
        description: $description
        author: $author
        translationTeam: $translationTeam
        coverUrl: $coverUrl
      }
    ) {
      name
    }
  }
`;

export const UPDATE_NOVEL_MUTATION = gql`
  mutation UPDATE_NOVEL_MUTATION(
    $id: ID!
    $name: String!
    $description: String!
    $author: String!
    $translationTeam: String!
    $coverUrl: String!
  ) {
    updateNovel(
      id: $id
      data: {
        name: $name
        description: $description
        author: $author
        translationTeam: $translationTeam
        coverUrl: $coverUrl
      }
    ) {
      name
    }
  }
`;

export const DELETE_CHAPTER_MUTATION = gql`
  mutation DELETE_CHAPTER_MUTATION($id: ID!) {
    deleteChapter(id: $id)
  }
`;

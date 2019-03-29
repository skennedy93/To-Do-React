import gql from 'graphql-tag';

export default gql`
mutation ($user_id: ID!,$name: String!,$description: String) {
  createList(
    user_id: $user_id
    name: $name
    description: $description
  ) {
    __typename
    id
    name
    description
  }
}`;
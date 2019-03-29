
import gql from 'graphql-tag';

export default gql`
mutation ($id: ID!) {
  deleteList(id: $id) {
    __typename
    id
    name
  }
}`;
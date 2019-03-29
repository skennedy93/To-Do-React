import gql from 'graphql-tag';

export default gql`
query list( $id: ID! ) {
  list( id: $id ) {
    __typename
      id
      name
      description
  }
}`;
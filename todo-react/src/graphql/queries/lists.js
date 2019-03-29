import gql from 'graphql-tag';

export default gql`
query lists {
  lists {
    __typename
      id
      name
      description
  }
}`;
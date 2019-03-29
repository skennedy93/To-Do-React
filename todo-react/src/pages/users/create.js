import React from 'react';
import { graphql } from "react-apollo";
import createUserMutation from "../../graphql/mutations/createUser";
import UsersQuery from "../../graphql/queries/users";
import Form from "./form";

const CreateUserPage = (props) => {

  const handleSubmit = ( data ) => {
    console.log('handleSubmit',data);

    props.mutate({
      variables: data,
      optimisticResponse: {
        __typename: 'Mutation',
        createUser: {
          __typename: 'User',
          id: Math.random().toString(36).substring(7),
          name: data.name,
          email: data.email,
          phone: data.phone || '',
          address: data.address || '',
          lists: [],
        },
      },
      refetchQueries: [{ query: UsersQuery }],
      update: (proxy, { data: { createUser } }) => {
        console.log('create',data);
        const query = UsersQuery;
        const data = proxy.readQuery({ query });
        data.users.push(createUser);
        proxy.writeQuery({ query, data });
      },
    })
    .then( res => {
      props.history.push('/');
    })
    .catch( res => {
      if ( res.graphQLErrors ) {
        const errors = res.graphQLErrors.map( error => error.message );
        console.log('errors',errors);
      }
    });

  }

  return (
    <div>
      <h1>Add New User</h1>
      <p className="sub-heading">Please enter the details below to add new user.</p>

      <Form submit={ handleSubmit } />

    </div>
  )

}


export default graphql(createUserMutation)(CreateUserPage);
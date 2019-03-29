import React from 'react';
import { graphql } from "react-apollo";
import createListMutation from "../../graphql/mutations/createList";
import ListsQuery from "../../graphql/queries/lists";
import TaskForm from './taskForm';

const CreateTaskPage = (props) => {

  const handleSubmit = ( data ) => {
    console.log('handleSubmit',data);

    props.mutate({
      variables: { user_id: props.location.state.user, description: data.description, name: data.name },
      optimisticResponse: {
        __typename: 'Mutation',
        createList: {
          __typename: 'List',
          id: data.id,
          name: data.name,
          description: data.description,
        },
      },
      refetchQueries: [{ query: ListsQuery }],
      update: (proxy, { data: { createList } }) => {
        console.log('submit',data);
        const query = ListsQuery;
        const data = proxy.readQuery({ query });
        data.lists.push(createList);
        proxy.writeQuery({ query, data });
      },
    })
    .then( res => {
        const userID = props.location.state.user
        // find user.id
      props.history.push(`${userID}`);
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
      <h1>Add New Task</h1>
      <p className="sub-heading">Please enter the details below to add a new task.</p>

      <TaskForm submit={ handleSubmit } />

    </div>
  )

}


export default graphql(createListMutation)(CreateTaskPage);
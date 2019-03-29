import React from 'react';
import { graphql, compose } from "react-apollo";
import deleteListMutation from "../../graphql/mutations/deleteList";
import updateListMutation from "../../graphql/mutations/updateList";
import ListQuery from "../../graphql/queries/list";
import ListsQuery from "../../graphql/queries/lists";
import TaskForm from "./taskForm";
import Loading from '../../components/common/loading';


const UpdateTaskPage = (props) => {

    const deleteList = () => {
        if ( window.confirm('Are you sure you want to delete this task?') ) {
          props.mutate({
            variables: { id: props.match.params.id },
            optimisticResponse: {
              __typename: 'Mutation',
              deleteList: {
                __typename: 'List',
                id: props.data.list.id,
                name: props.data.list.name,
              },
            },
            refetchQueries: [{ query: ListQuery }],
            update: (proxy, { data: { deleteUser } }) => {
              const query = ListQuery;
              const data = proxy.readQuery({ query });
              data.lists = data.lists.filter(list => list.id !== deleteUser.id);
              proxy.writeQuery({ query, data });
            },
          })
          .then( res => {
            props.history.push('/user/:id');
          })
          .catch( res => {
            console.log('res',res);
          });
        }
      }

  const handleSubmit = ( data ) => {
    console.log('up',data);
    props.mutate({
      variables: data,
      optimisticResponse: {
        __typename: 'Mutation',
        updateList: {
          __typename: 'List',
          id: data.id,
          name: data.name,
          description: data.description,
          lists: data.items || [],
        },
      },
      refetchQueries: [{ query: ListsQuery }],
      update: (proxy, { data: { updateList } }) => {
        const query = ListsQuery;
        const data = proxy.readQuery({ query });
        data.lists = data.lists.map(list => list.id !== updateList.id ? list : { ...list, ...updateList });
        proxy.writeQuery({ query, data });
      },
    })
    .then( res => {
      props.history.push('/user/:id');
    })
    .catch( res => {
      if ( res.graphQLErrors ) {
        const errors = res.graphQLErrors.map( error => error.message );
        console.log('errors',errors);
      }
    });

  }


  if ( ! props.data.list ) {
    return (<Loading message="Loading task details..." />);
  }


  const { id, name, description } = props.data.list;

  return (
    <div>
      <h1>Update Task: { props.data.list.name }</h1>
      <p className="sub-heading">Make your changes and click update</p>
      <button
            className="button button--danger size--medium"
            style={{ margin: 20 }}
            onClick={ deleteList }
          >Delete</button>

      <TaskForm list={{ id, name, description }} submit={ handleSubmit } />

    </div>
  )

}


export default compose(
  graphql( ListQuery, { options: (props) => {
    return { variables: { id: props.match.params.id }
  } } } ),
  graphql(deleteListMutation, updateListMutation)
)(UpdateTaskPage);
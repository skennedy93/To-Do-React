import React from 'react';
import { Link } from "react-router-dom";
import { graphql, compose } from "react-apollo";
import UserQuery from "../../graphql/queries/user";
import Loading from '../../components/common/loading';
import deleteUserMutation from "../../graphql/mutations/deleteUser";
import List from '../../components/app/list';


const ShowUserPage = (props) => {

  if ( props.data.user ) {
    const { user } = props.data;
    return (
      <div>

        <h1>{ user.name }'s Todo List</h1>

        <div style={{ marginTop: 20 }}>
          <Link to={{ pathname:`/users/form`,
          state: {
            user:user.id
          }
        }} className="button button--danger size--medium"

          >
          Add Task
          </Link>
        </div>

        { user.lists && user.lists.length > 0 &&
        <div className="component--lists">
          { user.lists.map( list => <List key={list.id} data={list} /> ) }
        </div>
        }

        { user.lists && user.lists.length < 1 &&
          <div className="empty--data">No Tasks</div>
        }

      </div>
    );
  }

  else {
    return (
      <Loading />
    );
  }

}


export default compose(
  graphql( UserQuery, { options: (props) => {
    return { variables: { id: props.match.params.id }
  } } } ),
  graphql(deleteUserMutation)
)(ShowUserPage);
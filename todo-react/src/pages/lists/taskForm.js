import React from 'react';
import Loading from '../../components/common/loading';

class TaskForm extends React.Component {

  constructor() {
    super();
    this.state = {
      loading: false,
      error: false,
      list: {}
    }
    this.hadleInputChange = this.hadleInputChange.bind(this);
    this.submit = this.submit.bind(this);
  }


  hadleInputChange( name, event ) {
    this.setState({ list: { ...this.state.list, [name]: event.target.value } });
  }


  submit(e) {
    e.preventDefault();

    if ( ! this.props.list && ( ! this.state.list.name || ! this.state.list.description) ) {
      this.setState({ error: true });
      return;
    }
    else if ( this.props.list && this.props.list.id ) {
      this.setState({ error: false });
    }
    else {
      this.setState({ error: false });
    }


    if ( this.props.list && this.props.list.id ) {
      this.setState({ error: false, loading: true });
      this.props.submit({ ...this.props.list, ...this.state.list });
    }
    else {
      this.setState({ loading: true });
      this.props.submit( this.state.list );
    }


  }


  render() {

    const list = this.props.list || this.state.list;

    return (
      <div>

        { this.state.error &&
          <div className="error">Please enter all the required fields.</div>
        }

        <form className="form--wrapper" method="POST" onSubmit={ this.submit } autoComplete="off">

          { this.state.loading &&
            <Loading message={ list.id ? "Updating your list..." : "Adding new task." } />
          }

          { ! this.state.loading &&
          <div>

            <div className="input">
              <label htmlFor="name">Task Title</label>
              <input type="text" id="name" name="name" defaultValue={ list.name ? list.name : '' } placeholder="Enter a name for your task" onChange={ (e) => { this.hadleInputChange('name', e) } } />
            </div>

            <div className="input">
              <label htmlFor="email">Description</label>
              <input type="text" id="description" name="description" defaultValue={ list.description ? list.description : '' } placeholder="Enter a description for your task" onChange={ (e) => { this.hadleInputChange('description', e) } } />
            </div>
            <div className="input">
              <button type="submit" className="button size--large button--green">{ list.id ? 'Update Task' : 'Add Task' }</button>
            </div>

          </div>
          }

        </form>

      </div>
    )
  }

}



export default TaskForm;
import React from 'react';
import Item from './item';
import { Link } from "react-router-dom";


const List = (props) => {

  const { data: list } = props;

  return (
    <div className="list">
      <div className="title"><Link to={`/users/${list.id}/edit`} style={{color:'black', textDecoration: 'none'}}>{ list.name }</Link></div>
    </div>
  );

}

export default List;
import React from 'react';
import { NavLink } from "react-router-dom";

const Header = (props) => {

  return (
    <div className="component--header">
      <h1><NavLink to="/">ToDo Application</NavLink></h1>
    </div>
  );

}

export default Header;
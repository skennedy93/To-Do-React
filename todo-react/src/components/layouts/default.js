import React from 'react';
import Header from '../common/header';

const DefaultLayout = (props) => {

  return (
    <div className="layout--default">

      <Header />

      <div className="content" style={{ padding:20 }}>
        {/* this will render our page content */}
        { props.children }
      </div>

    </div>
  );

}

export default DefaultLayout;
import React from 'react';
import img from './pokeball.gif';
import './loader.css';


const Loader = (props => {
    
    return(
      <div className="loader">
          <img src={img} alt="Loading" />
    </div>
    );
});


export default Loader;
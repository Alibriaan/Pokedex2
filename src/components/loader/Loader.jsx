import React from 'react';
import img from './pokeball.gif';
import './loader.css';
import Fade from '@material-ui/core/Fade'


const Loader = (props => {
    
    return(
      <div className="loader">
          <img src={img} alt="Loading" />
    </div>
    );
});


export default Loader;
import React from 'react';
import Navbar from './navbar';

function contactus(){
return(

<div>
<Navbar/>
    <h1>Contact Us</h1>
    <h3 style={{
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)'  
      }}>
    Questions, Comments? You tell us. We listen.
    </h3>
    <div style={{
        position: 'absolute',
        top: '50%',
        left: '53%',
        transform: 'translate(-50%, -50%)'  
      }}><p>Office - +91 123-456-789</p>
    <p>Email - care@joggers.com</p>
    <p>Monday to Friday - 10:00 am to 6:00 pm</p></div>
</div>


)
}

export default contactus;
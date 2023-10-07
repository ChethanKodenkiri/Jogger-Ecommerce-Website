import React from "react";
import homepageImage from "../Images/ImageComponent/Images";


const backgroundImage = () =>{
    return(
        <div>
     <img src={homepageImage.homepageImage} alt="" style={{
            width: '100vw', 
            height: '100vh', 
            objectFit: 'cover',
            position: 'fixed',
            top: 0, 
            left: 0,
            zIndex: -1,
            filter: 'brightness(0.5)'  
          }} />

        </div>
       
    )
}

export default backgroundImage;
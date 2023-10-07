import React from 'react';
import {useNavigate } from 'react-router-dom';
import '../style/HomePage.css';
import '../style/index.css';
import homepageImage  from '../Images/ImageComponent/Images'
import Navbar from './navbar';


function HomePage() {
  const navigate = useNavigate();

  const handleShopNowClick = () => {
    navigate('/dashboard'); 
  }
  return (
    <div className="home-page">
      <Navbar/>
      <h1 className="page-title">GET THE JOB DONE</h1>
      <p className="page-subtitle">In the latest Air Cool collection</p>
      <img src={homepageImage.homepageImage} alt="" style={{
        width: '100vw', // Set width to 100% of viewport width 
        height: '100vh', // Set height to 100% of viewport height
        objectFit: 'cover',
        position: 'fixed', // Use fixed position
        top: 0, 
        left: 0,
        zIndex: -1,
        filter: 'brightness(0.5)'  
      }} />
      <button className="shop-now-button" onClick={handleShopNowClick}>Shop Now</button>

    </div>
  );

}

export default HomePage;
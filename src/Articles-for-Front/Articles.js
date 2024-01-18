import React from 'react';
import Data from "./Data";
import './style.css';
import Baners from "../Images/Banner.png";
const Banner = () => {
  
  return (
    <div className='container'>
      <div className='row banner'>
        <div className='col-lg-5 banner-heading'>
          <h1>Articles for <span>front-end devs</span></h1>
          <h4>Articles on web performance, responsive web design, and more</h4>
        </div>
        <div className='col-lg-7 banner-img'>
          <img src={Baners} className='img-fluid' style={{ width: "" }} alt="Banner" />
        </div>
      </div>
      <Data/>
    </div>
  );
};

export default Banner;

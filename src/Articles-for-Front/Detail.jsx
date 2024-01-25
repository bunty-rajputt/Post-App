// detail
import React from 'react';
// import { useLocation, } from 'react-router-dom';
import axios from 'axios';
import  { useEffect } from 'react';
import  { useState } from 'react';

import {useParams} from "react-router-dom";
// import data from './Data';

const Detail = () => {
  // const {state} =useLocation();

// axios calling data
const [data, setData] = useState([]);


useEffect(() => {
  axios.get("https://jsonplaceholder.typicode.com/posts/2")
    .then((response) => {
      setData(response.data);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
}, []);
// use params
// let {id}=useParams();
// const cardData=data.find(cardData=>String(cardData.id)===id);

  return (
    <div>
     <div className="container">
         <div className="row">
            <div className="col-md-12">
              <div className="card my-3">
                 <div className="card-body">
                <h2 className="card-title">{data.title}</h2>
                <p className="card-text">{data.body}</p>
                <p className="card-text">{data.id}</p> 
                 <p className="card-text">{data.userId}</p>
                 </div>
              </div>
            </div>
         </div>
         </div>
        
    </div>
  );
};

export default Detail;
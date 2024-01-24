// detail
import React from 'react';
// import { useLocation, } from 'react-router-dom';
import {useParams} from "react-router-dom";
import data from './Data';

const Detail = () => {
  // const {state} =useLocation();
let {id}=useParams();
const cardData=data.find(cardData=>String(cardData.id)===id);

  return (
    <div>
     <div className="container">
         <div className="row">
            <div className="col-md-12">
              <div className="card my-3">
                 <div className="card-body">
                <h2 className="card-title">{cardData.title}</h2>
                <p className="card-text">{cardData.body}</p>
                <p className="card-text">{cardData.id}</p> 
                 <p className="card-text">{cardData.userId}</p>
                 </div>
              </div>
            </div>
         </div>
         </div>
        
    </div>
  );
};

export default Detail;
// Detail.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Detail = () => {
  const [data, setData] = useState(null);
  const [isLoading,setIsLoading]= useState(false)
  let {id}=useParams();
  useEffect(() => {
   // Fetch details for the specific post ID
    axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => {
        setIsLoading(true)
        setData(response.data);
        
      })
      .catch((error) => {
        // setIsLoading(false)
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      {data ? (
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="card my-3">
                <div className="card-body">
                  <h2 className="card-title">{data.title}</h2>
                  <p className="card-text">{data.body}</p>
                  <p className="card-text">Post ID: {data.id}</p>
                  <p className="card-text">User ID: {data.userId}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="loader-container">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>      )}
    </div>
  );
};

export default Detail;

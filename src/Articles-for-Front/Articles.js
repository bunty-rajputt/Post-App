import './style.css';
import Baners from "../Images/Banner.png";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect } from 'react';

export const Banner = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState([]);

  // calling data to placeholder through axios
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await axios.get("https://jsonplaceholder.typicode.com/posts")
      if (result.status === 200) {
        const post = result.data;
        setData(post)
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    }
    fetchData()
  }, []);
   // delete post 
   const handleDelete = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => {
        console.log('Post deleted successfully', response);
        const update = data.filter(post => post.id !== id);
        setData(update);
      })
      .catch((error) => {
        console.error('Error deleting post', error);
      });

    }
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
      <div>
        <Link className='add-btn' to={`/add`}>Add post</Link>
        {/* Render your existing posts here */}
      </div>
      {isLoading ? (<div className="loader-container">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>) : (
        data.map((post) => {
          return (
            <div className="container " key={post.id}>
              <div className="row">
                <div className="col-md-12">
                  <div className="card my-3 post-list">
                    <div className="card-header">
                      <h5><span className="card-title">TITLE : </span>{post.title} </h5>
                    </div>
                    <div className='card-body'>
                      <p className='card-text'>{post.body}<span className='read-more'><Link to={`/readmore/${post.id}`}>Read More.......</Link></span></p>
                      

                      {/* Button trigger modal  */}
                      <button type="button"   className="green-btn " data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Delete
                      </button>

                      {/* Modal */}
                      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title" id="exampleModalLabel">Delete post</h5>
                              <button type="button" className="green-btn bg-danger" data-bs-dismiss="modal" aria-label="Close">X</button>
                            </div>
                            <div className="modal-body">
                              Are you sure you want to delete this post!
                            </div>
                            <div className="modal-footer">
                              <button type="button" className="green-btn bg-danger" data-bs-dismiss="modal">Close</button>
                              <button type="button"  className="green-btn " onClick={()=> handleDelete(post.id)}   data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Delete
                             </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            )
        })
      )}
    </div>
  );
};

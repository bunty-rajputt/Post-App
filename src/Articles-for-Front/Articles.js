import './style.css';
import Baners from "../Images/Banner.png";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import EditIcon from '@mui/icons-material/Edit';
import MenuItem from '@mui/material/MenuItem';

export const Banner = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const [selectedPost, setSelectedPost] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5); 

  const apiUrl = process.env.REACT_APP_API_KEY;
  console.log(apiUrl)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const result = await axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=${postsPerPage}`);

        if (result.status === 200) {
          const newPosts = result.data;
          setData(newPosts); 
        
        } else {
          console.error('Error fetching data:', result.statusText);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentPage, postsPerPage]);

   // hadleDelte function 
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
  };
// handle next button 
  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
    
  };

// handle previous button 
  const handlePrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };
  // select post in dropdown
  const handlePostsPerPageChange = (event) => {
    setPostsPerPage(event.target.value);
    setCurrentPage(1); // Reset to first page when changing posts per page
  };

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
      <div className='Add'>
        <Link className='add-btn' to={`/add`}><Button style={{ color: "white" }} startIcon={<AddIcon />}>Add Post</Button></Link>
      </div>
    
      {isLoading ? (<div className="loader-container">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>) : (
        <>{data.map((post) => {
          return (
            <div className="container " key={post.id}>
              <div className="row">
                <div className="col-md-12">
                  <div className="card my-3 post-list">
                    <div className="card-header">
                      <h5><span className="card-title">postId : <span>{post.id}</span> </span>{post.title} </h5>
                    </div>
                    <div className='card-body'>
                      <p className='card-text'>{post.body}<span className='read-more'><Link to={`/readmore/${post.id}`}>Read More.......</Link></span></p>
                      {/* Button trigger modal  */}
                      <Button className='delete-btn' onClick={() => setSelectedPost(post.id)} startIcon={<DeleteIcon />} type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Delete
                      </Button>
                      <Link type='btn' className=' edit-button' to={`/edit/${post.id}`} > 
                      <EditIcon/> Edit Post
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
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
                  <button type="button" className="green-btn " onClick={() => handleDelete(selectedPost)} data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <div className='pagination-container'>
      <Button onClick={handlePrevPage} disabled={currentPage === 1} variant="contained" color="primary">
          Prev Page
        </Button>
        <Button onClick={handleNextPage} disabled={data.length < postsPerPage} variant="contained" color="primary">
          Next Page
        </Button>
        <Select
          value={postsPerPage}
          onChange={handlePostsPerPageChange}
          label="Posts Per Page"
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
        </Select>
      </div>
    </div>
  );
};

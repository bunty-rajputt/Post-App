import './style.css';
import Baners from "../Images/Banner.png";
// import { useNavigate } from "react-router-dom";
import  { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect } from 'react';
// import data from './Data'
export const Banner = () => {
  // const [post,setPost]=useState(data);
  

  // axios calling data
  const [data, setData] = useState([]);


  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
 //add post
  const handleadd=() => {
    const newPost={id:101,title:"new",body:"new post"}
    setData( [...data, newPost]);
  }
  // const navigate = useNavigate();

  // const handleClick = ((data) => {
  //   if (data) {
  //     navigate(`/Detail/${data.id}`, { state:data });
  //     localStorage.setItem("Data", JSON.stringify(data))
  //   }
  // })
  const handledelete =(id)=>{
    const Delete = window.confirm('Are you sure you want to delete this post?');
    if(Delete){
      console.log(id)
      const update=data.filter(post =>post.id !==id)
      setData(update)
      console.log(update)
    }
  
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
      {/* Render your existing posts here */}

      <button onClick={handleadd}>Add New Post</button>
    </div>
      {data.map((list) => {
      
        return(
      <div className="container" key={list.id}>
        <div className="row">
          <div className="col-md-12">
            <div className="card my-3">
              <div className="card-header">
                <h5 className="card-title">{list.title} <button onClick={()=>handledelete(list.id)}>delete</button></h5>
              </div>
              <div className="card-body">
                {/* <p className="card-text">{list.body}Use Link to navigate to BlogDetail */}
              {/* <span className="read-more" onClick={() => handleClick(list)} >Read More ...</span></p> */}
              <p className='card-text'>{list.body}<span className='read-more'><Link to={`/readmore/${list.id}`}>Read More.......</Link></span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )})}
    </div>
  );
};

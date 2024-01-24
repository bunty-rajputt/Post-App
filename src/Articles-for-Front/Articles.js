import './style.css';
import Baners from "../Images/Banner.png";
// import { useNavigate } from "react-router-dom";
import  { useState } from 'react';
import { Link } from 'react-router-dom';
import data from './Data'
export const Banner = () => {
  const [post,setPost]=useState(data);
  const handleadd=() => {
    const newPost={id:101,title:"new",body:"new post"}
    setPost( [...post, newPost]);
  }
  // const navigate = useNavigate();

  // const handleClick = ((data) => {
  //   if (data) {
  //     navigate(`/Detail/${data.id}`, { state:data });
  //     localStorage.setItem("Data", JSON.stringify(data))
  //   }
  // })
  const handledelete =(id)=>{
  console.log(id)
    const update=post.filter(post =>post.id !==id)
    setPost(update)
    console.log(update)
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
      {post.map((list) => {
      
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

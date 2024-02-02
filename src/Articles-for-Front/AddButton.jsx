import { useState } from 'react';
import './style.css';
import axios from 'axios';

const AddButton = () => {
  const [newPost, setNewPost] = useState({userId:'', title: '', body: '' });
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState([]);

 

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault(); 
    if (newPost.title.length<5) {
      alert("Title must bi written 5 character ")
      return;
     }
     if (newPost.body.length<5) {
      alert("Minimum length of body 5 character ")
      return;
     }
     if (newPost.body.length >= 500 ) {
      alert("Maximum length of body 500 character")
      return;
     }else{
      alert("form is submit successfully")
     }
    axios.post(`https://jsonplaceholder.typicode.com/posts`, {newPost})
    .then((response) => {
     console.log(response,"responce -----------")
      if (response.ok) {
         return response.jason()
      }   
    })
    .catch((error)=>{
      console.log(error,'error------')
    })

  // add new post data to state
    const newPostItem = { ...newPost, id: data.length + 1 };
    setData([...data, newPostItem]);
    // clear states to the add post data
    setNewPost({ title: '', body: '', userId: '' });

  };

  return (
    <>
    {isLoading ? (<div className="loader-container">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>) :( <div className="container">
        <div>
            <div className="container shadow">
              <div className="row">
                <div className="col-md-12">
                  <div className="card my-3">
                    <div className="card-header">
                      <h5 className="card-title ">Add New Post</h5>
                    </div>
                    <div className="card-body">
                      <form onSubmit={handleFormSubmit}>
                      <div className="mb-3">
                          <label htmlFor="postTitle" className="form-label">
                            UserId
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            id="postid"
                            name="userId"
                            value={newPost.userId}
                            onChange={handleFormChange}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="postTitle" className="form-label">
                            Title
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="postTitle"
                            name="title"
                            value={newPost.title}
                            onChange={handleFormChange}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="postBody" className="form-label">
                            Body
                          </label>
                          <textarea
                            className="form-control"
                            id="postBody"
                            name="body"
                            value={newPost.body}
                            onChange={handleFormChange}
                          ></textarea>
                        </div>
                        <button type="submit" className="green-btn">
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        
        </div>
      </div>)}
    </>
  );
};

export default AddButton;

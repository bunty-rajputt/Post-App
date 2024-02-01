import { useState } from 'react';
import './style.css';
import axios from 'axios';

const AddButton = () => {
  const [newPost, setNewPost] = useState({ title: '', body: '' ,id:'',});
  const [data, setData] = useState([]);

 

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault(); 
    if (newPost.title.length<=5) {
      alert("Title must bi written 5 character ")
      return;
     }
     if (newPost.body.length<=5) {
      alert("Minimum length of body 5 character ")
      return;
     }
     if (newPost.body.length >= 500 ) {
      alert("Maximum length of body 500 character")
      return;
     }else{
      alert("form is submit successfully")
     }
    axios.post(`https://jsonplaceholder.typicode.com/posts`)
    .then((response) => {
     console.log(response,"responce -----------")
      if (response.ok) {
         return response.jason()
      }   
           })
  // add new post data to state
    const newPostItem = { ...newPost, id: data.length + 1 };
    setData([...data, newPostItem]);
    // clear states to the add post data
    setNewPost({ title: '', body: '', id: '' });

  };

  return (
    <>
      <div className="container">
        <div>
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="card my-3">
                    <div className="card-header">
                      <h5 className="card-title">Add New Post</h5>
                    </div>
                    <div className="card-body">
                      <form onSubmit={handleFormSubmit}>
                      <div className="mb-3">
                          <label htmlFor="postTitle" className="form-label">
                            Id
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            id="postid"
                            name="id"
                            value={newPost.id}
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
      </div>
    </>
  );
};

export default AddButton;

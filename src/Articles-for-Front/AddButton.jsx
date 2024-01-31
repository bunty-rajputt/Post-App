import { useState } from 'react';
import './style.css';
import axios from 'axios';

const AddButton = () => {
  const [newPost, setNewPost] = useState({ title: '', body: '' ,id:'',});
  const [data, setData] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(true);

 

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
        // Fetch details for the specific post ID
         axios.post(`https://jsonplaceholder.typicode.com/posts`)
           .then((response) => {
            console.log(response,"responce -----------")
             if (response.ok) {
                return response.jason()
             }
           })
           
       ;
    const newPostItem = { ...newPost, id: data.length + 1 };
    setData([...data, newPostItem]);
    setIsFormOpen(false);
  };

  return (
    <>
      <div className="container">
        <div>
          {isFormOpen && (
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
          )}
        </div>
      </div>
    </>
  );
};

export default AddButton;

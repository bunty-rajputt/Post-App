import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import HandleButton from './HandleButton';

const Detail = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({ userId: '', title: '', body: '' });
  const [editedData, setEditedData] = useState({  userId: '', title: '', body: ''});

  let { id } = useParams();

  useEffect(() => {
    // Fetch details for the specific post ID
    axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => {
        setIsLoading(true);
        setData(response.data);
        setEditedData({ title: response.data.title, body: response.data.body, userId: response.data.userId, id: response.data.id });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [id]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newErrors = { userId: '', title: '', body: '' };
  
    if (!editedData.userId) {
      newErrors.userId = 'User ID is required.';
    }
  
    if (editedData.title.length < 5) {
      newErrors.title = 'Title must be at least 5 characters.';
    }
  
    if (editedData.body.length < 5) {
      newErrors.body = 'Minimum length of body is 5 characters.';
    } else if (editedData.body.length >= 500) {
      newErrors.body = 'Maximum length of body is 500 characters.';
    }
  
    // Update the errors state
    setErrors(newErrors);
  
    // Check if there are any errors
    if (Object.values(newErrors).some((error) => error !== '')) {
      return;
    }
  
    // If no errors, proceed with form submission
    setIsLoading(true);
  
    // Perform save logic, update the post on the server
    // For simplicity, this example only updates the local state
    setData(editedData);
    setIsEditing(false);
  };
  

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Validate numeric input for "id" and "userId"
    if ((name === 'id' || name === 'userId') && (isNaN(value) || value <= 0)) {
      // If the input is not a positive number, don't update the state
      return;
    }

    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <HandleButton />
      {isLoading ? (
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="card my-3">
                <div className="card-body">
                  {isEditing ? (
                    <>
                      <h2>Edit Post</h2>
                      <form onSubmit={handleFormSubmit}>
                        <div className="mb-3">
                          <label htmlFor="editedTitle" className="form-label">
                            Title:
                          </label>
                          <input
                            type="text"
                            className={`form-control ${errors.title ? 'is-invalid' : ''}`}                            
                            id="editedTitle"
                            name="title"
                            value={editedData.title}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="editedBody" className="form-label">
                            Body:
                          </label>
                          <textarea
                            className={`form-control ${errors.body ? 'is-invalid' : ''}`}                            
                            id="editedBody"
                            name="body"
                            value={editedData.body}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="editedUserId" className="form-label">
                            User ID:
                          </label>
                          <input
                            type="number"
                            className={`form-control ${errors.userId ? 'is-invalid' : ''}`}                            
                            id="editedUserId"
                            name="userId"
                            value={editedData.userId}
                            onChange={handleInputChange}
                          />
                        </div>
                        <button className="btn green-btn" type="submit">
                          Save
                        </button>
                      </form>
                    </>
                  ) : (
                    <>
                      <h2 className="card-title">{data.title}</h2>
                      <p className="card-text">{data.body}</p>
                      <p className="card-text">Post ID: {data.id}</p>
                      <p className="card-text">User ID: {data.userId}</p>
                      <button className="btn btn-warning" onClick={handleEditToggle}>
                        Edit Post
                      </button>
                    </>
                  )}
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
        </div>
      )}
    </div>
  );
};

export default Detail;

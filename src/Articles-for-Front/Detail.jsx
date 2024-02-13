import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import HandleButton from './HandleButton';

const Detail = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({ userId: '', title: '', body: '' });
  const [editedData, setEditedData] = useState({ userId: '', title: '', body: '' });
  const [bodyCharacterCount, setBodyCharacterCount] = useState(0);
  const [isSubmissionSuccessful, setIsSubmissionSuccessful] = useState(false);



  let { id } = useParams();

 

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newErrors = { userId: '', title: '', body: '' };

    if (!editedData.title) {
      newErrors.title = 'title is required.';
    }

    if (editedData.title.length < 5) {
      newErrors.title = 'Title must be at least 5 characters.';
    }

    if (editedData.body.length < 5) {
      newErrors.body = 'Minimum length of body is 5 characters.';
    } else if (editedData.body.length >= 500) {
      newErrors.body = 'Maximum length of body is 500 characters.';
    }
    if (!editedData.userId) {
      newErrors.userId = 'userId is required.';
    }

    // Update the errors state
    setErrors(newErrors);

    // Check if there are any errors
    if (Object.values(newErrors).some((error) => error !== '')) {
      return;
    }
      // Check if there are any errors
  if (Object.values(newErrors).some((error) => error !== '')) {
    setIsSubmissionSuccessful(false);
    return;
  }

    // If no errors, proceed with form submission
    setIsLoading(true);

    // Perform save logic, update the post on the server
    // For simplicity, this example only updates the local state
    setData(editedData);
    setIsEditing(false);
     // Indicate successful submission
  setIsSubmissionSuccessful(true);
  };


  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };
  useEffect(() => {
    // Fetch details for the specific post ID
    axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => {
        setIsLoading(true);
        setData(response.data);
        // store data to state and show default in input feild 
        setEditedData({ title: response.data.title, body: response.data.body, userId: response.data.userId, id: response.data.id });
        // show default count words in body
        setBodyCharacterCount(response.data.body.length); 
        


      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [id]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Validate numeric input for "id" and "userId"
    if (( name === 'userId') && (isNaN(value) || value <= 0)) {
      // If the input is not a positive number, don't update the state
      return;
    }
     // Update character count for the body input
     if (name === 'body') {
      setBodyCharacterCount(value.length);
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
                          {errors.title && <div className="invalid-feedback">{errors.title}</div>}

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
                          {errors.body && <div className="invalid-feedback">{errors.body}</div>}
                          <small className="text-muted">
                            Character Count: {bodyCharacterCount}/500
                          </small>
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
                          {errors.userId && <div className="invalid-feedback">{errors.userId}</div>}

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
       {isSubmissionSuccessful && (
        <div className="alert alert-success mt-3" role="alert">
          Post edit successfully!
        </div>
      )}
    </div>
  );
};

export default Detail;

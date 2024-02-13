import React, { useState } from 'react';
import './style.css';
import axios from 'axios';
import HandleButton from './HandleButton';

const AddButton = () => {
  const [newPost, setNewPost] = useState({ userId: '', title: '', body: '' });
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ userId: '', title: '', body: '' });
  const [isSubmissionSuccessful, setIsSubmissionSuccessful] = useState(false);
  const [bodyCharacterCount, setBodyCharacterCount] = useState(0);

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    // Validate numeric input for "userId"
    if (name === 'userId' && (!/^\d+$/.test(value) || value <= 0)) {
      // If the input is not a positive integer, don't update the state
      return;
    }

    // Validate if 'e' character is present in "userId"
    if (name === 'userId' && value.includes('e')) {
      // If 'e' character is present, don't update the state
      return;
    }

    setNewPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));

    // Update character count for the body input
    if (name === 'body') {
      setBodyCharacterCount(value.length);
    }

    // Clear error message when the user starts typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newErrors = { userId: '', title: '', body: '' };

    if (!newPost.userId) {
      newErrors.userId = 'User ID is required.';
    }

    if (newPost.title.length < 5) {
      newErrors.title = '"The minimum length of the title is 5 characters."';
    }

    if (newPost.body.length < 5) {
      newErrors.body = "The minimum length of the body is 5 characters.";
    } else if (newPost.body.length >= 500) {
      newErrors.body = "The maximum length of the body is 500 characters.";
    }

    // Check if there are any errors
    if (Object.values(newErrors).some((error) => error !== '')) {
      setErrors(newErrors);
      return;
    }

    // If no errors, proceed with form submission
    setIsLoading(true);

    axios
      .post(`https://jsonplaceholder.typicode.com/posts`, { newPost })
      .then((response) => {
        console.log(response, 'response -----------');
        // Assuming response contains relevant information
        if (response.data) {
          // Add new post data to state
          const newPostItem = { ...newPost, id: data.length + 1 };
          setData([...data, newPostItem]);
          // Clear states for the added post data
          setNewPost({ title: '', body: '', userId: '' });
          setIsSubmissionSuccessful(true); // Set the success flag

        } else {
          console.error('Failed to add post:', response);
          // Handle the error case
        }
      })
      .catch((error) => {
        console.error('Error adding post:', error);
        // Handle the error case
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <HandleButton />
      {isLoading ? (
        <div className="loader-container">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="container">
          <div>
            <div className="container shadow">
              <div className="row">
                <div className="col-md-12">
                  <div className="card my-3">
                    <div className="card-header">
                      <h5 className="card-title">Add New Post</h5>
                    </div>
                    <div className="card-body">
                      <form onSubmit={handleFormSubmit}>
                        <div className="mb-3">
                          <label htmlFor="postid" className="form-label">
                            User ID
                          </label>
                          <input
                            type="number"
                            className={`form-control ${errors.userId ? 'is-invalid' : ''}`}
                            id="postid"
                            name="userId"
                            value={newPost.userId}
                            onChange={handleFormChange}
                            required
                          />
                          {errors.userId && (
                            <div className="invalid-feedback">{errors.userId}</div>
                          )}
                        </div>
                        <div className="mb-3">
                          <label htmlFor="postTitle" className="form-label">
                            Title
                          </label>
                          <input
                            type="text"
                            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                            id="postTitle"
                            name="title"
                            value={newPost.title}
                            onChange={handleFormChange}
                            required
                          />
                          {errors.title && (
                            <div className="invalid-feedback">{errors.title}</div>
                          )}
                        </div>
                        <div className="mb-3">
                          <label htmlFor="postBody" className="form-label">
                            Body
                          </label>
                          <textarea
                            className={`form-control ${errors.body ? 'is-invalid' : ''}`}
                            id="postBody"
                            name="body"
                            value={newPost.body}
                            onChange={handleFormChange}
                            required
                          ></textarea>
                          {errors.body && (
                            <div className="invalid-feedback">{errors.body}</div>
                          )}
                          <small className="text-muted">
                            Character Count: {bodyCharacterCount}/500
                          </small>
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
      )}
      {isSubmissionSuccessful && (
        <div className="alert alert-success mt-3" role="alert">
          Post submitted successfully!
        </div>
      )}
    </>
  );
};

export default AddButton;

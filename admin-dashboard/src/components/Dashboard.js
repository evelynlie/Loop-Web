import React, { useContext, useEffect, useState } from 'react';
import { gqlGetPosts, gqlDeletePost } from "../data/repository";
import { MovieContext } from './MovieContext';
import Movies from './Movies';
import './componentCSS/TopBar.css'

function Dashboard() {
  const [reviews, setReviews] = useState(null);

  // Load posts.
  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    const currentReview = await gqlGetPosts();

    setReviews(currentReview);
  };

  const handleDelete = async (post_id) => {
    if(!window.confirm(`Are you sure you want to delete?`))
      return;
    
    const isDeleted = await gqlDeletePost(post_id);

    if(isDeleted) {
      // Could remove the owner that was deleted or refresh the owners.
      // Here the owners are refreshed.
      await loadPosts();
    }
  };

  if(reviews === null)
    return null;

  return (
    <div>
      <div className="dashboard-content">
        <Movies/>
      </div>

      <div className="dashboard-content">
      <table className="table table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Title</th>
              <th>Rating</th>
              <th>Comment</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {reviews.map(review =>
              <tr >
                <td>{review.post_id}</td>
                <td>{review.username}</td>
                <td>{review.title}</td>
                <td>{review.rating}</td>
                <td>{review.comment}</td>
                
                  {/* <Link className="btn btn-primary" to={`/edit/${owner.email}`}>Edit Review</Link> */}
                  <td>
                  <button className="btn btn-danger" onClick={() => handleDelete(review.post_id)}>Delete</button>
                  </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
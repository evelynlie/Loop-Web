import axios from "axios";
// Do not delete this section. This host movie poster on react
import BarbiePoster from '../movie_posters/barbie.jpeg';
import OppenheimerPoster from '../movie_posters/oppenheimer.jpeg';
import MissionImpossiblePoster from '../movie_posters/mission_impossible.jpeg';
import TheMoonPoster from '../movie_posters/the_moon.jpeg';
import TheMarvelsPoster from '../movie_posters/the_marvels.jpeg';
import WonkaPoster from '../movie_posters/wonka.jpeg';
import ConcreteUtopiaPoster from '../movie_posters/concrete_utopia.jpeg';
import DunePartTwoPoster from '../movie_posters/dune_part_two.jpeg';

// --- Constants ----------------------------------------------------------------------------------
const API_HOST = "http://localhost:4000";

// Verify the user email and password by comparing with user data stored in database
async function verifyUser(email, password) {
  const response = await axios.get(API_HOST + "/api/users/login", { params: { email, password } });
  return response.data;
}

// Get the user details from database using email
async function getUserByEmail(email) {
  const response = await axios.get(API_HOST + "/api/users/selectByEmail/", { params: { email }});
  return response.data;
}

// Add newly signed-up user's name, email, password into database
async function createUser(user) {
  const response = await axios.post(API_HOST + "/api/users", user);
  return response.data;
}

// Get the user details from database suing username
async function findUser(username) {
  const response = await axios.get(API_HOST + `/api/users/select/${username}`);
  return response.data;
}

// update user's name and email into local storage
async function updateUser(oldUsername, updatedUsername, updatedEmail) {
  // Modify username and email to the updated value
  const response = await axios.put(API_HOST + `/api/users/update/${oldUsername}`, {email: updatedEmail, username: updatedUsername});  
  return response.data;
}

// Remove user and user's reviews from local storage
async function deleteUser(currUsername) {
  const response = await axios.delete(API_HOST + `/api/users/delete/${currUsername}`);  
  return response.data;
  // // Delete all user's reviews
  // for (var reviewIndex = reviews.length - 1; reviewIndex >= 0; --reviewIndex) {
  //   if (reviews[reviewIndex].username === currUsername) {

  //     // Recalculate average rating
  //     for(const movie of movies) {
  //       if (movie.title === reviews[reviewIndex].movie) {
  //         // Set the total rating = (average rating * rating count) - rating
  //         movie.averageRating = (movie.averageRating * movie.ratingCount) - reviews[reviewIndex].rating;
  //         // Decrement rating count
  //         movie.ratingCount--;
  //         // Calculate average rating
  //         if (movie.ratingCount === 0) {
  //           movie.averageRating = 0;
  //         }
  //         else {
  //           movie.averageRating =  movie.averageRating / movie.ratingCount;
  //         }
  //         break;
  //       }
  //     }  
      
  //     // Remove user's review
  //     reviews.splice(reviewIndex,1);
  //   }
  // }

}

// Get the reviews array from database
async function getReviews() {
  const response = await axios.get(API_HOST + "/api/posts");
  return response.data;
}

// Get the movie object from database based on movie title
async function findByMovieTitle(title) {
  const response = await axios.get(API_HOST + "/api/movies/selectByMovieTitle", {params: {title}});
  return response.data;
}

// Add user's review into local storage including the username, movie title, rating and comment
async function addNewReview(post) {
  const response = await axios.post(API_HOST + "/api/posts", post);
  return response.data;
}

// Get the movies
async function getMovies() {
  const response = await axios.get(API_HOST + "/api/movies");
  return response.data;
}

// update posts
async function updateReview(post_id, updatedRating, updatedComment) {
  // Modify rating and comment to the updated value
  const response = await axios.put(API_HOST + `/api/posts/update/${post_id}`, {rating: updatedRating, comment: updatedComment});  
  return response.data;
}

// Remove review from database
async function deleteReview(post_id) {
  const response = await axios.delete(API_HOST + `/api/posts/delete/${post_id}`);  
  return response.data;
}

// Update movie average rating
async function updateMovieAverageRating(id) {
  const response = await axios.put(API_HOST + `/api/movies/updateAverageRating/${id}`); 
  return response.data;
}

// Get Session Time based on movie id
async function getSessionTime(id) {
  const response = await axios.get(API_HOST + `/api/sessions/select/${id}`); 
  return response.data;
}

// Add newly signed-up user's name, email, password into database
async function addReservation(reservation) {
  const response = await axios.post(API_HOST + "/api/reservations", reservation);
  return response.data;
}

export {
  getReviews,
  addNewReview,
  deleteReview,
  verifyUser,
  updateUser,
  getUserByEmail,
  createUser,
  findUser,
  deleteUser, 
  updateReview,
  updateMovieAverageRating,
  getMovies,
  findByMovieTitle,
  getSessionTime, 
  addReservation
}
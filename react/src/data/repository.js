import axios from "axios";
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

const MOVIES_KEY = "movies";
const USERS_KEY = "users";
const REVIEWS_KEY = "reviews";

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

  // // Update movie average rating and increment rating counter
  // for(const movie of movies) {
  //   if(movie.title === title) {
  //     // Set the total rating = average rating * rating count
  //     movie.averageRating = movie.averageRating * movie.ratingCount;
  //     // Add new rating into total rating
  //     movie.averageRating +=  rating;
  //     // Increment rating count
  //     movie.ratingCount++;
  //     // Calculate average rating = total rating / rating count
  //     movie.averageRating =  movie.averageRating / movie.ratingCount;
  //     break;
  //   }
  //}
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
async function deleteReview(post_id, title) {
  const response = await axios.delete(API_HOST + `/api/posts/delete/${post_id}`);  
  return response.data;

  // // Update movie average rating
  // for(const movie of movies) {
  //   if(movie.title === currMovieTitle) {
  //     // Set the current total rating = (average rating * rating count) -  current rating
  //     movie.averageRating = (movie.averageRating * movie.ratingCount) - currRating;
  //     // Decrement rating count
  //     movie.ratingCount--;
  //     // Calculate average rating
  //     if (movie.ratingCount === 0) {
  //       movie.averageRating = 0;
  //     }
  //     else {
  //       movie.averageRating =  movie.averageRating / movie.ratingCount;
  //     }
  //     break;
  //   }
  // }
}

// Update movie average rating
async function updateMovieAverageRating(id) {
  const response = await axios.put(API_HOST + `/api/movies/updateAverageRating/${id}`); 
  return response.data;
}

// Initialise movies array into local storage
// function initMovies() {
//   // Stop if data is already initialised.
//   if(localStorage.getItem(MOVIES_KEY) !== null)
//     return;

//   // Hard-coded movie data
//   const movies = [
//     {
//       title: "Barbie",
//       imageURL: [BarbiePoster],
//       sessionTime: ["10:25am", "12:00pm", "2:30pm", "3:45pm", "5:00pm", "8:00pm"],
//       averageRating: 0,
//       ratingCount: 0
//     },
//     {
//       title: "Oppenheimer",
//       imageURL: [OppenheimerPoster],
//       sessionTime: ["11:25am", "1:00pm", "2:45pm", "5:00pm", "6:30pm", "7:00pm"],
//       averageRating: 0,
//       ratingCount: 0
//     },
//     {
//       title: "Mission: Impossible - Dead Reckoning Part 1",
//       imageURL: [MissionImpossiblePoster],
//       sessionTime: ["10:20am", "2:00pm", "2:45pm", "4:50pm", "5:20pm", "7:10pm", "9:00pm", "11:30pm"],
//       averageRating: 0,
//       ratingCount: 0
//     },
//     {
//       title: "The Moon",
//       imageURL: [TheMoonPoster],
//       sessionTime: ["10:25am", "12:00pm", "2:30pm", "3:45pm", "5:00pm", "8:00pm"],
//       averageRating: 0,
//       ratingCount: 0
//     },
//     {
//       title: "The Marvels",
//       imageURL: [TheMarvelsPoster],
//       sessionTime: ["9:00am", "11:10pm", "12:45pm", "2:00pm", "6:10pm"],
//       averageRating: 0,
//       ratingCount: 0
//     },
//     {
//       title: "Wonka",
//       imageURL: [WonkaPoster],
//       sessionTime: ["8:50am", "10:10pm", "11:30pm", "5:10pm", "8:10pm"],
//       averageRating: 0,
//       ratingCount: 0
//     },
//     {
//       title: "Concrete Utopia",
//       imageURL: [ConcreteUtopiaPoster],
//       sessionTime: ["11:50am", "1:00pm", "3:35pm", "4:45pm", "7:30pm", "9:30pm"],
//       averageRating: 0,
//       ratingCount: 0
//     },
//     {
//       title: "Dune Part Two",
//       imageURL: [DunePartTwoPoster],
//       sessionTime: ["10:25am", "11:00am", "12:30pm", "1:45pm", "3:00pm", "5:10pm", "7:10pm"],
//       averageRating: 0,
//       ratingCount: 0
//     }
//   ];

//   // Set movies array into local storage.
//   localStorage.setItem(MOVIES_KEY, JSON.stringify(movies));
// }

// Sort the movies array from highest to lowest
// function sortMovies() {
//   // Extract movie data from local storage.
//   const movies = getMovies();

//   // Sort Movies from highest to Lowest Rating
//   movies.sort((movie1,movie2) => movie2.averageRating - movie1.averageRating);

//   // Set movies array into local storage.
//   localStorage.setItem(MOVIES_KEY, JSON.stringify(movies));
// }

// update review's comment and rating into local storage
function editReview(newRating, newComment, postIndex) {
  const reviews = getReviews();
  const movies = getMovies();
  var movieName = null;
  var previousRating = null;

  // Update current review object
  for(const review of reviews) {
    if (reviews.indexOf(review) === postIndex) {
      //Intialise movieName variable with the review.movie
      movieName =  reviews[postIndex].movie;
      //Intialise previousRating variable with the review.rating
      previousRating = reviews[postIndex].rating;

      // Set new rating and comment for the current review object
      reviews[postIndex].rating = newRating;
      reviews[postIndex].comment = newComment;   
      break;
    }
  }

  // Update movie average rating
  for(const movie of movies) {
    if(movie.title === movieName) {
      // Set the current total rating = (average rating * rating count) -  previous rating
      movie.averageRating = (movie.averageRating * movie.ratingCount) - previousRating;
      // Add new rating into total rating
      movie.averageRating +=  newRating;
      // Calculate average rating = total rating / rating count
      movie.averageRating =  movie.averageRating / movie.ratingCount;
      break;
    }
  }

  // Set reviews array into local storage.
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
  // Set movies array into local storage.
  localStorage.setItem(MOVIES_KEY, JSON.stringify(movies));
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


  editReview,
  getMovies,


  findByMovieTitle
}
// const axios = require("axios");
import axios from "axios"; // comment this out if cannot load
import { request, gql } from "graphql-request";

// --- Constants ----------------------------------------------------------------------------------
const API_HOST = "http://localhost:4000";
const GRAPH_QL_URL = "http://localhost:4000/graphql";

// --- GraphQL ----------------------------------------------------------------------------------
async function gqlGetPosts() {
  const query = gql`
    {
      all_posts {
        post_id,
        title,
        rating,
        comment,
        username
      }
    }
  `;

  const data = await request(GRAPH_QL_URL, query);

  return data.all_posts;
}

async function gqlDeletePost(post_id) {
  const query = gql`
  mutation ($post_id: Int){
    delete_post(post_id: $post_id)
  }
  `;

  const variables = { post_id };

  const data = await request(GRAPH_QL_URL, query, variables);

  return data.delete_post;
}

async function gqlGetMovies() {
  const query = gql`
    {
      get_movies {
        movie_id,
        title,
        averageRating,
        viewCount
      }
    }
  `;

  const data = await request(GRAPH_QL_URL, query);
  return data.get_movies;
}

// --- REST API ----------------------------------------------------------------------------------
// Get the movie object from database based on movie title
async function findByMovieTitle(title) {
  const response = await axios.get(API_HOST + "/api/movies/selectByMovieTitle", {params: {title}});
  return response.data;
}

// Create movie to database
async function createMovie(movie) {
  const response = await axios.post(API_HOST + "/api/movies", movie );
  return response.data;
}

// Update movie title
async function updateMovie(id, title) {
  const response = await axios.put(API_HOST + `/api/movies/update/${id}`, { title });
  return response.data;
}

async function deleteMovie(id) {
  const response = await axios.delete(API_HOST + `/api/movies/delete/${id}`); 
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

// Get Session Time based on movie id
async function getSessionTimeID(data) {
  const response = await axios.get(API_HOST + `/api/sessions/selectID`, { params: data }); 
  return response.data;
}

// Create sessionTime with movie_id
async function createSessionTime(data) {
  const response = await axios.post(API_HOST + "/api/sessions", data );
  return response.data;
}

// Update sessionTime based on session_id
async function updateSessionTime(id, sessionTime) {
  const response = await axios.put(API_HOST + `/api/sessions/updateSessionTime/${id}`, { sessionTime });
  return response.data;
}

export {
  updateMovieAverageRating,
  findByMovieTitle,
  createMovie,
  updateMovie,
  deleteMovie,
  getSessionTime, 
  getSessionTimeID,
  createSessionTime,
  updateSessionTime,
  gqlGetPosts,
  gqlDeletePost,
  gqlGetMovies
}
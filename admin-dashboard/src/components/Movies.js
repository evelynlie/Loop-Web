import React, { useContext, useState, useEffect } from 'react';
import { MovieContext } from './MovieContext';
import { getMovies, getSessionTime } from '../data/repository';
import './componentCSS/Movies.css'
import MovieModal from './miniComponents/MovieModal';  // Import the MovieModal component

function Movies() {
  const [movies, setMovies] = useState([]);
  const { state, setSelectedMovie, clearSelectedMovie } = useContext(MovieContext);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const moviesData = await getMovies();

        // Fetch session times for each movie
        const movieSessionTimesPromises = moviesData.map(async (movie) => {
          try {
            const sessionTimes = await getSessionTime(movie.movie_id);
            return { ...movie, sessionTimes }; // Combine movie data with session times
          } catch (error) {
            console.error(`Error fetching session times for movie ${movie.movie_id}:`, error);
            return { ...movie, sessionTimes: [] }; // Return empty array for session times on error
          }
        });

        // Wait for all session times requests to complete
        const moviesWithSessionTimes = await Promise.all(movieSessionTimesPromises);
        setMovies(moviesWithSessionTimes);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchMovieData();
  }, []);

  const handleRowClick = (movie) => {
    setSelectedMovie(movie);  // Set the selected movie when a row is clicked
  };

  const closeModal = () => {
    clearSelectedMovie();
  };

  return (
    <div>
      <h1>Now Showing Movies</h1>
      <table>
        <thead>
          <tr>
            <th>Movie ID</th>
            <th>Movie Title</th>
            <th>Session Times</th>
            <th>Average Rating</th>
            <th>View Count</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.movie_id} onClick={() => handleRowClick(movie)} title='Click to edit or delete'>
              <td>{movie.movie_id}</td>
              <td>{movie.title}</td>
              <td>
                <ul>
                  {movie.sessionTimes.map((sessionTime) => (
                    <li key={sessionTime.sessionTimeId}>{sessionTime.sessionTime}</li>
                  ))}
                </ul>
              </td>
              <td>{movie.averageRating}</td>
              <td>{movie.viewCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {state.selectedMovie && (
        <MovieModal isOpen={!!state.selectedMovie} closeModal={closeModal} movie={state.selectedMovie} />
      )}
    </div>
  );
}

export default Movies;
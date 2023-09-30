import React,  { useState, useEffect } from 'react';
import './pagesCSS/Home.css';
import MovieCard from './pageResources/MovieCard';
import AboutUs from './pageResources/AboutUs'
import { getMovies, getSessionTime, addReservation } from '../data/repository';

function Home(props) {
  const [movies, setMovies] = useState([]);

  const handleSubmit = async (event, time, ticket, title) => {
    event.preventDefault();
    await addReservation({username: props.username, session_time: time, number_tickets: ticket, title: title});
  }

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        // Fetch movies from database
        const movies = await getMovies();
        // Sort Movies from highest to Lowest Rating
        movies.sort((movie1,movie2) => movie2.averageRating - movie1.averageRating);
        // Fetch session times for each movie
        const movieSessionTimesPromises = movies.map(async (movie) => {
          try {
            const sessionTimes = await getSessionTime(movie.movie_id);
            return { ...movie, sessionTimes };  // Combine movie data with session times
          } catch (error) {
            console.error(`Error fetching session times for movie ${movie.movie_id}:`, error);
            return { ...movie, sessionTimes: [] };  // Return empty array for session times on error
          }
        });

        // Wait for all session times requests to complete
        const moviesWithSessionTimes = await Promise.all(movieSessionTimesPromises);

        setMovies(moviesWithSessionTimes);
        console.log(moviesWithSessionTimes);
      } catch (error) {
        console.error('Error fetching data:', error);
    }
  };
    fetchMovieData();
  }, []);

  return (
    <>
    <h1 className='section-title'>Ticket Reservation</h1>
    <section className="movie-section">
      <div className='movie-row'>
        {/* When user HAS NOT logged in*/}
        {props.username == null &&
            <>
          {/*Display all movies*/}
          {
            movies.map((movie) =>
              <div className='movie-column'>
                <MovieCard
                imageUrl={movie.imageURL}
                title={movie.title}
                text="Click to view session time"
                averageRating = {movie.averageRating}
                type="movie"
                sessionTime={movie.sessionTimes.map((session) => session.sessionTime)}/>
              </div>
            )
          }
        </>
        }
        {/* When user HAS logged in*/}
        {props.username !== null &&
            <>
              {
            movies.map((movie) =>
              <div className='movie-column'>
                <MovieCard
                imageUrl={movie.imageURL}
                title={movie.title}
                text="Click to view session time"
                averageRating = {movie.averageRating}
                type="movieReservation"
                sessionTime={movie.sessionTimes.map((session) => session.sessionTime)}
                handleSubmit={(event, time, ticket) => handleSubmit(event, time, ticket, movie.title)}
                />
              </div>
            )
          }
          </>
        }
      </div>
    </section>

    {/* Display About Us component */}
    <AboutUs />
    
    </>
  );
}

export default Home;
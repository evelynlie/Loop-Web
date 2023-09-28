import React,  { useState, useEffect } from 'react';
import './pagesCSS/Home.css';
import MovieCard from './pageResources/MovieCard';
import AboutUs from './pageResources/AboutUs'
import { getMovies } from '../data/repository';


function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        // Fetch movies from database
        const movies = await getMovies();
        // Sort Movies from highest to Lowest Rating
        movies.sort((movie1,movie2) => movie2.averageRating - movie1.averageRating);
        setMovies(movies);
      } catch (error) {
        // Handle errors if needed
        console.error('Error fetching movies:', error);
      }
    };
    fetchMovieData();
  }, []);

  return (
    <>
    <h1 className='section-title'>Coming Soon</h1>
    <section className="movie-section">
      <div className='movie-row'>
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
              sessionTime={["1:00pm", "2:00pm"]}/>
            </div>
          )
        }
      </div>
    </section>

    {/* Display About Us component */}
    <AboutUs />
    
    </>
  );
}

export default Home;
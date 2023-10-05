// MovieContext.js
import React, { createContext, useReducer } from 'react';

const MovieContext = createContext();

const initialState = {
  isEditing: false,
  buttonsVisible: true,
  showConfirmation: false,
  selectedMovie: null, 
};

const movieReducer = (state, action) => {
  switch (action.type) {
    case 'EDIT':
      return { ...state, isEditing: true, buttonsVisible: false };

    case 'BACK':
      return { ...state, isEditing: false, buttonsVisible: true };

    case 'DELETE':
      return { ...state, showConfirmation: true, buttonsVisible: false };

    case 'CANCEL_DELETE':
      return { ...state, showConfirmation: false, buttonsVisible: true };

    case 'SET_SELECTED_MOVIE':
      return { ...state, selectedMovie: action.payload }; // Set the selected movie

    case 'CLEAR_SELECTED_MOVIE':
      return { ...state, selectedMovie: null }; // Clear the selected movie   

    case 'RESET_VIEW':
      return { ...initialState }; // Reset the view
      
    default:
      throw new Error('Unknown action type');
  }
};

const MovieProvider = ({ children }) => {
  const [state, dispatch] = useReducer(movieReducer, initialState);

  const setSelectedMovie = (movie) => {
    dispatch({ type: 'SET_SELECTED_MOVIE', payload: movie });
  };

  const clearSelectedMovie = () => {
    dispatch({ type: 'CLEAR_SELECTED_MOVIE' });
  };

  return (
    <MovieContext.Provider value={{ state, dispatch, setSelectedMovie, clearSelectedMovie }}>
      {children}
    </MovieContext.Provider>
  );
};

export { MovieProvider, MovieContext, initialState };

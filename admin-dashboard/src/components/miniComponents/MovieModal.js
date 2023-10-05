// MovieModal.js
import React, { useContext, useEffect } from 'react';
import '../componentCSS/MovieModal.css';
import { MovieContext } from '../MovieContext';
import { deleteMovie } from '../../data/repository';

const MovieModal = ({isOpen, closeModal, movie }) => {
    const { state, dispatch } = useContext(MovieContext);

    const sessionTimes = movie.sessionTimes;

    useEffect(() => {
        if (!isOpen) {
            dispatch({ type: 'RESET_VIEW' }); // Reset the view when the modal is closed
        }
    }, [isOpen, dispatch]);

    const handleEditButtonClick = () => {
        dispatch({ type: 'EDIT' });
    };

    const handleBackButtonClick = () => {
        dispatch({ type: 'BACK' });
    };

    const handleDeleteButtonClick = () => {
        dispatch({ type: 'DELETE' });
    };

    const handleCancelDelete = () => {
        dispatch({ type: 'CANCEL_DELETE' });
    };

    const resetModal = async() => {
        await dispatch({ type: 'RESET_VIEW' }); // Reset the modal view
        closeModal(); // Call the existing closeModal function to close the modal
    };

    const handleConfirmDelete = async() => {
        console.log('Delete confirmed for movie:', movie.title);
        await deleteMovie(movie.movie_id);
        alert("The movie is has been deleted!");
        closeModal(); // Close the modal

        // Refresh the movies list by reloading the page
        window.location.reload();
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted for movie:', movie.title);
    };

    return (
        <div className="modal-overlay" onClick={resetModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {state.buttonsVisible && (
            <>
                <h2>Selected Movie: {movie.title}</h2>
                <input type="button" value="Edit" onClick={handleEditButtonClick}/>
                <input type="button" value="Delete" onClick={handleDeleteButtonClick}/>
            </>
            )}
            {state.isEditing && (
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="title">Movie Title:</label>
                <input type="text" id="title" name="title" value={movie.title}/><br/>
                <label htmlFor="sessionTime">Change Session Time from:</label>
                <select id="oldSessionTime" name="oldSessionTime">
                {sessionTimes.map((session, index) => (
                    <option key={index} value={session.sessionTimeId}>
                        {session.sessionTime}
                    </option>
                ))}
                </select>
                to: <input type="text" id="newSessionTime" name="newSessionTime"/><br/>
                <br/>
                <input type="button" value="Back" onClick={handleBackButtonClick}/>
                <input type="submit" value="Submit"/>
            </form>
            )}
            {state.showConfirmation && (
            <>
                <h3>Are you sure you want to delete <strong>{movie.title}</strong>?</h3>
                <button onClick={handleCancelDelete}>Cancel</button>
                <button onClick={handleConfirmDelete}>Confirm</button>
            </>
            )}
        </div>
        </div>
    );
};

export default MovieModal;
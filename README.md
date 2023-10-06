<h1>Full Stack Development - Loop Web for Loop Cinemas</h1>

<h2>Table of Contents</h2>
    <li><a href="#overview">Overview</a></li>
    <li><a href="#features">Features</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#running-the-application">Running the Application</a></li>
    <li><a href="#contributions">Contributions</a></li>
    <li><a href="#references">References</a></li>

## Overview
Loop Cinemas is a long running cinema operator with several cinema locations around Australia. They focus on a premium, unique experience and bringing community into their cinema experiences. In addition to displaying the latest and greatest films, Loop also holds a few community events, art shows and the like at their locations.

Loop Web will help potential customers discover upcoming films, session times and see ratings and reviews from other moviegoers.

An Admin Dashboard is also created to allow Loop Cinemas admin to create, edit, and delete movie information that is displayed on Loop Web.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Features
### Loop Web
1. **Landing Home Page:** display movies and their session times.
2. **Sign Up Page:** allow users to sign up for an account.
3. **Sign In Page:** allow users to sign in to their account.
4. **For logged in users:**
    <ol type="a">
        <li><strong>Profile Page</strong></li>
        <ul>
            <li>display user profile: username, email, sign up date, and reserved tickets.</li>
            <li>edit user profile: change username and/or email.</li>
            <li>delete user profile</li>
        </ul>
        <li><strong>Review Page</strong></li>
        <ul>
            <li>allow users to leave reviews (number of stars and formatted written review) for a particular movie</li>
            <li>allow users to delete reviews</li>
            <li>allow users to edit reviews</li>
        </ul>
    </ol>
### Loop Web Admin Dashboard
1. **Movie Display**: displays "Now Showing" movie informations, such as title, session time, the average rating rated by users, and the view count.
2. **Configure Movie**:
   <ul>
        <li>add new movie and its information, such as title and session time.</li>
        <li>edit movie information.</li>
        <li>delete movie</li>
    </ul>
    
## Getting Started
<h3>Backend Server (Express) Set Up</h3>
Navigate to the <code>express</code> folder by running <code>cd express</code> and run <code>npm install</code>.

<h3>Loop Web (React) Set Up</h3>
Navigate to the react folder by running <code>cd react</code> and install the packages and dependencies required for the application by running <code>npm install</code>.

Run <code>npm axios</code> and <code>npm mdb-react-ui-kit</code>

## Running the Application
<h3>Starting the Backend Server (Express)</h3>
Before starting the frontend, the backend need to start first by navigating to the <code>express</code> folder and run <code>npm start</code>

<h3>Starting Loop Web (React)</h3>
Start the web application by navigating to the <code>react</code> folder and run <code>npm start</code>. Open your web browser and navigate to http://localhost:3000 to access the application.

<h3>Starting the Admin Dashboard (React)</h3>
Start the web application by navigating to the <code>admin-dashboard</code> folder and run <code>npm start</code>. Open your web browser and navigate to http://localhost:3005 to access the application.
<br></br>

**Note:**
<ul>
    <li>The page will reload when you make changes.</li>
    <li>You may also see any lint errors in the console.</li>
</ul>

## Contributions
- Evelyn Lie (s3951140)
- Go Chee Kin (s3955624)

## References
All movie posters displayed in the web application are obtained from the following external sources (cinema website):
- TGV Cinema: https://www.tgv.com.my/
- GSC Cinema: https://www.gsc.com.my/movies/

Coming Soon movie poster template was obtained from https://courtsoptical.com/guyana/wp-content/uploads/2016/06/coming-soon.gif

Interior cinema image displayed in About Us section of Home page is obtained from the following external source (cinema website):
- Event Cinemas: https://www.eventcinemas.com.au/experiences/Vmax

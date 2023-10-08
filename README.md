<h1>Full Stack Development - Loop Web for Loop Cinemas</h1>

<h2>Table of Contents</h2>
    <li><a href="#overview">Overview</a></li>
    <li><a href="#features">Features</a></li>
    <li><a href="#tech-stack">Tech Stack</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#running-the-application">Running the Application Locally</a></li>
    <li><a href="#contributions">Contributions</a></li>
    <li><a href="#references">References</a></li>

## Overview
Loop Cinemas is a long running cinema operator with several cinema locations around Australia. They focus on a premium, unique experience and bringing community into their cinema experiences. In addition to displaying the latest and greatest films, Loop also holds a few community events, art shows and the like at their locations.

Loop Web will help customers discover currently playing films as well as its session times, and see ratings and reviews from other moviegoers.

An admin dashboard is also created to allow Loop Cinemas admin to create, edit, and delete movie information that is displayed on Loop Web. Moreover, admin will have the feature to block and unblock users from writing a review on Loop Web, as well as delete reviews that are deemed inappropriate.

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
2. **Configure Movies**:
   <ul>
        <li>add new movie and its information, such as title and session time.</li>
        <li>edit movie information.</li>
        <li>delete movie</li>
    </ul>
3. **Block Users**: allow admin block/unblock users from accessing writing reviews in Loop Web.
4. **Delete Reviews**: allow admin to delete reviews, which will change it to "[**** This review has been deleted by the admin ***]"".

## Tech Stack
**Frontend:** HTML, CSS, JavaScript, React, Bootstrap

**HTTP Request Libraries:** Axios

**Backend:** Node.js, Express

**Database:** MySQL

**Database Interaction (ORM):** Sequelize

**API Development:** REST API, GraphQL

## Getting Started
Clone the project

```bash
  git clone https://github.com/rmit-fwp-s2-23/s3951140-s3955624-Assignment-1
```

Go to each project's folder directory one at a time
```bash
  cd express
  cd react
  cd admin-dashboard
```
Install dependencies for each folder directory

```bash
  npm install
```

## Running and Accessing the Application Locally
To run each application, navigate to each of their folder directory (<strong>express</strong>, <strong>react</strong>, and <strong>admin-dashboard</strong>) and run
```bash
  npm start
```

### Loop Web
Loop Web can be accessed on browsers through <a href="http://localhost:3000">http://localhost:3000</a>.

### Loop Cinema Admin Dashboard
Loop Cinema Admin Dashboard can be accessed on browsers through <a href="http://localhost:3005">http://localhost:3005</a>.

### REST APIs
REST APIs can be accessed on browsers through <a href="http://localhost:4000">http://localhost:4000</a>.

### GraphQL
REST APIs can be accessed on browsers through <a href="http://localhost:4000/graphql">http://localhost:4000/graphql</a>.

## Contributions
- Evelyn Lie (s3951140)
- Go Chee Kin (s3955624)

## References
All movie posters displayed in the web application are obtained from the following external sources (cinema website):
- TGV Cinema: https://www.tgv.com.my/
- GSC Cinema: https://www.gsc.com.my/movies/

Coming Soon movie poster template was obtained from: 
- Courts Optical: https://courtsoptical.com/guyana/wp-content/uploads/2016/06/coming-soon.gif

Interior cinema image displayed in About Us section of Home page is obtained from the following external source (cinema website):
- Event Cinemas: https://www.eventcinemas.com.au/experiences/Vmax

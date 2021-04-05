# Project Overview

Mosquito is a website for adding different places for easy reference when planning a trip or going hiking.

The website is Built using Firebase (Firestore and Auth), React, HTML and CSS.
The website allows for a Guest view, with limited interaction and a Logged in view with full functionality. Logged in users can Add new places, comment, tag themselves, delete or edit any place they have created. They also have access to their profile page, which shows the latest user activity as well as their latest comments.

Routing is done client-side via the React Router. The website uses a mix of class and functional components, the Context API, controlled forms and does styling via CSS components.

Architecturally, components are split into folders, containing the relevant logic, styling and assets. Services related to Authentication, Fetching data and Notifications are kept separate and imported when necessary.

# Getting Started

Clone the repo and run `npm install` to install all dependencies.

Run `npm start` to launch the website at http://localhost:3000.

In case you are getting `ERROR: No version of chokidar is available.` run `npm update` and then `npm start` again. 
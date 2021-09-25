<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/dphilipov/mosquito-react-app.git">
    <img src="./src/components/Header/mosquito-logo.png" alt="Logo" width="75">
  </a>

  <h3 align="center">Mosquito App</h3>

  <p align="center">
    Find & edit information about amazing natural landmarks!
    <br />
    <br />
    <a href="https://www.mosquitoapp.net">Live Demo</a>
    ·
    <a href="https://github.com/dphilipov?tab=repositories">Explore my other projects</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

![App Screen Shot][app-screenshot]

Mosquito allows you to find and add information about natural landmarks, to share comments & opinions about them, to tag/untag on places you have visited and to generate your own landmarks map!

## Key Features

* A **Guest view**, with limited interaction and a **Logged in view** with full functionality
* Logged in users can: 
    * **Add** new landmarks
    * **Comment**
    * **Tag** themselves
    * **Delete** or **Edit** any place they have created 
    * Access their **Profile** page, which shows the latest user activity & latest comments
* Client-side **Routing** via **React Router**
* Integration of **Open Street Maps**

The website **intentionally** uses a mix of class and functional components for practice purposes, the **Context API**, **Controlled Forms** and does styling via **CSS modules**.

Architecturally, components are split into folders, containing the relevant logic, styling and assets. Services related to **Authentication**, **Fetching data** and **Notifications** are kept separate and imported when necessary.

![Structure Screen Shot][sctructure-screenshot]

## Built With

The project is built using:
* [React](https://reactjs.org/)
* [Firebase Auth & Firestore](https://firebase.google.com/)
* [Open Street Maps via React Leaflet](https://react-leaflet.js.org/)



<!-- GETTING STARTED -->
## Getting Started



### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/dphilipov/mosquito-app.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Start the project
   ```sh
   npm start
   ```



<!-- USAGE EXAMPLES -->
## Usage

### [View the Live Demo](https://www.mosquitoapp.net)

**Register** a new account & **Login**. This allows you to **Create** new landmarks, to **Comment** on all existing ones and to **Tag/Untag** on the ones you have visited. Furthermore, you can **Edit** & **Delete** the landmarks you have created. Going to **Map** loads a map with all of your created landmarks. In your **Profile** page you can view your latest activity and **Delete** your account if needed.


<!-- CONTACT -->
## Contact

Dimitar Filipov - dphilipov@mail.bg

Project Link: [https://github.com/dphilipov/mosquito-react-app.git](https://github.com/dphilipov/mosquito-react-app.git)







[app-screenshot]: public/screenshot-updated.png
[sctructure-screenshot]: public/structure.png

import React from 'react';
import { Link } from 'react-router-dom';
// import './landingpage.css';


const LandingPage = () => {
  return (
    <div className="landing-container">
      <h2>Hello world!</h2>
      <h4>Hey there. Welcome to my new and impoved note-taking app.</h4>
      <p>
        You can view the list of saved notes by clicking 
        the Note button. To create or update a note, please login or
        register. There are links to the github repos for the frontend and backend
        at the bottom of the page.
      </p>
      <p>If you would like to see the old version of this project
        please click here: </p>
      <br></br>
      <a href="https://mynotesproject.herokuapp.com/"
        target="_blank" rel="noopener noreferrer">
        My (Original) Notes Project
      </a>
      <footer>
        <div className="button-container-bottom">
          <Link to='https://github.com/khamp19/mynotes-v2' target="_blank" rel="noopener noreferrer">
            <button className="footer-nav-button">Frontend Repo</button>
          </Link>
          <Link to='https://github.com/khamp19/notes_project_II' target="_blank" rel="noopener noreferrer">
            <button className="footer-nav-button">Backend Repo</button>
          </Link>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage;
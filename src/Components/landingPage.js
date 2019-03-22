import React from 'react';
import './landingpage.css';

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
    </div>
  )
}

export default LandingPage;
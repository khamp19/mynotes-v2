import React from 'react';
import { Link } from 'react-router-dom';

import Logout from './logout';
import AllNotes from '../../Components/Notes/AllNotes';

const SuccessPage = () => {
  return (
    <div>
      <div>
        <p>Yay you logged in</p>
        <Logout />
      </div>
      <div>
        <Link to={`/new-note`}>
          <button>Add New Note</button>
        </Link>
        <AllNotes />
      </div>
    </div>
  )
}

export default SuccessPage;
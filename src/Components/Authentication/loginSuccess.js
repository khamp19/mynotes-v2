import React from 'react';

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
        <AllNotes />
      </div>
    </div>
  )
}

export default SuccessPage;
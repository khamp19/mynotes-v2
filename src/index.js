import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';

import './index.css';
import App from './App';
import rootReducer from './Reducers/AllReducers';
import AllNotes from './Components/Notes/AllNotes';
import NoteDetail from './Components/Notes/NoteDetail';
import EditNote from './Components/Notes/EditNote';
import AddNote from './Components/Notes/AddNote';
import Register from  './Components/Authentication/register';
import Login from './Components/Authentication/login';
// import UserDashboard from './Components/Users/UserDashboard';
import UserNav from './Components/Users/UserNav';
import SignInSide from './Components/SignInTest';

const middleware = applyMiddleware(thunk, logger);
const store = createStore(rootReducer, middleware);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <header>
          <UserNav />
        </header>
        <Route exact path='/' component={App} />
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <Route path='/new-note' component={AddNote} />
        <Route exact path='/notes' component={AllNotes} />
        <Route exact path='/notes/:id' component={NoteDetail} />
        <Route exact path='/notes/:id/update' component={EditNote} />
        <Route exact path='/signin-test' component={SignInSide} />
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
    </Router>
  </Provider>
  , document.getElementById('root'));
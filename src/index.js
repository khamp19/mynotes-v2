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
// import NoteDetailTest from './Components/Notes/NoteDetailTest';
import EditNote from './Components/Notes/EditNote';
import AddNote from './Components/Notes/AddNote';
import Register from  './Components/Authentication/register';
import Login from './Components/Authentication/login';
// import UserDashboard from './Components/Users/UserDashboard';
import UserNav from './Components/Users/UserNav';
// import SignInSide from './Components/SignInTest';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';

const middleware = applyMiddleware(thunk, logger);
const store = createStore(rootReducer, middleware);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <header>
          <NavBar />
        </header>
        <Route exact path='/' component={App} />
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <Route path='/new-note' component={AddNote} />
        <Route exact path='/notes' component={AllNotes} />
        <Route exact path='/notes/:id' component={NoteDetail} />
        <Route exact path='/notes/:id/update' component={EditNote} />
        <footer>
          <Footer />
        </footer>
      </div>
    </Router>
  </Provider>
  , document.getElementById('root'));
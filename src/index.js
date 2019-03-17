import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import './index.css';
import App from './App';
import rootReducer from './Reducers/AllReducers';
import AllNotes from './Components/Notes/AllNotes';
import NoteDetail from './Components/Notes/NoteDetail';
import EditNote from './Components/Notes/EditNote';
import AddNote from './Components/Notes/AddNote';
import Register from  './Components/Authentication/register';

const middleware = applyMiddleware(thunk, logger);
const store = createStore(rootReducer, middleware);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path='/' component={App} />
        <Route path='/new-note' component={AddNote} />
        <Route path='/register' component={Register} />
        <Route exact path='/notes' component={AllNotes} />
        <Route exact path='/notes/:id' component={NoteDetail} />
        <Route path='/notes/:id/update' component={EditNote} />
      </div>
    </Router>
  </Provider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

/*
Not sure I want to do this this way bc of authentication
<Route path='/notes' component={AllNotes} />

Other Routes:
<Route path='/notes/new-note' component={NewNote} />
*/
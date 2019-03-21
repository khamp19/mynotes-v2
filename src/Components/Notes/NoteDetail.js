import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { getNote } from '../../Actions/NotesActions';
import { getUser } from '../../Actions/AuthActions';

//needs edit and delete functions as buttons
//link the home button back to the homepage

class NoteDetail extends Component {
  componentDidMount() {
    this.props.getNote(this.props.match.params.id);
    this.props.getUser();
  }

  render() {
    const { title, content, created_at, username } = this.props.note;
    const note_id = this.props.match.params.id;
    let loggedInUser = localStorage.getItem('username');
    // if(this.props.username){
    //   loggedInUser = this.props.username;
    // }
    
    let date = String(created_at);
    date = date.substr(0, 10);
    date = moment(date, "YYYY-MM-DD").format("MMM Do YYYY");

    return (
      <div>
        <div>
          {this.props.error ? <h4>Error getting this note</h4> : null}
          {this.props.note ? 
            <div>
              <div>
                <h3>title: {title}</h3>
                <p>created on: {date}</p>
              </div>
              <div>
                <p>content: {content}</p>
              </div>
              <p>created by: {username}</p>
              <div>
                {loggedInUser === username ? 
                  <div>
                    <Link to={`/notes/${note_id}/update`} >
                      <button>Edit Note</button>
                    </Link>
                    <button>Delete Note</button>
                  </div>
                  : <p>Please log in to edit or delete this note</p>
                }
              </div>
            </div>
            : null
          }
        </div>
        <div>
          <Link to='/notes'>
            <button>Back</button>
          </Link>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    getting_note: state.SelectedNoteReducer.getting_note,
    note: state.SelectedNoteReducer.note,
    error: state.SelectedNoteReducer.note_error,
  }
}


export default connect(mapStateToProps, { getNote, getUser })(NoteDetail);



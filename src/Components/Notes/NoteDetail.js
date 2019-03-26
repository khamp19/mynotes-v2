import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { getNote, deleteNote } from '../../Actions/NotesActions';
import { getUser } from '../../Actions/AuthActions';
import './noteDetail.css';

//needs edit and delete functions as buttons
//link the home button back to the homepage

class NoteDetail extends Component {
  componentDidMount() {
    this.props.getNote(this.props.match.params.id);
    this.props.getUser();
  }

  deleteNote = () => {
    const note_id = this.props.match.params.id;
    console.log('note id', note_id);
    this.props.deleteNote(note_id);
    this.props.history.push('/notes');
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
      <div className="note-detail-container">
        <div>
          {this.props.error ? <h4>Error getting this note</h4> : null}
          {this.props.note ? 
            <div className="note-info">
              <div>
                <h3>{title}</h3>
              </div>
              <div>
                <p>{content}</p>
              </div>
                <p>created by {username} on {date}</p>
            </div>
            : null
          }
        </div>
        <div className="button-container button-tools">
          <div>
            {loggedInUser === username ?
              <div>
                <Link to={`/notes/${note_id}/update`} >
                  <button className="green-button bt">Edit</button>
                </Link>
                <button className="red-button bt" onClick={this.deleteNote}>Delete</button>
              </div>
              : <p>Please log in as {username} to edit or delete this note</p>
            }
          </div>
          <Link to='/notes'>
            <button className="nav-button bt">Back</button>
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


export default connect(mapStateToProps, { getNote, getUser, deleteNote })(NoteDetail);



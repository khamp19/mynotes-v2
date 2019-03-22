import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getNote, updateNote, deleteNote } from '../../Actions/NotesActions';
import { getUser } from '../../Actions/AuthActions';
import './editNote.css';

class EditNote extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      content: '',
    }
  }

  componentDidMount(){
    this.props.getUser();
    this.props.getNote(this.props.match.params.id);
    setTimeout(()=> {
      if(this.props.note) {
        this.setState({
          title: this.props.note.title,
          content: this.props.note.content,
        })
      }
    }, 300)
  }
  

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  updateNote = (e) => {
    e.preventDefault();
    const id = this.props.match.params.id;
    const noteData = {
      title: this.state.title,
      content: this.state.content,
    }
    this.props.updateNote(id, noteData);
    this.setState({
      title: '',
      content: '',
    })
    setTimeout(()=> {
      this.props.history.push(`/notes/${id}`);
    }, 500);
  }

  deleteNote = () => {
    const note_id = this.props.match.params.id;
    console.log('note id', note_id);
    this.props.deleteNote(note_id);
    this.props.history.push('/notes');
  }

  render() {
    const { title, content } = this.state;
    let note_id = '';
    if(this.props.note){
      note_id = this.props.note.id 
    }
    let loggedInUser = localStorage.getItem('username');
    // if(this.props.username){
    //   loggedInUser = this.props.username;
    // }
    if(!loggedInUser){
      return (
        <div className="edit-note-container">
          <p>you must be logged in to edit this note</p>
          <Link to={`/notes/${note_id}`}>
            <button>Back</button>
          </Link>
        </div> 
      )
    } else if(this.props.note.username !== loggedInUser){
      return(
        <div className="edit-note-container">
         <p>you are not authorized to edit this note</p>
          <Link to={`/notes/${note_id}`}>
            <button className="nav-button">Back</button>
          </Link>
        </div> 
      )
    }

    return(
      <div className="edit-note-container">
        <div>
          <h3>Edit note</h3>
        </div>
        <div>
        {this.props.error ? <h4>error getting note</h4> : null}
        {this.props.note ? 
          <div>
            <form onSubmit={this.updateNote}>
              <input
                className="note-title"
                name="title"
                type="text"
                value={title}
                onChange={this.handleInput}
              />
              <div className="text-box">
                <textarea
                  className="note-content"
                  name="content"
                  type="textarea"
                  value={content}
                  onChange={this.handleInput}>
                </textarea>
              </div>
            </form>
          </div>
          : null}
        </div>
        <div className="button-container">
          {this.props.note.username === loggedInUser ?
            <div>
              <button
                className="green-button"
                onClick={this.updateNote}>
                Update Note
              </button>
              <button
                className="red-button"
                onClick={this.deleteNote}>
                Delete Note
              </button>
            </div>
            : <p>Please log in to edit or delete this note</p> }
          <Link to={`/notes/${note_id}`}>
            <button className="nav-button">Back</button>
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
    error: state.SelectedNoteReducer.error,
  }
}

export default connect(mapStateToProps, { getNote, getUser, updateNote, deleteNote })(EditNote);


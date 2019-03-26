//creates a new note
//on success, redirects to the new note page

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

//import add note action
import { addNote } from '../../Actions/NotesActions';
import { getUser } from '../../Actions/AuthActions';
import './addNote.css';

class AddNote extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      content: '',
      saved: false,
      loggedIn: false,
    }
  }

  componentDidMount() {
    this.props.getUser();
    setTimeout(() => {
      this.setState({ loggedIn: this.props.loggedIn});
    }, 100);
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  saveNote = (e) => {
    e.preventDefault();
    const newNote = {
      username: localStorage.getItem('username'),
      title: this.state.title,
      content: this.state.content,
    }
    // if(!newNote.title){
    //   alert 'please add a title'
    // }
    this.props.addNote(newNote);
    // setTimeout(()=> {
    //   this.setState({
    //     saved: true,
    //     title: '',
    //     content: '',
    //     // note_id: this.props.note.id
    //   })
    //   this.props.match.params.id = this.props.note.id;
    // }, 500)
    this.props.history.push('/notes/');
  }

  render() {
    if(this.state.loggedIn === false){
      return(
        <div className="add-note-container">
          <p>Please log in to create a note</p>
        </div>
      )
    }
    // if(this.state.saved === true) {
    //   const { id } = this.props.match.params.id;
    //   return <Redirect to={`/notes/${this.props.match.params.id}`} />
    // }

    const { title, content } = this.state;
    return (
      <div className="add-note-container">
        <div>
          <h3>Add New Note</h3>
          <div >
            <form onSubmit={this.saveNote}>
              <input 
                className="note-title"
                name="title"
                type="text"
                placeholder="title"
                value={title}
                onChange={this.handleInput} />
              <div className="text-box">
                <textarea 
                  className="note-content"
                  name="content"
                  type="text"
                  placeholder="add content here"
                  value={content}
                  onChange={this.handleInput}>
                </textarea>
              </div>
            </form>
            <div className="button-container button-tools">
              <button 
                  className="green-button bt"
                  onClick={this.saveNote}>
                  Save
                </button>
              <Link to='/notes'>
                <button className="nav-button bt">Back</button>
              </Link>
            </div>
          </div>
        </div>        
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    saving: state.SelectedNoteReducer.saving,
    error: state.SelectedNoteReducer.save_error,
    note: state.SelectedNoteReducer.note,
    loggedIn: state.AuthReducer.loggedIn,
  }
}

export default connect(mapStateToProps, { addNote, getUser })(AddNote);
//(follow what you did for Note Detail page)
//back button functionality

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getNote, updateNote } from '../../Actions/NotesActions';
import { getUser } from '../../Actions/AuthActions';
//import update note action

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
    //call update note function here
    const id = this.props.match.params.id;
    const noteData = {
      title: this.state.title,
      content: this.state.content,
    }
    console.log('update note id', id);
    console.log('new note info', noteData);
    this.props.updateNote(id, noteData);
    this.setState({
      title: '',
      content: '',
    })
    // setTimeout(()=> {
    //   this.props.history.push(`/notes/${id}`);
    // }, 500);
  }

  render() {
    // console.log('update note props', this.props.note);
    const { title, content } = this.state;
    let note_id = '';
    if(this.props.note){
      note_id = this.props.note.id 
    }
    let loggedInUser = localStorage.getItem('username');
    // if(this.props.username){
    //   loggedInUser = this.props.username;
    // }

    if(this.props.note.username !== loggedInUser){
      return(
        <div>
         <p>you must be logged in to edit this note</p>
          <Link to={`/notes/${note_id}`}>
            <button>Back</button>
          </Link>
        </div> 
      )
    }

    return(
      <div>
        <div>
        </div>
        <div>
          <h3>Edit note</h3>
        </div>
        <div>
        {this.props.error ? <h4>error getting note</h4> : null}
        {this.props.note ? 
          <div>
            <form onSubmit={this.updateNote}>
              <input
                className="edit-title"
                name="title"
                type="text"
                value={title}
                onChange={this.handleInput}
              />
              <input
                className="edit-content"
                name="content"
                type="textarea"
                value={content}
                onChange={this.handleInput}
              />
              <button onClick={this.updateNote}>Update Note</button>
            </form>
          </div>
          : null}
        </div>
        <div>
          <Link to={`/notes/${note_id}`}>
            <button>Back</button>
          </Link>
        </div>
      </div>
    )
  }


}

const mapStateToProps = state => {
  // console.log('note update state', state);
  return {
    getting_note: state.SelectedNoteReducer.getting_note,
    note: state.SelectedNoteReducer.note,
    error: state.SelectedNoteReducer.error,
  }
}

export default connect(mapStateToProps, { getNote, getUser, updateNote })(EditNote);


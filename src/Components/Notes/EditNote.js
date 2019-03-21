//(follow what you did for Note Detail page)
//back button functionality

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getNote } from '../../Actions/NotesActions';
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
    this.props.getNote(this.props.match.params.id);
    this.setState({
      title: this.props.note.title,
      content: this.props.note.content,
    })
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  updateNote = (e) => {
    e.preventDefault();
    //call update note function here
    this.setState({
      title: '',
      content: '',
    })
  }

  render() {
    console.log('update note props', this.props.note);
    const { title, content } = this.state;
    let note_id = '';
    if(this.props.note){
      note_id = this.props.note.id 
    }

    const loggedInUser = localStorage.getItem('username');
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
          <p>hello from edit note!</p>
        </div>
        <div>
          <form onSubmit={this.updateNote}>
            <input 
              className="edit-title"
              name="title"
              type="text" 
              placeholder={this.props.note.title}
              value={title}
              onChange={this.handleInput} />
            <input 
              className="edit-content"
              name="content"
              type="textarea" 
              placeholder={this.props.note.content} 
              value={content}
              onChange={this.handleInput} />
          </form>
        </div>
        <div>
          <button onClick={this.updateNote}>Update Note</button>
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

export default connect(mapStateToProps, { getNote })(EditNote);
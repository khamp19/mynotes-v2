//creates a new note
//on success, redirects to the new note page

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

//import add note action
import { addNote } from '../../Actions/NotesActions';

class AddNote extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      content: '',
      saved: false
    }
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  saveNote = (e) => {
    e.preventDefault();
    const newNote = {
      title: this.state.title,
      content: this.state.content,
    }
    // if(!newNote.title){
    //   alert 'please add a title'
    // }
    this.props.addNote(newNote);
    this.setState({
      saved: true,
      title: '',
      content: '',
    })
  }

  render() {
    // if(this.state.saved === true) {
    //   const {id} = this.props.note._id;
    //   return <Redirect to={`/notes/${id}`} />
    // }

    const { title, content } = this.state;
    //if saved = true Redirect here
    return (
      <div>
        <div>
          <p>Add New Note</p>
          <div>
            <form onSubmit={this.saveNote}>
              <input 
                className="new-note-title"
                name="title"
                type="text"
                placeholder="title"
                value={title}
                onChange={this.handleInput} />
              <input 
                className="new-note-content"
                name="content"
                type="text"
                placeholder="add content here"
                value={content}
                onChange={this.handleInput} />
            </form>
            <button onClick={this.saveNote}>Save Note</button>
            <Link to='/notes'><button>Back</button></Link>
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
  }
}

export default connect(mapStateToProps, { addNote })(AddNote);

// <div>
//   {this.props.note ?
//     <Redirect to={`/notes/${this.props.note._id}`} />
//     : <Redirect to={'/notes'} />
//   }
// </div>
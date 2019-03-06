//creates a new note
//on success, redirects to the new note page

import React, { Component } from 'react';
import { connect } from 'react-redux';

//import add note action

class AddNote extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      content: '',
    }
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  saveNote = (e) => {
    e.preventDefault();
    //call add note funtion here
    this.setState({
      title: '',
      content: '',
    })
  }

  render() {
    const { title, content } = this.state;
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
          </div>
        </div>
      </div>
    )
  }
}

export default AddNote;
//(follow what you did for Note Detail page)
//back button functionality

import React, { Component } from 'react';
import { connect } from 'react-redux';

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
    // console.log('update note state', this.state);

    return(
      <div>
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
          <button>Back</button>
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
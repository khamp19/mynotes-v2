import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getNote } from '../../Actions/NotesActions';

class NoteDetail extends Component {
  componentDidMount() {
    this.props.getNote(this.props.match.params.id);
    console.log('note detail props', this.props.note);
  }

  render() {
    return (
      <div>
        <div>
          <p>hello from note detail!</p>
        </div>
        <div>
          <p>Note info:</p>
          <h3>{this.props.note.title}</h3>
          <p>{this.props.note.content}</p>
          <p>{this.props.note.created_at}</p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log('note detail state', state);
  return {
    getting_note: state.SelectedNoteReducer.getting_note,
    note: state.SelectedNoteReducer.note,
    error: state.SelectedNoteReducer.error,
  }
}


export default connect(mapStateToProps, { getNote })(NoteDetail);
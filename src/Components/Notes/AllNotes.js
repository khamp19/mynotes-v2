import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllNotes } from '../../Actions/NotesActions';
import './allNotes.css';

class AllNotes extends Component {
  componentDidMount() {
    this.props.getAllNotes();
  }

  render() {
    return (
      <div className="allnotes-container">
        <div className="text-container">
          <h2>Here are All Notes</h2>
          <p>Click on the note title to access note content</p>
          <Link to={`/new-note`}>
            <button className="nav-button">Add New Note</button>
          </Link>
        </div>
        <div>
          {this.props.getting_notes ? <h3>Getting list of notes</h3> : null}
          {this.props.notes_error ? <h3>Cannot get notes</h3> : null}
          <ul>
            {this.props.notes.map((note, i) => {
              return (
                  <li key={i}>
                    <Link to={`/notes/${note._id}`}>
                      <h4>{note.title}</h4>
                    </Link>
                  </li>
                  )
              })}
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    getting_notes: state.NotesReducer.getting_notes,
    notes: state.NotesReducer.notes,
    notes_error: state.NotesReducer.notes_error
  }
}

export default connect(mapStateToProps, { getAllNotes })(AllNotes); 


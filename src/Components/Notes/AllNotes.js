import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getAllNotes } from '../../Actions/NotesActions';


class AllNotes extends Component {
  componentDidMount() {
    this.props.getAllNotes();
  }

  render() {
    return (
      <div>
        <p>Hello from AllNotes</p>
        <div>
          {this.props.getting_notes ? <h3>Getting list of notes</h3> : null}
          {this.props.notes_error ? <h3>Cannot get notes</h3> : null}
          {this.props.notes.map((note, i) => {
              return (
                <div>
                  <ul>
                    <li key={i}>
                      <Link to={`/notes/${note._id}`}>
                        <h3>{note.title}</h3>
                      </Link>
                    </li>
                  </ul>
                </div>
              )
            })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log('notes state', state);
  return {
    getting_notes: state.NotesReducer.getting_notes,
    notes: state.NotesReducer.notes,
    notes_error: state.NotesReducer.notes_error
  }
}

export default connect(mapStateToProps, { getAllNotes })(AllNotes); 


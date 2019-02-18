import React, {Component} from 'react';
import { connect } from 'react-redux';

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
          {this.props.getting_notes ? <h4>Getting list of notes</h4> : null}
          {this.props.notes_error ? <h4>Cannot get notes</h4> : null}
          {this.props.notes.map((note, i) => {
              return (
                <div>
                  <ul>
                    <li key={i}><h3>{note.title}</h3></li>
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


import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { getNote } from '../../Actions/NotesActions';

//needs edit and delete functions as buttons
//link the home button back to the homepage

class NoteDetail extends Component {
  componentDidMount() {
    this.props.getNote(this.props.match.params.id);
  }

    render() {
    const { title, content, created_at } = this.props.note;
    let date = String(created_at);
    date = date.substr(0, 10);
    date = moment(date, "YYYY-MM-DD").format("MMM Do YYYY");

    return (
      <div>
        <div>
          <header>
            <button>Home</button>
          </header>
          {this.props.error ? <h4>Error getting this note</h4> : null}
          {this.props.note ? 
            <div>
              <div>
                <h3>title: {title}</h3>
                <p>{date}</p>
              </div>
              <div>
                <p>content: {content}</p>
              </div>
              <div>
                <button>Edit Note</button>
                <button>Delete Note</button>
              </div>
            </div>
            : null
          }
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


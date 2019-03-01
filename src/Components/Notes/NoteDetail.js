import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { getNote } from '../../Actions/NotesActions';

class NoteDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
    }
  }

  componentDidMount() {
    this.props.getNote(this.props.match.params.id);
  }

  // MOVE THIS FUNCTION INTO YOUR RENDER METHOD
  // REMOVE STATE
  getDate = () => {
    if(this.props.note.id) {
    //   const date = this.state;
    //   let year = moment(date).year();
    //   let day = moment(date).date();
    //   let month = moment(date).month();
    //   let str = moment(`${day}-${month + 1}-${year}`, "Do-MM-YYYY").format('ddd, MMM Do YYYY');
    //   console.log(str);
      // this.setState({ date: str });
      console.log('state date: ', this.state.date);
    }
  }

  render() {
    const { title, content, created_at } = this.props.note;
    const { date } = this.state;
    return (
      <div>
        <div>
          {this.props.getting_note ? <h4>Getting Note</h4> : null}
          {this.props.error ? <h4>Error getting this note</h4> : null}
          {
            <div>
              <p>Note info:</p>
              <h3>title: {title}</h3>
              <p>content: {content}</p>
              {this.getDate(created_at)}
              <p>{date}</p>
            </div>
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


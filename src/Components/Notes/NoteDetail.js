import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link as RouterLink } from 'react-router-dom';

import { getNote, deleteNote } from '../../Actions/NotesActions';
import { getUser } from '../../Actions/AuthActions';
// import './noteDetail.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

const styles = theme => ({
  root: {
    height: '75vh',
    marginTop: '50px',
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
});

//needs edit and delete functions as buttons
//link the home button back to the homepage

class NoteDetail extends Component {
  componentDidMount() {
    this.props.getNote(this.props.match.params.id);
    this.props.getUser();
  }

  deleteNote = () => {
    const note_id = this.props.match.params.id;
    console.log('note id', note_id);
    this.props.deleteNote(note_id);
    this.props.history.push('/notes');
  }

  render() {
    const { title, content, created_at, username } = this.props.note;
    const { classes } = this.props;
    const note_id = this.props.match.params.id;
    let loggedInUser = localStorage.getItem('username');
    // if(this.props.username){
    //   loggedInUser = this.props.username;
    // }
    console.log(this.props.note);
    let date = String(created_at);
    date = date.substr(0, 10);
    date = moment(date, "YYYY-MM-DD").format("MMM Do YYYY");

    return (
      <div >
        <Grid container 
          component="main"
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          className={classes.root}>
          
          {/* idk if i need this 
          <CssBaseline /> */}

          {this.props.error ? <h4>Error getting this note</h4> : null}
          {this.props.note ? 
            <Grid item xs={12} sm={8} md={8}>
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {title}
                  </Typography>
                  <Typography>
                    {content}
                  </Typography>
                  </CardContent>
                  <Typography>created by {username} on {date}</Typography>
                <CardActions>
                  <Link to={`/notes/${note_id}/update`} component={RouterLink}>
                    <Button size="small" color="primary">
                      Edit note
                    </Button>
                  </Link>
                  <Button onClick={this.deleteNote}>Delete</Button>
                </CardActions>
              </Card>
              <Link to='/notes' component={RouterLink}>
                <button className="nav-button bt">Back</button>
              </Link>
            </Grid>
            : null
          }
        </Grid>
        <div className="button-container button-tools">
          <div>
            {loggedInUser === username ?
              <div>
                <Link to={`/notes/${note_id}/update`} >
                  <button className="green-button bt">Edit</button>
                </Link>
                <button className="red-button bt" onClick={this.deleteNote}>Delete</button>
              </div>
              : <p>Please log in as {username} to edit or delete this note</p>
            }
          </div>
          <Link to='/notes'>
            <button className="nav-button bt">Back</button>
          </Link>
        </div>
      </div>
    )
  }
}

NoteDetail.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  return {
    getting_note: state.SelectedNoteReducer.getting_note,
    note: state.SelectedNoteReducer.note,
    error: state.SelectedNoteReducer.note_error,
  }
}


export default connect(mapStateToProps, { getNote, getUser, deleteNote })(withStyles(styles)(NoteDetail));



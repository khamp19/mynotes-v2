import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { getAllNotes } from '../../Actions/NotesActions';
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
// import './allNotes.css';

const styles = theme => ({
  // root: {
  //   marginTop: '200px',
  // },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    marginTop: '100px',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
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

class AllNotes extends Component {
  componentDidMount() {
    this.props.getAllNotes();
  }

  render() {
    const { notes, classes } = this.props;

    return (
      <div>
        <main>
          {/* Hero unit */}
          <div className={classes.heroContent}>
            <Container maxWidth="sm">
              <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                All Notes
              </Typography>
              <Typography variant="h5" align="center" color="textSecondary" paragraph>
                View and edit notes using the view links on each card, or
                create a new note using the button below.
              </Typography>
              <div className={classes.heroButtons}>
                <Grid container spacing={2} justify="center">
                  <Grid item>
                    <Link to={`/new-note`} component={RouterLink}>
                      <Button variant="contained" color="primary">
                        Add New Note
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
              </div>
            </Container>
          </div>
          {/* End hero unit */}
          
          <Container className={classes.cardGrid} maxWidth="md">
            <Grid container spacing={4}>
              {this.props.getting_notes ? <h3>Getting list of notes</h3> : null}
              {this.props.notes_error ? <h3>Cannot get notes</h3> : null}
              {notes.map(note => (
                <Grid item key={note} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image="https://source.unsplash.com/random"
                      title="Image title"
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {note.title}
                      </Typography>
                     
                    </CardContent>
                    <CardActions style={{ display: 'flex', paddingLeft: '60%' }}>
                      <Link to={`/notes/${note._id}`} component={RouterLink} >
                        <Button size="small" color="primary" >
                          View note
                        </Button>
                      </Link>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
      </div>
    )
  }
}

AllNotes.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  return {
    getting_notes: state.NotesReducer.getting_notes,
    notes: state.NotesReducer.notes,
    notes_error: state.NotesReducer.notes_error
  }
}

export default connect(mapStateToProps, { getAllNotes })(withStyles(styles)(AllNotes)); 


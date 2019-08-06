import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
// import './landingpage.css';
import Container from '@material-ui/core/Container';
import LandingImg from '../assets/images/landing-linkedin-sales-navigator-u3hmzw5U-SI-unsplash.jpg';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    // height: '100vh',
    marginTop: '75px',
    overflow: 'hidden',
  },
  image: {
    backgroundImage: `url(${LandingImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
    height: '100vh',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(8),
    padding: theme.spacing(6, 0),
  },
}));

const LandingPage = () => {

  const classes = useStyles()

  return (
    <div className={classes.root}>

      <Grid container component="main">
        <CssBaseline />
        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Take Note
            </Typography>
            <div>
              <Typography variant="h5" align="center" color="textSecondary" paragraph>
                An app for keeping track of your thoughts
              </Typography>
              <p>
                View the list of saved notes by clicking
                the Note button. </p>
              <p>To create or update a note, please login or
                register. There are links to the github repos for the frontend and backend
                at the bottom of the page.
              </p>
              <p>If you would like to see the old version of this project
                please click here: </p>
              <Link component={RouterLink} to="https://mynotesproject.herokuapp.com/"
                target="_blank" rel="noopener noreferrer">
                My (Original) Notes Project
              </Link>
            </div>
          </div>
        </Grid>

        <Grid item xs={false} sm={4} md={6} className={classes.image} />

      </Grid>

    </div>
  )
}

export default LandingPage;
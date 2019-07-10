import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <div>
      <footer>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Links to the repos for this project
        </Typography>
        <div align="center">
          <Link href='https://github.com/khamp19/mynotes-v2' target="_blank" rel="noopener noreferrer">
            <Button>Frontend Repo</Button>
          </Link>
          <Link href='https://github.com/khamp19/notes_project_II' target="_blank" rel="noopener noreferrer">
            <Button>Backend Repo</Button>
          </Link>
        </div>
      </footer>
    </div>
  )
}

export default Footer;
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../Actions/AuthActions';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Logout from './Authentication/logout';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Link from '@material-ui/core/Link';

const styles = theme => ({
  root: {
    width: '100%',
    position: 'fixed',
    zIndex: 1000,
    top: 0,
    marginBottom: 30,
    color: 'white',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
    color: 'white',
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: 'none', 
    display: 'flex',
  },
  
});

class NavBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      anchorEl: false,
    }
  }

  //check logged-in status
  async componentDidMount() {
    await this.props.getUser();
  }

  async componentDidUpdate(prevProps) {
    if (this.props.loggedIn !== prevProps.loggedIn) {
      await this.props.getUser();
    }
  }

  // handleMobileMenuOpen = event => {
  //   this.setState({ mobileMoreAnchorEl: event.currentTarget });
  // };

  // handleMobileMenuClose = () => {
  //   this.setState({ mobileMoreAnchorEl: null });
  // };

  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  render(){
    const { classes } = this.props;
    const { anchorEl, } = this.state;
    const auth = this.props.loggedIn;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBar position="static">

          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              <Link to='/' component={RouterLink} style={{color: 'white'}}>
                Take Note
              </Link>
            </Typography>

            {auth && (
              <div>
                <IconButton
                  aria-label="Account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem>
                    <Link to='/notes' component={RouterLink} className={classes.link} variant="body2" style={{ textDecoration: 'none', display: 'flex' }}>
                      All Notes
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to='/new-note' component={RouterLink} className={classes.link} variant="body2" style={{ textDecoration: 'none', display: 'flex' }}>
                      New Note
                    </Link>
                  </MenuItem>
                  {/*<MenuItem>Profile</MenuItem>*/}
                  {/*<MenuItem>About</MenuItem>*/}
                  <MenuItem>
                    <Logout />
                  </MenuItem>
                </Menu>
              </div>
            )}
            {!auth && (
              <div>
                <IconButton 
                  aria-label="Public Menu"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit">
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem>
                    <Link to='/login' component={RouterLink} className={classes.link} variant="body2" >
                      Login
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to='/register' component={RouterLink} className={classes.link} variant="body2" >
                      Register
                    </Link>
                  </MenuItem>
                </Menu>
              </div>
            )}

          </Toolbar>
        </AppBar>
      </div>
    );
  }
  
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  return {
    loggedIn: state.AuthReducer.loggedIn,
  }
}

export default connect(mapStateToProps, { getUser })(withStyles(styles)(NavBar));

//for mobile:
// <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
//   <MenuIcon />
// </IconButton>
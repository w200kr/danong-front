import React from 'react';
import { useForm } from "react-hook-form";
import { fade, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import InputAdornment from '@material-ui/core/InputAdornment';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Box from '@material-ui/core/Box';

import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';

import FormTextField from 'components/Atoms/FormTextField/FormTextField.js'

const useStyles = makeStyles((theme) => ({
  // grow: {
  //   flexGrow: 1,
  // },
  // menuButton: {
  //   marginRight: theme.spacing(2),
  // },
  // title: {
  //   display: 'none',
  //   [theme.breakpoints.up('sm')]: {
  //     display: 'block',
  //   },
  // },
  // search: {
  //   position: 'relative',
  //   borderRadius: theme.shape.borderRadius,
  //   backgroundColor: fade(theme.palette.common.white, 0.15),
  //   '&:hover': {
  //     backgroundColor: fade(theme.palette.common.white, 0.25),
  //   },
  //   marginRight: theme.spacing(2),
  //   marginLeft: 0,
  //   width: '100%',
  //   [theme.breakpoints.up('sm')]: {
  //     marginLeft: theme.spacing(3),
  //     width: 'auto',
  //   },
  // },
  // searchIcon: {
  //   padding: theme.spacing(0, 2),
  //   height: '100%',
  //   position: 'absolute',
  //   pointerEvents: 'none',
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // inputRoot: {
  //   color: 'inherit',
  // },
  // inputInput: {
  //   padding: theme.spacing(1, 1, 1, 0),
  //   // vertical padding + font size from searchIcon
  //   paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
  //   transition: theme.transitions.create('width'),
  //   width: '100%',
  //   [theme.breakpoints.up('md')]: {
  //     width: '20ch',
  //   },
  // },
  // sectionDesktop: {
  //   display: 'none',
  //   [theme.breakpoints.up('md')]: {
  //     display: 'flex',
  //   },
  // },
  // sectionMobile: {
  //   display: 'flex',
  //   [theme.breakpoints.up('md')]: {
  //     display: 'none',
  //   },
  // },
}));

export default function Header({brandComponent}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const { handleSubmit, errors, control } = useForm({
    reValidateMode: 'onBlur'
  });

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const baseControllerProps = {
    control: control,
    defaultValue: '',
  }
  
  const preventDefault = (event) => event.preventDefault();

  return (
    <div className={classes.grow}>
      <AppBar position="static" color='default'>
        <Container maxWidth='md' disableGutters>
          <Toolbar disableGutters>
            <Grid 
              container   
              justify="center"
              alignItems="center"
            >
              <Grid item>
                {brandComponent}
              </Grid>
              <Grid item xs container justify="center">
                <FormTextField 
                  name='username'
                  controllerProps={{...baseControllerProps}}
                  fieldProps={{
                    label: '원하시는 지역/상품명을 입력해주세요',
                    variant: 'outlined',
                    margin: 'dense',
                    size: 'medium',
                    InputProps: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton edge='end' onClick={()=>{alert('search')}} onMouseDown={(event) => {
                            event.preventDefault();
                          }}>
                            <SearchIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                    style:{maxWidth:'300px', margin:'auto'}
                  }}
                />
              </Grid>
              <Grid item style={{display:'flex'}}>
                <Button onClick={()=>alert()}>
                  커뮤니티
                </Button>
                <Button>
                  장바구니
                </Button>
                <Button>
                  찜
                </Button>
                <Button>
                  로그인 · 회원가입
                </Button>
              </Grid>

            {/*
            <Hidden smDown>
              <FormTextField 
                name='username'
                controllerProps={{...baseControllerProps}}
                fieldProps={{
                  label: '원하시는 지역/상품명을 입력해주세요',
                  variant: 'outlined',
                  InputProps: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton edge='end' onClick={()=>{alert()}} onMouseDown={(event) => {
                          event.preventDefault();
                        }}>
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
              <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton aria-label="show 17 new notifications" color="inherit">
                <Badge badgeContent={17} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Link href="#" onClick={preventDefault}>
                Link
              </Link>

            </Hidden>
            <Hidden mdUp>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Hidden>
            */}
            </Grid>
            {/*
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              Material-UI
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
            <div className={classes.grow} />
            */}



            {/*

            <div className={classes.sectionDesktop}>
            </div>
            <div className={classes.sectionMobile}>
            </div>
            */}
          </Toolbar>
        </Container>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}

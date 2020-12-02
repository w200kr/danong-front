const searchBarStyle = theme => ({
  appBar: {
    alignItems: 'stretch',
  },
  toolBar: {
    justify: "flex-start",
    alignItems: 'stretch',
    height: '100%',
    minHeight: 'auto',
  },
  toolBarPaper:{
    display: 'flex',
    contentJustify: "flex-start",
    alignItems: 'stretch',
    width: '100vw',
    height: '100%',

    [theme.breakpoints.down('sm')]: {
      overflowX : 'auto',
      flexWrap: 'nowrap',
      '& *': {
        flex: '0 0 auto',
      },
    },
  },
  root: {
    // padding: '2px 4px',
    display: 'flex',
    justify: "flex-start",
    alignItems: 'stretch',
    width: 'auto',
    // width: 400,
    // height: 70,
  },
  input: {
    marginLeft: theme.spacing(1),
    width: 250,
    [theme.breakpoints.down('sm')]: {
      width: 200,
    },
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 'auto',
    marginRight: 10,
    [theme.breakpoints.down('sm')]: {
      marginRight: 0,
    },
  },
  toggleButton: {
    borderRadius: 20,
    // width: 100,
    marginLeft: 10,
    marginRight: 10,

    [theme.breakpoints.down('sm')]: {
      padding: 0,
      width: 'auto',
      marginLeft: 0,
      marginRight: 0,
      whiteSpace: 'nowrap',
    },
  },
  endIcon: {
    display: 'inherit',
    marginRight: -4,
    marginLeft: 8,
    // '&$iconSizeSmall': {
    //   marginRight: -2,
    // },
  },
  popover: {
  },
  box: {
    // padding: 12,
    height: '100%',
  },
  innerBox: {
    padding: 12,
  },
  panel: {
    width: '60vw',
    maxHeight: 300,
    // padding: 5,
    borderRadius: 20,
    border: '1px solid black',

    [theme.breakpoints.down('sm')]: {
      width: '100vw',
    }
  },
  smallPanel:{
    width: '20vw',
  },
  helperText:{
    color: 'rgba(0, 0, 0, 0.54)',
    margin: 0,
    fontSize: '0.75rem',
    marginTop: 5,
  }
});

export default searchBarStyle;

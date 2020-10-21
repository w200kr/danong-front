const searchStyle = theme => {
  return ({
    root:{
    },
    // offset: theme.mixins.toolbar,
    links: {
      display: 'flex',
      // justifyContent: 'flex-end',

      '& *':{
        width: 'auto',
      }
    },
    container: {
    },
  })
}

export default searchStyle;

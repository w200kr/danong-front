const searchStyle = theme => {
  return ({
    root:{
      height: '100vh',
      display: 'flex',
      overflow: 'hidden',
      flexDirection: 'column',
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
      // backgroundColor: 'yellow',
      flex: '1 1 auto',
      display: 'flex',
      overflow: 'hidden',
      flexWrap: 'nowrap',

      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column-reverse',
      },
    },
    productSection: {
      // backgroundColor: 'yellow', 
      // flex: '0 0 auto',
      overflow: 'scroll', 

      '-ms-overflow-style': 'none', // IE에서 스크롤바 감춤
      '&::-webkit-scrollbar': { 
        display: 'none !important', // 윈도우 크롬 등
      },


      padding: 4, 
    },
    mapSection: {
      // flex: '1 1 auto',

      display: 'flex',

      "& *": {
        flex: '1',
      },
    }
  })
}

export default searchStyle;

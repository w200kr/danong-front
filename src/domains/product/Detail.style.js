const searchStyle = theme => {
  return ({
    root:{
      // display: 'flex',
      // flexDirection: 'row',
    },
    container: {
      // backgroundColor: 'yellow',
      // flex: '1 1 auto',
      // display: 'flex',
      // flexWrap: 'nowrap',
      // height: '100vh',
    },
    horizontalDivider: {
      marginTop: 40,
      marginBottom: 40,
    },
    summary: {
      // height: '100vh',
      // backgroundColor: 'yellow'
    },
    mainImageBox: {
      padding: 30,
    },
    mainImage: {
      margin: 'auto',
    },
    slider: {
      height: 410,
      width: 410,
    },
    tabs: {
      width: '100vw',
      height: 50,
      backgroundColor: '#707070',
    },
    links: {
      display: 'flex',
      color: 'white',
      '& *':{
        width: 'auto',
        fontSize: 20,
        padding: 8,
      }
    },
    detail: {
    },
    roundButton: {
      margin:12,
      borderRadius: 10,
    },
    roundBox: {
      marginTop: 20,
      marginBottom: 40,
      paddingTop: 20,
      paddingBottom: 20,
      borderRadius: 20,
      border: '1px solid black',
    },
    profileTitle:{
      marginBottom: 100,
    },
    profileSubTitle:{
      marginBottom: 12,
    },
    sellerInfo: {

    },
    productInfo: {

    },
    soilInfo: {

    },
    reviews: {
      marginTop: 100,
    },
  })
}

export default searchStyle;

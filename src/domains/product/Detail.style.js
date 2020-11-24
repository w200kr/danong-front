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
      marginTop: 10,
      marginBottom: 10,
    },
    summary: {
      paddingTop: 50,
      paddingBottom: 50,
      // height: '100vh',
      // backgroundColor: 'yellow'
    },
    mainImageBox: {
      padding: 30,
    },
    mainImage: {
      width: '100%',
      maxWidth: 400,
      margin: 'auto',
    },
    slider: {
      height: 410,
      width: 410,

      '& .slick-prev:before, .slick-next:before': {
        color: 'black',
      },
      '& .slick-dots': {
        bottom: 'inherit',
      },
      '& .slick-dots li': {
        width: 'auto',
        margin: 0,
      },
    },
    productInfo: {
      padding: 30,
    },
    tabs: {
      width: '100vw',
      height: 50,
      backgroundColor: '#707070',
      // marginTop: 30,
      // marginBottom: 30,
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
      paddingTop: 16,
      paddingBottom: 16,
      borderRadius: 20,
      border: '1px solid black',
    },
    profileTitle:{
      marginBottom: 30,
    },
    profileSubTitle:{
      marginBottom: 12,
    },
    lineBreak:{
      whiteSpace: 'pre-line',
    },
    sellerInfo: {
      paddingTop: 40,
      paddingBottom: 30,
    },
    soilInfo: {

    },
    reviews: {
      paddingTop: 50,
      paddingBottom: 50,
      // marginTop: 100,
    },
    review:{
      padding: 10,
    },
    reviewAvatar:{
      marginRight: 12,
    },
    reviewText:{
      paddingTop: 6,
    },
  })
}

export default searchStyle;

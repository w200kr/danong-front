export default theme => {
  return ({
    root:{
      minHeight: '100vh',
    },
    form: {
      flex: '1 1 auto',
    },
    field: {
      marginTop: 10,
    },
    container:{
      paddingTop: 40,
      paddingBottom: 40,
    },
    title:{
      marginBottom: 30,
    },
    avatar: {
      width: 150,
      height: 150,
      marginBottom: 20,
    },
    categoryRadio:{
      marginTop: 20,
      display: 'flex',
      textAlign: 'center',
      alignItems: 'center',
    }
  })
}

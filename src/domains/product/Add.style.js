export default (theme) => {
  return ({
    root: {
      // minHeight: '120vh',
    },
    title: {
      marginTop: 10,
      marginBottom: 20,
    },
    container: {
      paddingTop: 20,
      paddingBottom: 20,
      height: 'auto',
    },
    field: {
      marginTop: 8,
    },
    progress: {
      // margin: theme.spacing.unit,
    },
    aptitudeTableDiv: {
      width: '100%',
      textAlign: 'center',

      '& table': {
        width: '100%',
        color: "#444444",
        border: '1px solid #444444',
        borderCollapse: 'collapse',

        '& th': {
          backgroundColor: '#f1f1f1',
        },
        '& th.s_head': {
          backgroundColor: '#f7f3f3',
        },
        '& th, td': {
          border: '1px solid #444444',
        },
      },
    }
  })
}

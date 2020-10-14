const FooterStyle = (theme)=>({
    footer: {
        backgroundColor: '#333333',
        color: '#888',
    },

    divider: {
        backgroundColor: '#888',
        // backgroundColor: 'white',
    },

    list: {
        display: 'inline-flex',
        whiteSpace: 'nowrap',

        [theme.breakpoints.down('xs')]: {
          display: 'block',
        },
        // flexDirection: 'row',
        paddingTop: '40px',
        paddingBottom: '30px',


        color: "inherit",
        fontWeight: "500",
        fontSize: "12px",
        textTransform: "uppercase",
        textDecoration: "none",
    },

    listItem: {
        paddingTop: "0px",
        paddingBottom: "0px",
    },
    listItemText: {
        margin: "0px",
    },

    companyInfoBox: {
        paddingTop: '30px',
        paddingBottom: '40px',


        fontWeight: "600",
        fontSize: "12px",
        textTransform: "uppercase",
        textDecoration: "none",
    },
});

export default FooterStyle;

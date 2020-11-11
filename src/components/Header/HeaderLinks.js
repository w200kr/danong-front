import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import {List, ListItem, ListItemText} from '@material-ui/core'

const useStyles = makeStyles((theme)=>({
    links: {
        display: 'flex',

        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
        },
        '& *':{
            width: 'auto',
        }
    },
}));


function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

const DefaultRightLinks = ()=>{
    const classes = useStyles();
    const history = useHistory();

    return (
        <List className={classes.links}>
            <ListItemLink onClick={()=>history.push('/')}>
                <ListItemText primary="재료찾기" />
            </ListItemLink>
            <ListItemLink onClick={()=>history.push('/')}>
                <ListItemText primary="관심목록" />
            </ListItemLink>
            <ListItemLink onClick={()=>history.push('/')}>
                <ListItemText primary="재료등록" />
            </ListItemLink>
            <ListItemLink onClick={()=>history.push('/')}>
                <ListItemText primary="내정보" />
            </ListItemLink>
            <ListItemLink onClick={()=>history.push('/login')}>
                <ListItemText primary="로그인" />
            </ListItemLink>
        </List>
    )
}

export {DefaultRightLinks};
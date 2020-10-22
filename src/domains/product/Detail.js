import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import { useForm } from "react-hook-form";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {Box, Container, Grid, InputAdornment, IconButton, List, ListItem, ListItemText, Link, Paper} from '@material-ui/core';
import withWidth from '@material-ui/core/withWidth';

import { Apps, CloudDownload } from "@material-ui/icons";
import SearchIcon from '@material-ui/icons/Search';

import { RenderAfterNavermapsLoaded, NaverMap, Marker } from 'react-naver-maps'; // 패키지 불러오기

// import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Logo from 'components/Atoms/Logo/Logo.js'

import FormTextField from 'components/Atoms/FormTextField/FormTextField.js'
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import SearchBar from "./SearchBar.js";
import ProductCard from "./ProductCard.js";


import styles from "./Detail.style.js";

const useStyles = makeStyles(styles);

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}


const Detail = (props)=> {
  const classes = useStyles();
  const {history, width, ...rest } = props;
  const maxWidth = 'xl';

  const { handleSubmit, errors, control } = useForm({
    reValidateMode: 'onBlur'
  });

  const baseControllerProps = {
    control: control,
    defaultValue: '',
  }

  const products = [{
    },{
    },{
    },{
    },{
    },{
    },{
    },{
    },{
    },{
    },{
    },{
    },{
    },{
  }]

  return (
    <Box className={classes.root} component="div" display='flex' flexDirection="column">
      <Header 
        brand={
          <Logo />
        }
        leftLinks={
          <List className={classes.links}>
          </List>
        }
        rightLinks={
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
        }
      />
      <Grid className={classes.container} container>
        kjdfk
      </Grid>
    </Box>
  );
};

// export default Search;
export default withWidth()(Detail);

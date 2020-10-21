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

import Tabs from 'containers/Tabs/Tabs.js'

// import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Logo from 'components/Atoms/Logo/Logo.js'

import FormTextField from 'components/Atoms/FormTextField/FormTextField.js'
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import SearchBar from "./SearchBar.js";
import ProductCard from "./ProductCard.js";


import styles from "./Search.style.js";

const useStyles = makeStyles(styles);


function NaverMapAPI(){
  const navermaps = window.naver.maps;

  return (
    <NaverMap
      mapDivId={'maps-getting-started-uncontrolled'} // default: react-naver-map
      style={{
        width: '100%', // 네이버지도 가로 길이
        height: '100%' // 네이버지도 세로 길이
      }}
      defaultCenter={{ lat: 37.551229, lng: 126.988205 }} // 지도 초기 위치
      defaultZoom={13} // 지도 초기 확대 배율
    >
      <Marker
        key={1}
        position={new navermaps.LatLng(37.551229, 126.988205)}
        animation={2}
        onClick={() => {alert('여기는 N서울타워입니다.');}}
      />
    </NaverMap>
  )

} 

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}



const Search = (props)=> {
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
    <Box className={classes.root} component="div" display='flex' flexDirection="column" overflow="hidden" height="100vh">
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
      {/*
      <div className={classes.offset} />
      */}
      <SearchBar />
      <Grid className={classes.container} container>
        <Grid className={classes.productSection} item xs={12} sm={12} md={12} lg={7} xl={7} container justify="space-evenly" alignItems="center" alignContent="flex-start">
          {
            products.map((product, index)=>(
              <Grid item xs={12} sm={6} md={6} lg={4} xl={3} key={index}>
                <ProductCard {...product} history={history} />
              </Grid>
            ))
          }
          <Grid item xs />
        </Grid>
        <Grid className={classes.mapSection} item xs={12} sm={12} md={12} lg={5} xl={5} >
          <RenderAfterNavermapsLoaded
            ncpClientId='m11ogby6ag'
            error={<p>Maps Load Error</p>}
            loading={<p>Maps Loading...</p>}
          >
            <NaverMapAPI />
          </RenderAfterNavermapsLoaded>
        </Grid>
      </Grid>
    </Box>
  );
};

// export default Search;
export default withWidth()(Search);

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

import loadJs from 'load-js';

import { RenderAfterNavermapsLoaded, NaverMap, Marker } from 'react-naver-maps'; // 패키지 불러오기

// import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Logo from 'components/Atoms/Logo/Logo.js'

import FormTextField from 'components/Atoms/FormTextField/FormTextField.js'
import makeMarkers from 'components/Marker/Marker.js'
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import SearchBar from "./SearchBar.js";
import ProductCard from "./ProductCard.js";

import {Fetch} from 'utils/Fetch.js'
import customCluster from 'utils/MarkerClustering.js'
import sampleData from 'sample.js'

import styles from "./WishList.style.js";

const useStyles = makeStyles(styles);


const WishList = (props)=> {
  const classes = useStyles();
  const {history, ...rest } = props;

  const [center, setCenter] = React.useState({ lat: 36.2253017, lng: 127.6460516 });
  const [zoom, setZoom] = React.useState(7);
  const [products, setProducts] = React.useState([{
    },{
  }])

  const handleClick = (address) => async () => {
    if (address===''){
      alert('주소를 입력해주세요.')
      return ;
    }
    setZoom(9)
    // let response = await Fetch.get('/api/navermap/geocode/'+address)
    // if (response.status==='OK' && response.meta.totalCount > 0){
    //   setCenter({lat: response.addresses[0].y, lng: response.addresses[0].x})
    // }
  }

  const handleCenter= center => setCenter(center) 

  return (
    <Box className={classes.root} component="div" display='flex' flexDirection="column" overflow="hidden" height="100vh">
      <Header 
        brand={
          <Logo />
        }
      />
      <Grid className={classes.container} container>
        <Grid className={classes.productSection} item xs={12} sm={12} md={12} lg={12} xl={12} container justify="space-evenly" alignItems="center" alignContent="flex-start">
          {
            products.map((product, index)=>(
              <Grid item xs={12} sm={6} md={6} lg={4} xl={3} key={index}>
                <ProductCard {...product} history={history} />
              </Grid>
            ))
          }
          <Grid item xs />
        </Grid>
      </Grid>
    </Box>
  );
};

// export default Search;
export default WishList;

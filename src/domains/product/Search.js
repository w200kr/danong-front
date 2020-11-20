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

import styles from "./Search.style.js";

const useStyles = makeStyles(styles);


function NaverMapAPI(props){
  const navermaps = window.naver.maps;
  const N = window.N;

  const {center, handleCenter, zoom, products} = props;

  const MarkerClustering = customCluster(navermaps)

  const naverMapRef = React.useRef(null);

  React.useEffect(()=>{
    // console.log('useEffect')
    // console.log(naverMapRef.current)
    // console.log(window.naver)

    let markers = [];

    products.map(product=>{
      var latlng = new navermaps.LatLng(product.lat, product.lng);
      var marker = new navermaps.Marker({
        position: latlng,
        draggable: true,
      });

      markers.push(marker);
    })

    console.log(markers)

    var markerClustering = new MarkerClustering({
      minClusterSize: 1,
      maxZoom: 13,
      map: naverMapRef.current.map,
      markers: markers,
      disableClickZoom: false,
      gridSize: 80,
      icons: makeMarkers(N),
      indexGenerator: [10, 20, 30, 50, 100],
      stylingFunction: function(clusterMarker, count) {
        clusterMarker.getElement().firstElementChild.textContent=count
      }
    });
  },[products])

  console.log(center)

  return (
    <NaverMap
      // mapDivId={'maps-getting-started-uncontrolled'} // default: react-naver-map
      style={{
        width: '100%', // 네이버지도 가로 길이
        height: '100%' // 네이버지도 세로 길이
      }}
      // defaultCenter={center} // 지도 초기 위치
      // center={center}
      onCenterChanged={props=>{
        console.log('onCenterChanged')
        console.log(props)
      }}
      onBoundsChanged={(props)=>{
        console.log('onBoundsChanged')
        console.log(props)
      }}
      zoomControl={true}
      zoomControlOptions={{
        position: navermaps.Position.TOP_LEFT,
        style: navermaps.ZoomControlStyle.SMALL
      }}

      zoom={zoom} // 지도 초기 확대 배율

      naverRef={ref=>{naverMapRef.current=ref}}
    >
    </NaverMap>
  )
} 

const Search = (props)=> {
  const classes = useStyles();
  const {history, ...rest } = props;

  const [center, setCenter] = React.useState({ lat: 36.2253017, lng: 127.6460516 });
  const [zoom, setZoom] = React.useState(7);
  const [products, setProducts] = React.useState([])


  React.useEffect(()=>{
    Fetch.get('/api/products/').then(res=>{
      setProducts(res);
    })
  },[])

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
      <SearchBar handleClick={handleClick} />
      <Grid className={classes.container} container>
        <Grid className={classes.productSection} item xs={12} sm={12} md={12} lg={7} xl={7} container justify="space-evenly" alignItems="center" alignContent="flex-start">
          {
            products.map((product, index)=>(
              <Grid item xs={12} sm={6} md={6} lg={4} xl={3} key={index}>
                <ProductCard {...{product, history}} />
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
            submodules={['geocoder']}
          >
            <NaverMapAPI 
              center={center} 
              handleCenter={handleCenter}
              zoom={zoom}
              products={products}
            />
          </RenderAfterNavermapsLoaded>
        </Grid>
      </Grid>
    </Box>
  );
};

// export default Search;
export default Search;

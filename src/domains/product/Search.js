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
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import SearchBar from "./SearchBar.js";
import ProductCard from "./ProductCard.js";

import {Fetch} from 'utils/Fetch.js'
import customCluster from 'utils/MarkerClustering.js'
import sampleData from 'sample.js'

import styles from "./Search.style.js";

const useStyles = makeStyles(styles);


function NaverMapAPI(){
  const navermaps = window.naver.maps;
  const N = window.N;

  const [center, setCenter] = React.useState({ lat: 36.2253017, lng: 127.6460516 });

  const MarkerClustering = customCluster(navermaps)

  const naverMapRef = React.useRef(null);

  React.useEffect(()=>{
    console.log('useEffect')
    console.log(naverMapRef.current)
    console.log(window.naver)


    var marker1 = {
      content: '<div style="cursor:pointer;width:26px;height:26px;line-height:26px;font-size:10px;color:white;background-color:#91CD2B;border-radius:50%;text-align:center;font-weight:bold;"></div>',
      size: N.Size(40, 40),
      anchor: N.Point(20, 20)
    },
    marker2 = {
      content: '<div style="cursor:pointer;width:30px;height:30px;line-height:30px;font-size:10px;color:white;background-color:#71B429;border-radius:50%;text-align:center;font-weight:bold;"></div>',
      size: N.Size(40, 40),
      anchor: N.Point(20, 20)
    },
    marker3 = {
      content: '<div style="cursor:pointer;width:34px;height:34px;line-height:34px;font-size:10px;color:white;background-color:#397400;border-radius:50%;text-align:center;font-weight:bold;"></div>',
      size: N.Size(40, 40),
      anchor: N.Point(20, 20)
    },
    marker4 = {
      content: '<div style="cursor:pointer;width:36px;height:36px;line-height:36px;font-size:10px;color:white;background-color:#033E00;border-radius:50%;text-align:center;font-weight:bold;"></div>',
      size: N.Size(40, 40),
      anchor: N.Point(20, 20)
    },
    marker5 = {
      content: '<div style="cursor:pointer;width:38px;height:38px;line-height:38px;font-size:10px;color:white;background-color:#002100;border-radius:50%;text-align:center;font-weight:bold;"></div>',
      size: N.Size(40, 40),
      anchor: N.Point(20, 20)
    };


    let markers = [];

    // for (var i = 0, ii = sampleData.length; i < ii; i++) {
    for (var i = 0, ii = 100; i < ii; i++) {
      var spot = sampleData[i];
      var latlng = new navermaps.LatLng(spot.grd_la, spot.grd_lo);
      var marker = new navermaps.Marker({
        position: latlng,
        draggable: true,
      });

      markers.push(marker);
    }

    var markerClustering = new MarkerClustering({
      minClusterSize: 2,
      maxZoom: 13,
      map: naverMapRef.current.map,
      markers: markers,
      disableClickZoom: false,
      gridSize: 80,
      icons: [marker1, marker2, marker3, marker4, marker5],
      indexGenerator: [10, 20, 30, 50, 100],
      stylingFunction: function(clusterMarker, count) {
        clusterMarker.getElement().firstElementChild.textContent=count
      }
    });
  },[])

  return (
    <NaverMap
      // mapDivId={'maps-getting-started-uncontrolled'} // default: react-naver-map
      style={{
        width: '100%', // 네이버지도 가로 길이
        height: '100%' // 네이버지도 세로 길이
      }}
      // defaultCenter={center} // 지도 초기 위치
      center={center}
      onCenterChanged={center => setCenter(center)}
      zoomControl={true}
      zoomControlOptions={{
        position: navermaps.Position.TOP_LEFT,
        style: navermaps.ZoomControlStyle.SMALL
      }}

      defaultZoom={7} // 지도 초기 확대 배율

      naverRef={ref=>{naverMapRef.current=ref}}
    >
      <Marker
        key={1}
        position={new navermaps.LatLng(37.551229, 126.988205)}
        onClick={() => {
          console.log(naverMapRef)
        }}
      />
    </NaverMap>
  )

} 

const Search = (props)=> {
  const classes = useStyles();
  const {history, ...rest } = props;

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

  const handleClick = ()=>{
    // const a = React.lazy(()=>import('utils/MarkerClustering.js'))

    // console.log(a)
      // loadJs('../../utils/MarkerClustering.js', ()=>{
      //   alert()
      // });




    // console.log('START');
    Fetch.get('https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=분당구 불정로 6', {
      'X-NCP-APIGW-API-KEY-ID': 'm11ogby6ag',
      'X-NCP-APIGW-API-KEY': 'G8nc8zH5sP4pg8ZVMYETnLoReXCfx04vgNKvwsPE',
    }).then(res=>{
      console.log(res)
    });
  }




  React.useEffect(() => {
  }, []);

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
            submodules={['geocoder']}
          >
            <NaverMapAPI />
          </RenderAfterNavermapsLoaded>
        </Grid>
      </Grid>
    </Box>
  );
};

// export default Search;
export default Search;

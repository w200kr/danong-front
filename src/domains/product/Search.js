import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import { FormProvider, useForm, useFormContext, useFieldArray } from "react-hook-form";
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

import AuthContext from 'contexts/Auth/AuthContext.js';
import {Fetch} from 'utils/Fetch.js'
import customCluster from 'utils/MarkerClustering.js'

import styles from "./Search.style.js";

const useStyles = makeStyles(styles);


function NaverMapAPI(props, ref){
  const {products, handleIdle} = props;
  const navermaps = window.naver.maps;
  const N = window.N;
  const MarkerClustering = customCluster(navermaps)

  const naverMapRef = React.useRef();

  const [center, setCenter] = React.useState({ lat: 36.2253017, lng: 127.6460516 });
  const [zoom, setZoom] = React.useState(7);
  const [markerClustering, setMarkerClustering] = React.useState(null);

  React.useImperativeHandle(ref, () => naverMapRef.current );
  React.useEffect(()=>{
    setMarkerClustering(new MarkerClustering({
      minClusterSize: 1,
      maxZoom: 13,
      map: naverMapRef.current.map,
      markers: [],
      disableClickZoom: false,
      gridSize: 80,
      icons: makeMarkers(N),
      indexGenerator: [10, 20, 30, 50, 100],
      stylingFunction: function(clusterMarker, count) {
        clusterMarker.getElement().firstElementChild.textContent=count
      }
    }))
  },[])


  React.useEffect(()=>{

    let markers = [];

    products.map(product=>{
      var latlng = new navermaps.LatLng(product.lat, product.lng);
      var marker = new navermaps.Marker({
        position: latlng,
        draggable: true,
      });

      markers.push(marker);
    })

    if (markerClustering){
      markerClustering.markers = markers;
      markerClustering._redraw()
    }
  },[products])
  React.useEffect(()=>{
    // if(markerClustering){
    //   console.log(markerClustering)
    //   console.log(handleIdle)
    // }
  },[markerClustering])

  return (
    <NaverMap
      style={{
        width: '100%', // 네이버지도 가로 길이
        height: '100%' // 네이버지도 세로 길이
      }}
      onIdle={handleIdle}
      zoomControl={true}
      zoomControlOptions={{
        position: navermaps.Position.TOP_LEFT,
        style: navermaps.ZoomControlStyle.SMALL
      }}
      zoom={zoom} // 지도 초기 확대 배율
      naverRef={ref=>{
        naverMapRef.current=ref
      }}
    >
    </NaverMap>
  )
} 

NaverMapAPI = React.forwardRef(NaverMapAPI);

const Search = (props)=> {
  const classes = useStyles();
  const {history, isWishlist, ...rest } = props;
  const searchUrl = '/api/products/'
  const defaultQuery = '?lat__lte=40.9511095&lng__lte=130.1039986&lat__gte=34.0210658&lng__gte=&$123.8527778'
  const {isAuthenticated} = React.useContext(AuthContext) 

  const naverMapRef = React.useRef(null);
  const isFirstRun = React.useRef(true);

  const [products, setProducts] = React.useState([])
  const [categories, setCategories] = React.useState([])
  const [parameter, setParameter] = React.useState({
    // key-value 
    'categories': {},
    'envFit': {},
    'delivery': {},
    'detail': {},
  })

  const methods = useForm({
    // mode: 'onBlur',
    // reValidateMode: 'onBlur',
  });

  React.useEffect( () => {
    async function fetchCategory(){
      const response = await Fetch.get('/api/categories/depth/')

      setCategories(response);
      setParameter({
        ...parameter,
        'categories' : response.reduce((acc, cur) => (
          [...acc, ...cur.sub_categories]
        ), []).reduce((acc,cur)=>(
          {...acc, ...{[cur.id]:false}}
        ), {}),
      })
    }

    fetchCategory()
  },[])

  React.useEffect(() => {
    // very first (parameter initalize) order1
    if (Object.keys(parameter.categories).length===0){
      return ;
    }
    fetchProducts() 
  }, [parameter]);

  const handleSearch = (address) => async () => {
    if (address===''){
      alert('주소를 입력해주세요.')
      return ;
    }
    naverMapRef.current.setZoom(12)
    let response = await Fetch.get('/api/navermap/geocode/'+address)
    if (response.status==='OK' && response.meta.totalCount > 0){
      naverMapRef.current.setCenter({lat: response.addresses[0].y, lng: response.addresses[0].x})
    }
  }

  const makeQuery = (init=false)=>{
    // after setting parameter order2
    if (isFirstRun.current || !naverMapRef.current){
      isFirstRun.current = false
      return defaultQuery
    }

    const categoryIds = Object.keys(parameter.categories).filter(key => parameter.categories[key] === true).join(',')
    const categoryQuery = categoryIds?`category__in=${categoryIds}&`:''

    const {_ne, _sw} = naverMapRef.current.getBounds()
    // const geoQuery = (naverMapRef.current===null)?`lat__lte=40.9511095&lng__lte=130.1039986&lat__gte=34.0210658&lng__gte=&$123.8527778`:`lat__lte=${_ne._lat}&lng__lte=${_ne._lng}&lat__gte=${_sw._lat}&lng__gte=&${_sw._lng}`
    const geoQuery = `lat__lte=${_ne._lat}&lng__lte=${_ne._lng}&lat__gte=${_sw._lat}&lng__gte=&${_sw._lng}`

    return `?${categoryQuery}${geoQuery}`
  }

  const fetchProducts = ()=>{
    const query = makeQuery()
    console.log(query)
    Fetch.get(searchUrl+query).then(res=>{
      if (isWishlist){
        setProducts(res.filter(obj=>obj.is_dibbed===true));
      }else{
        setProducts(res)
      }
    })
  }

  const handleChangeParemeter = (group, key, value)=>{
    setParameter({
      ...parameter,
      [group]: {
        ...parameter[group],
        [key]: value,
      }
    })
  }

  const handleIdle = ()=>{
    fetchProducts()
  }

  return (
    <Box className={classes.root} component="div" display='flex' flexDirection="column" overflow="hidden" height="100vh">
      <Header 
        brand={
          <Logo />
        }
      />

      <FormProvider {...methods} >
        <SearchBar handleSearch={handleSearch} categories={categories} fetchProducts={fetchProducts} {...{parameter, handleChangeParemeter}} />
      </FormProvider>

      <Grid className={classes.container} container>
        <Grid className={classes.productSection} item xs={12} sm={12} md={12} lg={7} xl={7} container justify="space-evenly" alignItems="center" alignContent="flex-start">
          {
            products.map((product, index)=>(
              <Grid item xs={12} sm={6} md={6} lg={4} xl={3} key={index}>
                <ProductCard {...{product, history, isAuthenticated}} />
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
              products={products}
              handleIdle={handleIdle}
              ref={naverMapRef}
            />
          </RenderAfterNavermapsLoaded>
        </Grid>
      </Grid>
    </Box>
  );
};

// export default Search;
export default Search;

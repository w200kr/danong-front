import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import { useForm } from "react-hook-form";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {Box, Container, Grid, InputAdornment, Button, IconButton, List, ListItem, ListItemText, Link, Paper, Typography, Divider} from '@material-ui/core';

import { Apps, CloudDownload } from "@material-ui/icons";
import SearchIcon from '@material-ui/icons/Search';

import Rating from '@material-ui/lab/Rating';

import Slider from "react-slick";

import { RenderAfterNavermapsLoaded, NaverMap, Marker } from 'react-naver-maps'; // 패키지 불러오기

// import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Logo from 'components/Atoms/Logo/Logo.js'

import FormTextField from 'components/Atoms/FormTextField/FormTextField.js'
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";

import styles from "./Detail.style.js";

const useStyles = makeStyles(styles);

const Detail = (props)=> {
  const classes = useStyles();
  const {history, ...rest } = props;

  // const { handleSubmit, errors, control } = useForm({
  //   reValidateMode: 'onBlur'
  // });

  // const baseControllerProps = {
  //   control: control,
  //   defaultValue: '',
  // }


  const settings = {
    className: classes.slider,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const [state, setState] = React.useState({ nav1: null, nav2: null });
  const slider1 = React.useRef();
  const slider2 = React.useRef();

  React.useEffect(() => {
    setState({
      nav1: slider1.current,
      nav2: slider2.current
    });
  }, []);

  const { nav1, nav2 } = state;


  // const slider1 = React.useRef();
  // const slider2 = React.useRef();

  // const [state, setState] = React.useState({
  //   nav1: slider1.current, 
  //   nav2: slider2.current,
  // });

  // const { nav1, nav2 } = state;
  // const nav1 = slider1.current;
  // const nav2 = slider2.current;

  return (
    <Box className={classes.root} component="div" display='flex' flexDirection="column">
      <Header 
        brand={
          <Logo />
        }
      />
      <Container className={classes.container} component={Grid} maxWidth='md' container
        justify="center"
        alignItems="center"
      >
        <Grid className={classes.summary} item xs={12} container>
          <Grid item xs={7}>
            <Box className={classes.mainImageBox} display='flex' flexDirection='column' justifyContent='center'>
              <Slider
                asNavFor={nav2}
                ref={slider => (slider1.current = slider)}
              >
                <div>
                  <img className={classes.mainImage} src="https://dummyimage.com/410x410/d3d3d3/000000" alt="" />
                </div>
                <div>
                  <img className={classes.mainImage} src="https://dummyimage.com/410x410/d3d3d3/000000" alt="" />
                </div>
                <div>
                  <img className={classes.mainImage} src="https://dummyimage.com/410x410/d3d3d3/000000" alt="" />
                </div>
                <div>
                  <img className={classes.mainImage} src="https://dummyimage.com/410x410/d3d3d3/000000" alt="" />
                </div>
                <div>
                  <img className={classes.mainImage} src="https://dummyimage.com/410x410/d3d3d3/000000" alt="" />
                </div>
                <div>
                  <img className={classes.mainImage} src="https://dummyimage.com/410x410/d3d3d3/000000" alt="" />
                </div>
              </Slider>
              <Slider
                asNavFor={nav1}
                ref={slider => (slider2.current = slider)}
                slidesToShow={4}
                swipeToSlide={true}
                focusOnSelect={true}
              >
                <div>
                  <img src="https://dummyimage.com/410x410/d3d3d3/000000" width='110' height='80' alt="" />
                </div>
                <div>
                  <img src="https://dummyimage.com/410x410/d3d3d3/000000" width='110' height='80' alt="" />
                </div>
                <div>
                  <img src="https://dummyimage.com/410x410/d3d3d3/000000" width='110' height='80' alt="" />
                </div>
                <div>
                  <img src="https://dummyimage.com/410x410/d3d3d3/000000" width='110' height='80' alt="" />
                </div>
                <div>
                  <img src="https://dummyimage.com/410x410/d3d3d3/000000" width='110' height='80' alt="" />
                </div>
                <div>
                  <img src="https://dummyimage.com/410x410/d3d3d3/000000" width='110' height='80' alt="" />
                </div>
                <div>
                  <img src="https://dummyimage.com/410x410/d3d3d3/000000" width='110' height='80' alt="" />
                </div>
              </Slider>

            </Box>
          </Grid>
          <Grid item xs={5}>
            <Typography variant='h4'>
              부안 우리네 쌀 방앗간 <span>인증</span>
            </Typography>
            <Typography variant='h5'>
              전북 부안군 신기리 128
            </Typography>
            <Box component='span' display='flex'>
              <Typography variant='subtitle1'>
                별점
              </Typography>
              <Divider orientation="vertical" flexItem />
              <Typography variant='subtitle1'>
                하트
              </Typography>
            </Box>

            <Typography variant='h4'>
              전국 백미쌀 부문 15위
            </Typography>

            <Typography variant='h4'>
              전북 백미쌀 부문 15위
            </Typography>

            <Typography variant='h5'>
              198,000원
            </Typography>
            <Typography variant='h5'>
              
            </Typography>
            <Typography variant='subtitle1'>
              
            </Typography>


            <Box component='span' display='flex'>
              <Typography variant='subtitle1'>
                쌀 10KG X 12개월
              </Typography>
              <Box>
                <span>하트</span><span>공유</span>
              </Box>
            </Box>
            <Divider className={classes.horizontalDivider} />
            <select name="" id="">
              <option value="s">ss</option>
            </select>
            <Divider className={classes.horizontalDivider} />
            <Typography variant='subtitle1'>
              원산지 - 상세설명 꼭 참조해보세요!
            </Typography>
            <Divider className={classes.horizontalDivider} />
            <Button variant="contained" fullWidth style={{backgroundColor: '#39290F', color:'white'}}>
              구매하기
            </Button>
            <Button variant="contained" fullWidth style={{backgroundColor: '#39290F', color:'white'}}>
              장바구니
            </Button>
          </Grid>
        </Grid>
      </Container>

      <Box className={classes.tabs} display='flex' alignItems='center' justifyContent='center'>
        <List className={classes.links}>
          <ListItem>
            <ListItemText primary="상세설명" />
          </ListItem>
          <ListItem>
            <ListItemText primary="구매후기" />
          </ListItem>
          <ListItem>
            <ListItemText primary="상품문의" />
          </ListItem>
          <ListItem>
            <ListItemText primary="교환/반품" />
          </ListItem>
          <ListItem>
            <ListItemText primary="리뷰" />
          </ListItem>
        </List>
      </Box>
      <Container className={classes.detail} component={Grid} maxWidth='sm' container
        display='row'
        justify="center"
        alignItems="center"
      >
        <Grid className={classes.sellerInfo} item xs={12}>
          <Box display='flex' flexDirection='column' justifyContent='flex-start' alignItems='center' pt={16}>
            <Typography className={classes.profileTitle} variant="h5">
              농업인 정보
            </Typography>
            <img src="https://dummyimage.com/180x180/d3d3d3/000000" width='180' height='180' alt="" />
            <Typography variant="h6">
              이수민
            </Typography>
            <Typography>
              부안 우리네 쌀 방앗간 대표
            </Typography>

            <Box component="fieldset" borderColor="transparent">
              <Rating id='dd' name="read-only" value={4.2} readOnly />
              <Typography component="label" htmlFor='dd'>(4.2 / 352)</Typography>
            </Box>
            <Box display='flex' justifyContent='space-evenly' width='100%' mb={3}>
              <Button className={classes.roundButton} variant="outlined" fullWidth>Tel. 043-123-1234</Button>
              <Button className={classes.roundButton} variant="outlined" fullWidth>1:1 문의</Button>
            </Box>
            <Box display='flex' width="50%" justifyContent='space-evenly'>
              <Typography variant='button'>
                다농 등록건수 : 1건
              </Typography>
              <Typography variant='button'>
                주 판매 작물 : 곡류
              </Typography>
            </Box>
          </Box>

          <Box className={classNames(classes.roundBox)}>
            <Typography className={classes.profileSubTitle} variant='h6' align='center'>주요 경력</Typography>
            <Typography align='center'>쌀 농사 경력 37년</Typography>
            <Typography align='center'>해당 농지 농사 경력 21년</Typography>
            <Typography align='center'>2003년 7월 친환경 인증 농업인 취득</Typography>
          </Box>
          <Box className={classNames(classes.roundBox)}>
            <Typography className={classes.profileSubTitle} variant='h6' align='center'>농업인 한마디</Typography>

            <Typography align='center'>평생을 농사지어 세 자식을 키우고 먹이고</Typography>
            <Typography align='center'>대학까지 보냈습니다.</Typography>
            <Typography align='center'>쌀 농사에 일생을 바친만큼</Typography>
            <Typography align='center'>쌀은 자신있습니다.</Typography>
            <Typography align='center'>믿고 구매해주십시오 감사합니다</Typography>
            <Typography align='center'>(1:1문의는 자주 확인이 불가하오니 전화주시면 감사하겠습니다.)</Typography>
          </Box>
        </Grid>
        <Grid className={classes.productInfo} item xs={12}>
        </Grid>
        <Grid className={classes.soilInfo} item xs={12}>
          <div dangerouslySetInnerHTML={{__html: ``.replace(/(<? *script)/gi, 'illegalscript')}} >
          </div>
        </Grid>
        <Grid className={classes.reviews} item xs={12}>
          <Box display='flex' flexDirection="column">
            <Box display='flex' >
              <img src="https://dummyimage.com/40x40/d3d3d3/000000" height={40} width={40} alt="" />
              <Box display='flex' flexDirection="column">
                <Typography>
                  사용자
                </Typography>
                <Box component="fieldset" borderColor="transparent" m={0} p={0}>
                  <Rating id='dd' name="read-only" value={2.5} readOnly />
                  <Typography component="label" htmlFor='dd'>2020.10.24</Typography>
                </Box>
              </Box>
            </Box>
            <Typography>
              항상 잘먹고 있습니다 감사합니다
            </Typography>
          </Box>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
};

// export default Search;
export default Detail;

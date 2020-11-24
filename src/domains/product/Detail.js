import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import { useForm } from "react-hook-form";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {Box, Container, Grid, Input, InputBase, InputAdornment, ButtonBase, Button, IconButton, List, ListItem, ListItemText, Avatar, Link, Paper, Typography, Divider, TextField, Menu, MenuItem, Popover, Popper, ClickAwayListener} from '@material-ui/core';
import { Apps, CloudDownload } from "@material-ui/icons";
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Rating from '@material-ui/lab/Rating';

import Slider from "react-slick";
import { RenderAfterNavermapsLoaded, NaverMap, Marker } from 'react-naver-maps'; // 패키지 불러오기

// import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Logo from 'components/Atoms/Logo/Logo.js'
import FormTextField from 'components/Atoms/FormTextField/FormTextField.js'
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";

import AuthContext from 'contexts/Auth/AuthContext.js';
import {Fetch} from 'utils/Fetch.js'

import styles from "./Detail.style.js";



const useStyles = makeStyles(styles);

const Detail = (props)=> {
  const classes = useStyles();
  const {history, ...rest } = props;

  const {isAuthenticated, authUser} = React.useContext(AuthContext) 
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [product, setProduct] = React.useState({})
  const [qty, setQty] = React.useState(1)
  const [myReview, setMyReview] = React.useState({rating:0, text:''})

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToggleDib = (e)=>{
    e.stopPropagation()
    Fetch.post('/api/products/dib/',{
      product_id: product.id
    }).then(res=>{
      if (res.status==='ok'){
        setProduct({
          ...product,
          is_dibbed: !product.is_dibbed,
        })
      }else{
        alert('에러 발생')
      }
    })
  }

  const settings = {
    className: classes.slider,
    customPaging: i=>(
      <a>
        <img key={i} src={(i===0)?`${product.thumbnail}`:`${product.images[i-1]?.image_url}`} width={50} height={50} />
      </a>
    ),
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  React.useEffect(() => {
    console.log('useEffect')

    if(isAuthenticated){
      Fetch.get('/api/products/'+props.match.params.productId).then(res=>{
        // console.log(res)
        setProduct(res)
      })
    }
  }, []);

  const getMainPrice = ()=>{
    let price_num;
    if (product.options && product.options.length>0){
      price_num = product.options.[selectedIndex].price
    }else{
      price_num=product.price
    }
    return price_num * qty
  }


  const getMainPriceText = ()=>{
    const price_num = getMainPrice()
    return Number(price_num).toLocaleString()+'원'
  }

  return (
    <Box className={classes.root} component="div" display='flex' flexDirection="column">
      <Header 
        brand={
          <Logo />
        }
      />
      <Container component={Grid} maxWidth='md' container
        justify="center"
        alignItems="center"
      >
        <Grid className={classes.summary} item xs={12} container>
          <Grid item xs={7}>
            <Box className={classes.mainImageBox} display='flex' flexDirection='column' justifyContent='center'>
              <Slider
                {...settings}
              >
                <div>
                  <img className={classes.mainImage} src={product.thumbnail} alt="thumbnail" />
                </div>
                {product.images?.filter(image=>image.image_type==='top').map((image,index)=>(
                  <div key={index}>
                    <img className={classes.mainImage} src={image.image_url} alt={`top ${index}`} />
                  </div>
                ))}
              </Slider>

            </Box>
          </Grid>
          <Grid className={classes.productInfo} item xs={5}>
            <Box component='span' display='flex' justifyContent='space-between' alignItems="center">
              <Box>
                <Typography variant='h6'>
                  {product.name}
                </Typography>
                <Box display='flex'>
                  <Rating value={product.rating_avg || 0} size="small" readOnly />
                  <Typography variant='subtitle2'> 
                    <Link href='#reviews' underline='none' style={{color:'#346aff'}}>{product.review_num}개 상품평</Link>
                  </Typography>
                </Box>
              </Box>
              <IconButton
                onClick={handleToggleDib}
                // edge="end"
                size='medium'
                fontSize="default"
              >
                {(product.is_dibbed)?<FavoriteIcon color="secondary" size='large' />:<FavoriteBorderIcon size='large' />}
              </IconButton>
            </Box>

            <Divider className={classes.horizontalDivider} />

            <Typography variant='button' style={{fontWeight: 'bold', fontSize: 20}}>
              {getMainPriceText()}
            </Typography>


            {product.options&&product.options.length>0?(
              <React.Fragment>
                <Divider className={classes.horizontalDivider} />
                <List component="nav" aria-label="product options">
                  <ListItem
                    button
                    aria-haspopup="true"
                    aria-controls="lock-menu"
                    aria-label="when device is locked"
                    onClick={handleClickListItem}
                  >
                    <ListItemText primary="중량 X 수량" secondary={product.options?.[selectedIndex]?.volumn} />
                  </ListItem>
                </List>
                <Popper 
                  modifiers={{
                    flip: {
                      enabled: false,
                    },
                    preventOverflow: {
                      enabled: true,
                      boundariesElement: 'scrollParent',
                    }
                  }}
                  className={'popperr'}
                  placement='bottom-start'
                  open={Boolean(anchorEl)}
                  anchorEl={anchorEl}
                >


                  {product.options?product.options.map((option, index) => (
                    <ClickAwayListener 
                      key={index}
                      onClickAway={handleClose}
                    >
                      <Paper>
                        <MenuItem
                          key={option.id}
                          // disabled={index === 0}
                          selected={index === selectedIndex}
                          onClick={(event) => handleMenuItemClick(event, index)}
                        >
                          <ListItemText primary={option.volumn} secondary={Number(option.price).toLocaleString()+'원'} />
                        </MenuItem>
                      </Paper>
                    </ClickAwayListener>)):''
                  }
                </Popper>
              </React.Fragment>
            ):''}

            <Divider className={classes.horizontalDivider} />

            <Typography variant='button'>
              원산지 : {product.address}
            </Typography>
            <Divider className={classes.horizontalDivider} />
            <Typography variant='subtitle2'>
              {product.description}
            </Typography>
            <Divider className={classes.horizontalDivider} />
            <Grid container spacing={1}>
              <Grid item>
                <Input
                  value={qty}
                  onChange={e=>{
                    if (Number(e.target.value)){
                      setQty(Number(e.target.value))
                    }
                    else if (e.target.value===''){
                      setQty(0)
                    }
                  }}
                  endAdornment={<InputAdornment position="end">개</InputAdornment>}
                  inputProps={{
                    style:{
                      textAlign: 'center',
                    }
                  }}
                  style={{
                    width: 100,
                    height: 40,
                    border: '1px solid #ccc',
                    paddingRight: 4,
                  }}
                />
              </Grid>
              {/*
              <Grid item xs>
                <Button variant="outlined" fullWidth style={{height:40, borderColor: '#39290F', color:'#39290F'}}>
                  장바구니
                </Button>
              </Grid>
              */}
              <Grid item xs>
                <Button variant="contained" fullWidth style={{height:40, backgroundColor: '#39290F', color:'white'}} onClick={()=>{
                  // if (Number(qty))
                  const selectedOption = product.options?.[selectedIndex]
                  const obj = {
                    product_option: selectedOption,
                    qty: qty,
                    amount: getMainPrice() * qty
                  }
                  window.localStorage.setItem('checkout', JSON.stringify(obj));
                  history.push('/checkout')
                }}>
                  구매하기
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>

      <Box id='tabs' className={classes.tabs} display='flex' alignItems='center' justifyContent='center'>
        <List className={classes.links}>
          <ListItem>
            <ListItemText primary={<Link href='#tabs' underline='none' style={{color:'white'}}>농업인 정보</Link>} />
          </ListItem>
          <ListItem>
            <ListItemText primary={<Link href='#productDetail' underline='none' style={{color:'white'}}>상품상세</Link>} />
          </ListItem>
          <ListItem>
            <ListItemText primary={<Link href='#reviews' underline='none' style={{color:'white'}}>상품평</Link>} />
          </ListItem>
          <ListItem>
            <ListItemText primary={<Link href='#qna' underline='none' style={{color:'white'}}>상품 QnA</Link>} />
          </ListItem>
        </List>
      </Box>
      <Container className={classes.detail} component={Grid} maxWidth='md' container
        display='row'
        justify="center"
        alignItems="center"
      >
        <Grid item xs={12} container>
          <Grid className={classes.sellerInfo} item xs={12}>
            <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
              <Typography className={classes.profileTitle} variant="h5">
                농업인 정보
              </Typography>
              <img src={product.seller_profile?.thumbnail_url} width='180' height='180' alt="" />
              <Typography variant="h6">
                {product.seller_profile?.name}
              </Typography>
              <Typography>
                {product.seller_profile?.seller_name} {product.seller_profile?.job_position}
              </Typography>

              <Box display='flex'>
                <Rating defaultValue={product.seller_profile?product.seller_profile.rating_avg:0} size="small" readOnly />
                <Typography variant='subtitle2'> 
                  ({product.seller_profile?.rating_avg} / {product.seller_profile?.review_num})
                </Typography>
              </Box>
              <Box display='flex' justifyContent='space-evenly' width='100%' mb={3}>
                <Button className={classes.roundButton} variant="outlined" fullWidth>Tel. {product.seller_profile?.tel}</Button>
                <Button className={classes.roundButton} variant="outlined" fullWidth>1:1 문의</Button>
              </Box>
              <Typography variant='button'>
                다농 등록건수 : {product.seller_profile?.product_num}건
              </Typography>
              <Typography variant='button'>
                주 판매 작물 : {product.seller_profile?.main_crops}
              </Typography>
            </Box>

            <Box className={classNames(classes.roundBox)}>
              <Typography className={classes.profileSubTitle} variant='h6' align='center'>주요 경력</Typography>
              <Typography className={classes.lineBreak} align='center'>{product.seller_profile?.career}</Typography>
            </Box>
            <Box className={classNames(classes.roundBox)}>
              <Typography className={classes.profileSubTitle} variant='h6' align='center'>농업인 한마디</Typography>
              <Typography className={classes.lineBreak} align='center'>{product.seller_profile?.comment}</Typography>
            </Box>
          </Grid>
          <Grid id='productDetail' className={classes.productDetail} item container direction='column' justify="center" alignItems="center">
            {product.images?.filter(image=>image.image_type==='content').map((image,index)=>(
              <img key={index} className={classes.contentImage} src={image.image_url} alt={`content ${index}`} />
            ))}

            <Grid className={classes.soilInfo} item xs={12}>
              <div dangerouslySetInnerHTML={{__html: ``.replace(/(<? *script)/gi, 'illegalscript')}} >
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid id="reviews" className={classes.reviews} item xs={12}>
          {product.reviews?product.reviews.map(review=>{
            return (
              <Box className={classes.review} key={review.id} display='flex' flexDirection="column">
                <Box display='flex' justifyContent='space-between'>
                  <Box display='flex' >
                    <Avatar className={classes.reviewAvatar} src={review.buyer_thumbnail_url} />
                    <Box>
                      <Typography>
                        {review.buyer_name}
                      </Typography>
                      <Box display='flex'>
                        <Rating value={review.rating || 0} size="small" readOnly />
                        <Typography variant='subtitle2'> {review.created}</Typography>
                      </Box>
                    </Box>
                  </Box>

                  {(review.is_mine)?(
                    <IconButton
                      onClick={()=>{
                        const review_id = review.id
                        Fetch.delete(`/api/reviews/${review_id}/`).then(res=>{
                          setProduct({
                            ...product,
                            reviews: product.reviews.filter(review=>review.id!==review_id)
                          })
                          alert('작성하셨던 리뷰가 삭제되었습니다.')
                        })
                      }}
                      // edge="end"
                      size='medium'
                      fontSize="default"
                    >
                      <DeleteIcon color="secondary" size='small' />
                    </IconButton>
                  ):''}
                </Box>
                <Typography className={classes.reviewText}>
                  {review.text}
                </Typography>
                <Divider className={classes.horizontalDivider} />
              </Box>
            )
          }):''}
          {(isAuthenticated)?(
            <Box className={classes.reviewForm} display='flex' flexDirection="column">
              <Typography> {authUser.name} 고객님의 소중한 리뷰를 기다립니다. </Typography>
              <Rating name='myRating' value={myReview.rating || 0} onChange={(e, newValue)=>setMyReview({...myReview, rating:newValue})} size="medium" />
              <TextField
                multiline
                rows={3}
                rowsMax={5}
                value={myReview.text}
                onChange={e=>setMyReview({...myReview, text:e.target.value})}
                variant="outlined"
              />
              <Button variant="outlined" fullWidth size='large' onClick={()=>{
                Fetch.post('/api/reviews/', {
                  product:product.id,
                  ...myReview,
                }).then(res=>{
                  setProduct({
                    ...product,
                    reviews: [...product.reviews, res]
                  })
                  alert('고객님의 리뷰가 등록되었습니다.')
                })
              }}>
                리뷰 작성하기
              </Button>
            </Box>
          ):''}

        </Grid>
      </Container>
      <Footer />
    </Box>
  );
};

// export default Search;
export default Detail;

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';

import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import Rating from '@material-ui/lab/Rating';

import {Fetch} from 'utils/Fetch.js'

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: 'yellow',
    // width: '100%',
    // minWidth: 260,
    // minWidth: 345,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    position: 'relative',
  },
  media: {
    // minWidth: 260,
    height: 200,
    // paddingTop: '56.25%', // 16:9
  },
}));

export default function ProductCard(props) {
  const {product, history, isAuthenticated} = props;
  const classes = useStyles();

  const [dib, setDib] = React.useState(product.is_dibbed);

  // console.log(product)
  // ["id", "seller", "images", "options", "name", "address", "price", "view_count", "description", "thumbnail", "is_hide", "lat", "lng", "created", "updated", "category", "history"]

  // const preventDefault = (event) => event.preventDefault();
  const handleClick = event =>{
    event.preventDefault();
    history.push('/'+product.id)
  }

  const handleToggleDib = (e)=>{
    e.stopPropagation()
    Fetch.post('/api/products/dib/',{
      product_id: product.id
    }).then(res=>{
      if (res.status==='ok'){
        setDib(!dib)
      }else{
        alert('에러 발생')
      }
    })
  }

  return (
    <Card className={classes.root} onClick={handleClick}>
      {/*<CardActionArea>*/}
        <CardMedia
          className={classes.media}
          image={product.thumbnail}
          title={product.name}
        />
        {isAuthenticated?(
          <IconButton
            aria-label="search"
            onClick={handleToggleDib}
            edge="end"
            size='small'
            fontSize="default"
            style={{
              position: 'absolute',
              top: '0px',
              right: '12px',
              zIndex: 200,
              color: 'white',
            }}
          >
            {(dib)?<FavoriteIcon color="secondary" />:<FavoriteBorderIcon />}
          </IconButton>
        ):''}
        <CardHeader
          title={
            <Box
              style={{
                paddingBottom: 3,
              }}
            >
              <Grid 
                container
              >
                <Grid 
                  item 
                  xs={12} 
                  container 
                  justify="space-between"
                  alignItems="center"
                >
                    <Typography variant='subtitle2' align='left'>{product.name}</Typography>
                    <Typography variant='subtitle2' align='right'>{product.price}원</Typography>
                </Grid>
                <Grid 
                  item 
                  xs={12} 
                  container 
                  justify="space-between"
                  alignItems="center"
                >
                    <Typography variant='caption' align='left'>{product.address}</Typography>
                    <Typography variant='caption' align='right'>{product.view_count}회</Typography>
                </Grid>
              </Grid>
            </Box>
          }
          subheader={
            <Grid 
              container
              justify="space-between"
            >
              <Box display='flex'>
                <Rating value={product.rating_avg} size="small" readOnly />
                <Typography>({product.review_num})</Typography>
              </Box>
            </Grid>
          }
          disableTypography={true}
          style={{
            backgroundColor: 'white',
            padding:8,
            // paddingLeft:6,
            // paddingRight:6,

          }}
        />
      {/*
      </CardActionArea>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            This impressive paella is a perfect party dish and a fun meal to cook together with your
            guests. Add 1 cup of frozen peas along with the mussels, if you like.
          </Typography>
        </CardContent>
      */}
    </Card>
  );
}

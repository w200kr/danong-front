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

import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

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
  },
  media: {
    // minWidth: 260,
    height: 200,
    // paddingTop: '56.25%', // 16:9
  },
}));

export default function ProductCard(props) {
  const {history} = props;
  const classes = useStyles();

  // const preventDefault = (event) => event.preventDefault();
  const handleClick = event =>{
    event.preventDefault();
    history.push('/1')
  }

  return (
    <Card className={classes.root} onClick={handleClick}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://thumbnail6.coupangcdn.com/thumbnails/remote/230x230ex/image/vendor_inventory/8a01/4e58cb376c57357410935010f77a70e288adfdd0cd3535ac164a7bf2dd99.jpg"
          title="Paella dish"
        />
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
                    <Typography variant='subtitle2' align='left'>부안 우리네 쌀 방앗간</Typography>
                    <Typography variant='subtitle2' align='right'>198,000원</Typography>
                </Grid>
                <Grid 
                  item 
                  xs={12} 
                  container 
                  justify="space-between"
                  alignItems="center"
                >
                    <Typography variant='caption' align='left'>전북 부안군 신기리 128</Typography>
                    <Typography variant='caption' align='right'>쌀 10KG X 12개월</Typography>
                </Grid>
              </Grid>
            </Box>
          }
          subheader={
            <Grid 
              container
              justify="space-between"
            >
              <Grid 
                item 
                xs={8} 
              >
                <Typography variant='caption' align='left'>농업일지 보유 / 도정 6일 이내 배송 / 저농약 재배</Typography>
              </Grid>
              <Grid 
                item 
                xs={4} 
              >
                <Typography variant='subtitle2' align='right'>문의요망</Typography>
              </Grid>
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
      </CardActionArea>
      {/*
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

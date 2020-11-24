import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Receipt(props) {
  const classes = useStyles();

  const {authUser, watchAll, totalAmount} = props;

  const [bills, setBills] = React.useState(props.bills)

  console.log('watchAll')
  console.log(watchAll)

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        결제 내역 확인
      </Typography>
      <List disablePadding>
        {bills.map(bill => (
          <ListItem className={classes.listItem} key={bill.product_option.id}>
            <ListItemText primary={bill.product_option.volumn} secondary={`${bill.qty}개`} />
            <Typography variant="body2">{Number(bill.amount).toLocaleString()}원</Typography>
          </ListItem>
        ))}

        <ListItem className={classes.listItem}>
          <ListItemText primary="총결제금액" />
          <Typography variant="subtitle1" className={classes.total}>
            {Number(totalAmount).toLocaleString()}원
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            배송 확인
          </Typography>
          <Typography gutterBottom>{authUser.name}</Typography>
          <Typography gutterBottom>{`${watchAll['address']} ${watchAll['address_detail']}`}</Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

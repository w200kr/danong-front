import React from 'react';
import { useForm } from "react-hook-form";

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

import Logo from 'components/Atoms/Logo/Logo.js'
import Header from "components/Header/Header.js";
// import Footer from "components/Footer/Footer.js";

import AuthContext from 'contexts/Auth/AuthContext.js';

import AddressForm from './AddressForm';
import Receipt from './Receipt';

import styles from "./Checkout.style.js";

import {Fetch} from 'utils/Fetch.js'


const useStyles = makeStyles(styles);

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        Danong
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const steps = ['배송 확인', '결제 내역 확인'];

function getStepContent(step, props) {
  switch (step) {
    case 0:
      return <AddressForm {...props} />;
    case 1:
      return <Receipt {...props} />;
    default:
      throw new Error('Unknown step');
  }
}



export default function Checkout(props) {
  const {history, ...rest } = props;
  const classes = useStyles();

  const {isAuthenticated, authUser} = React.useContext(AuthContext) 
  const [activeStep, setActiveStep] = React.useState(0);
  const [IMP, setIMP] = React.useState(null);
  const [totalAmount, setTotalAmount] = React.useState(0)
  const [watchAll, setWatchAll] = React.useState({})

  const [bills, setBills] = React.useState([])

  React.useEffect(()=>{
    if(!isAuthenticated){
      alert('로그인 회원만 결제 가능합니다.')
      history.push('/login')
    }

    // window.localStorage.removeItem('checkout')
    const checkout = JSON.parse( window.localStorage.getItem('checkout') )
    if (checkout){
      setBills([checkout])
    }else{
      alert('잘못된 요청입니다.')
      history.push('/')
    }

    setIMP(window.IMP)
  },[])

  React.useEffect(()=>{
    if(IMP!==null){
      IMP.init('imp46101420');
    }
  },[IMP])

  React.useEffect(()=>{
    console.log(bills.reduce((acc, cur)=>acc+cur.amount, 0))
    if (bills.length>0){
      setTotalAmount( bills.reduce((acc, cur)=>acc+cur.amount, 0) )
    }
  },[bills])

  const { register, handleSubmit, errors, control, watch, reset, setValue } = useForm({
    reValidateMode: 'onBlur',
    // defaultValues,
  });

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const purchase = (callback)=>{
    /* 2. 결제 데이터 정의하기 */
    const data = {
      pay_method : 'card',
      merchant_id : `mid_${new Date().getTime()}`,
      name : '주문명:' + watchAll.name + ' ' + totalAmount,
      amount : 100,
      // amount : totalAmount,
      buyer_email : watchAll.email,
      buyer_name : watchAll.name,
      buyer_tel : watchAll.tel,
      buyer_addr : `${watchAll.address} ${watchAll.address_detail}`,
    };

    /* 4. 결제 창 호출하기 */
    IMP.request_pay(data, res=>{
      console.log(res)
      if (res.success){
        callback(res)
      }
    });
  }

  const onPurchase = res=>{
    Fetch.post('/api/purchases/', {
      ...res,
      qty: bills[0].qty,
      amount: totalAmount,
      payment_type: 'card',
      status: 20,
      buyer: authUser.id,
      product_option: bills[0].product_option.id
    }).then(res=>{
      alert('주문이 완료되었습니다.')
      handleNext()
      history.push('/')
    })
  }

  const defaultProps = {
    isAuthenticated, authUser, control, watch, watchAll, setValue, errors, register, bills, totalAmount,
  }

  return (
    <React.Fragment>
      <Header 
        brand={
          <Logo />
        }
      />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            주문/결제
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  이용해주셔서 감사합니다.
                </Typography>
                <Typography variant="subtitle1">
                  주문번호 #2001539 결제가 완료되었습니다.
                </Typography>
              </React.Fragment>
            ) : (
              <form onSubmit={handleSubmit(data=>{
                if (activeStep===0){
                  setWatchAll(data)
                  handleNext()
                }
                else if (activeStep === 1){
                  purchase(onPurchase)
                }
              })}
               >
                {getStepContent(activeStep, defaultProps)}
                  
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      뒤로
                    </Button>
                  )}
                  <Button
                    type='submit'
                    variant="contained"
                    color="primary"
                    // onClick={()=>{
                    //   const res = JSON.parse(`{"success":true,"imp_uid":"imp_040396439428","pay_method":"card","merchant_uid":"nobody_1606205396320","name":"주문명:신석은 20000","paid_amount":100,"currency":"KRW","pg_provider":"danal_tpay","pg_type":"payment","pg_tid":"202011241709565143483400","apply_num":"53872661","buyer_name":"신석은","buyer_email":"w200kr@gmail.com","buyer_tel":"01092874497","buyer_addr":"서울특별시 동대문구 망우로12길 49-1 지하 B102호","buyer_postcode":"","custom_data":null,"status":"paid","paid_at":1606205435,"receipt_url":"https://www.danalpay.com/receipt/creditcard/view.aspx?dataType=receipt&cpid=6010034465&data=djgEU4F03PoPLB%2FWjtlNOqy8EpzlXrtyeU1BKB8SnkzlsSu9zpPAS3XoNVR02Yb%2B","card_name":"BC카드","bank_name":null,"card_quota":0,"card_number":"91002000****4543"}`)
                    //   console.log(res)
                    //   // purchase(onPurchase)
                    //   onPurchase(res)
                    // }}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? '결제하기' : '다음'}
                  </Button>
                </div>
              </form>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}

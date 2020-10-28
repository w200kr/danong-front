import React from "react";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import InputAdornment from "@material-ui/core/InputAdornment";
// import ListSubheader from '@material-ui/core/ListSubheader';
// import MenuItem from '@material-ui/core/MenuItem';
// import IconButton from '@material-ui/core/IconButton';
// import DeleteIcon from '@material-ui/icons/Delete';
import Lock from "@material-ui/icons/Lock";
import PermIdentity from "@material-ui/icons/PermIdentity";

// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';

import DanongLogo from 'components/Atoms/Logo/Logo.js'
import KakaoLogo from 'components/Atoms/Logo/Kakao.js'




// import Page from "containers/Page/Page"
// import FullImagePage from "containers/Page/FullImagePage"

// import Card from "containers/Card/Card.js";
// import CardBody from "containers/Card/CardBody.js";
// import CardHeader from "containers/Card/CardHeader.js";
// import CardFooter from "containers/Card/CardFooter.js";

// import FormInput from 'components/Atoms/FormInput/FormInput.js'
import FormTextField from 'components/Atoms/FormTextField/FormTextField.js'
// import FieldArray from "components/Atoms/FieldArray/FieldArray.js";

import AuthContext from 'contexts/Auth/AuthContext.js';
// import {Fetch} from 'utils/Fetch.js'

// import image from "assets/img/hawks-bg1.jpeg";

import styles from "./Login.style.js";

const useStyles = makeStyles(styles);

const PageLogin = (props)=>{
  // const {login, isAuthenticated} = React.useContext(AuthContext) 
  const {login} = React.useContext(AuthContext) 

  // const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");

  // setTimeout(function() {
  //   setCardAnimation("");
  // }, 700);
  const classes = useStyles();
  const { history } = props;

  const { handleSubmit, errors, control } = useForm({
    reValidateMode: 'onBlur'
  });

  React.useEffect(() => {
    // if(isAuthenticated){
    //   alert('로그인 상태입니다.')
    //   history.push('/')
    // }
  }, []);

  const baseControllerProps = {
    control: control,
    defaultValue: '',
  }

  const maxWidth = 'xs';

  return (
    <Box
      display="flex" 
      style={{height:'100vh'}}
    >
      <Box
        m='auto'
      >
        <Container 
          component={Grid}
          className={classes.container} 
          maxWidth={maxWidth} 
          disableGutters
          container
          direction='column'
          justify="space-evenly"
          alignItems="center"
        >
          <Grid item style={{marginBottom:'40px'}}>
            <DanongLogo />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <form className={classes.form} onSubmit={handleSubmit(login)}>
              <FormTextField 
                name='username'
                controllerProps={{
                  ...baseControllerProps, 
                  rules: {
                    required: true,
                    pattern: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
                  },
                }}
                fieldProps={{
                  type: 'email',
                  label: '이메일',
                  variant: 'outlined',
                  InputProps: {
                    endAdornment: (<InputAdornment position="end">
                        <PermIdentity className={classes.inputIconsColor} />
                      </InputAdornment>),
                  },
                  helperText: (errors?.username&&true)?"올바른 이메일 주소가 아닙니다.":'',
                  error: errors?.username&&true,
                }}
              />
              <FormTextField 
                name='password'
                controllerProps={{
                  ...baseControllerProps, 
                  rules: {
                    required: true,
                    pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{10,}$/,
                  },
                }}
                fieldProps={{
                  type: "password",
                  label: '비밀번호',
                  variant: 'outlined',
                  InputProps: {
                    endAdornment: (<InputAdornment position="end">
                        <Lock className={classes.inputIconsColor} />
                      </InputAdornment>),
                  },
                  helperText: (errors?.password&&true)?"최소 10자, 최소 하나의 문자 및 하나의 숫자":'',
                  error: errors?.password&&true,
                }}
              />
              
              <Button type='submit' variant='contained' size="large" fullWidth style={{backgroundColor:'#39280F', color:'white', marginTop:'20px'}}>
                로그인
              </Button>
            </form>
          </Grid>
          <Grid item container justify="space-evenly" style={{paddingBottom:20, paddingTop:20}}>
            <Typography>
              <Link color="default" onClick={()=>history.push('/')}>
                아이디/비밀번호 찾기
              </Link>
            </Typography>
            <Typography>
              <Link color="default" onClick={()=>history.push('/signup')}>
                회원가입
              </Link>
            </Typography>
          </Grid>
          <Grid item>
            <Typography>
                SNS계정으로 편하게 로그인/회원가입
            </Typography>
          </Grid>
          <Grid item>
            <KakaoLogo />
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}

export default PageLogin;
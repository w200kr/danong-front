import React from "react";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';

import Lock from "@material-ui/icons/Lock";
import PermIdentity from "@material-ui/icons/PermIdentity";

import KakaoLogin from 'react-kakao-login';

import DanongLogo from 'components/Atoms/Logo/Logo.js'
import KakaoLogo from 'components/Atoms/Logo/Kakao.js'

import FormTextField from 'components/Atoms/FormTextField/FormTextField.js'

import AuthContext from 'contexts/Auth/AuthContext.js';

import styles from "./Login.style.js";

const useStyles = makeStyles(styles);

const PageLogin = (props)=>{
  // const {login, isAuthenticated} = React.useContext(AuthContext) 
  // const {login} = React.useContext(AuthContext) 
  const login = ()=>{
    alert('로그인이 완료되었습니다.')
    history.push('/')
  }

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
            <IconButton onClick={()=>history.push('/')}>
              <DanongLogo />
            </IconButton>
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
              <Link color="textPrimary" onClick={()=>history.push('/')}>
                아이디/비밀번호 찾기
              </Link>
            </Typography>
            <Typography>
              <Link color="textPrimary" onClick={()=>history.push('/signup')}>
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
            <KakaoLogin
              token='cf84b262c8487aa0d2a70906eaaf49e4'
              onSuccess={login}
              // onSuccess={result =>{
                // alert('onSuccess')
              //   alert('로그인이 완료되었습니다.')
              //   history.push('/')
              // }}
              onFailure={result => {
                alert('로그인이 실패하였습니다.')
              }}
              // render={(props: any) => (
              //   <div onClick={props.onClick} />
              // )}
              getProfile={true}
            />

          </Grid>
        </Container>
      </Box>
    </Box>
  )
}

export default PageLogin;
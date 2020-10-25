import React from "react";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
// import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import InputAdornment from "@material-ui/core/InputAdornment";
// import MenuItem from '@material-ui/core/MenuItem';
import Lock from "@material-ui/icons/Lock";
import PermIdentity from "@material-ui/icons/PermIdentity";

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

// import Page from "containers/Page/Page"
// import FullImagePage from "containers/Page/FullImagePage"

import FormTextField from 'components/Atoms/FormTextField/FormTextField.js'
import FormRadioField from 'components/Atoms/FormRadioField/FormRadioField.js'

import AuthContext from 'contexts/Auth/AuthContext.js';
// import {Fetch} from 'utils/Fetch.js'

// import image from "assets/img/hawks-bg3.jpg";

import styles from "./SignUp.style.js";

const useStyles = makeStyles(styles);

const PageSignUp = (props)=>{
  const classes = useStyles();
  const { history } = props;

  // const {signUp, isAuthenticated} = React.useContext(AuthContext) 

  // const [positions, setPositions] = React.useState({
  //   offense: [],
  //   defense: [],
  // })
  const [openDialogs, setOpenDialogs] = React.useState({
    terms: false,
    privacy: false,
  });

  const { handleSubmit, watch, errors, control, getValues } = useForm({
    reValidateMode: 'onBlur'
  });

  const watchPassword = watch('password');

  React.useEffect(() => {
    // if(isAuthenticated){
    //   alert('로그인 상태입니다.')
    //   history.push('/')
    // }else{
      // Fetch.get('/api/v1/signup/').then(res=>{
        // setPositions({
        //   offense: res['offense_positions'],
        //   defense: res['defense_positions'],
        // })
      // })
    // }
  }, []);

  const baseControllerProps = {
    control: control,
    defaultValue: '',
    rules:{
      required: true,
    }
  }

  const handleOpenDialog = updatedObj => e => {
    e.preventDefault();
    setOpenDialogs({...openDialogs, ...updatedObj})
  }

  return (
    <Box
      display="flex" 
      style={{height:'100vh'}}
    >
      <Box
        m='auto'
      >
        <Grid container justify="center">
          <Grid item xs={12} sm={12} md={4}>
              <Typography variant='h5' align='center' gutterBottom>회원가입</Typography>
              <form onSubmit={
                // handleSubmit(signUp)
                handleSubmit(data=>{
                  console.log(data)
                })
              }>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={12} md={12}>
                    <FormRadioField
                      name='category'
                      controllerProps={{...baseControllerProps}}
                      labelText='분류'
                      // helperText='본인의 분류를 선택해주세요.'
                      error= {errors?.category&&true}
                      options={[
                        {value:"seller", label:"판매자"},
                        {value:"buyer", label:"구매자"},
                      ]}
                    />

                    <FormTextField 
                      name='username'
                      controllerProps={{
                        ...baseControllerProps, 
                        rules: {
                          ...baseControllerProps.rules,
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
                        helperText: (errors?.username&&true)?"올바른 이메일 주소가 아닙니다.":'가입하실 이메일을 입력해주세요.',
                        error: errors?.username&&true,
                      }}
                    />

                    <FormTextField 
                      name='password'
                      controllerProps={{
                        ...baseControllerProps, 
                        rules: {
                          ...baseControllerProps.rules,
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
                        helperText: (errors?.password&&true)?"최소 10자, 최소 하나의 문자 및 하나의 숫자":'최소 10자, 최소 하나의 문자 및 하나의 숫자',
                        error: errors?.password&&true,
                      }}
                    />
                    <FormTextField 
                      name='password_confirm'
                      controllerProps={{
                        ...baseControllerProps, 
                        rules: {
                          ...baseControllerProps.rules,
                          pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{10,}$/,
                          validate: {
                            confirm: value => watchPassword === value,
                          },
                        },
                      }}
                      fieldProps={{
                        type: "password",
                        label: '비밀번호 확인',
                        variant: 'outlined',
                        InputProps: {
                          endAdornment: (<InputAdornment position="end">
                              <Lock className={classes.inputIconsColor} />
                            </InputAdornment>),
                        },
                        helperText: (errors?.password_confirm&&true)?"최소 10자, 최소 하나의 문자 및 하나의 숫자":'최소 10자, 최소 하나의 문자 및 하나의 숫자',
                        error: errors?.password_confirm&&true,
                      }}
                    />
                  </Grid>
                    <Typography variant="subtitle2" className={classes.divider} gutterBottom>
                      회원 가입시, <Link href='#' onClick={handleOpenDialog({terms:true})}>이용약관</Link>과 <Link href='#' onClick={handleOpenDialog({privacy:true})}>개인정보취급정책</Link>에 동의한 것으로 간주됩니다.
                    </Typography>
                    <Button type='submit' variant='contained' color="primary" size="large" fullWidth>
                      회원가입
                    </Button>
                </Grid>
              </form>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default PageSignUp;
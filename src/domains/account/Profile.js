import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import { useForm, Controller } from "react-hook-form";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {Box, Container, Grid, InputAdornment, Button, IconButton, Typography, MenuItem, CircularProgress, Input, TextField, Avatar} from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';
import DeleteIcon from '@material-ui/icons/Delete';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

// import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Logo from 'components/Atoms/Logo/Logo.js'

import FormTextField from 'components/Atoms/FormTextField/FormTextField.js'
import FormRadioField from 'components/Atoms/FormRadioField/FormRadioField.js'

import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";

import AuthContext from 'contexts/Auth/AuthContext.js';
import {Fetch} from 'utils/Fetch.js'

import styles from "./Profile.style.js";

const useStyles = makeStyles(styles);

export default (props)=>{
  const classes = useStyles();
  const {history, ...rest } = props;
  const {isAuthenticated, authUser, saveUserInfo} = React.useContext(AuthContext) 

  const profileUrl = `/api/profiles/${authUser.profile_id}/`;

  // const [profile, setProfile] = React.useState({})
  const [categories, setCategories] = React.useState([])

  const afterResponse = res=>{
    saveUserInfo(res)

    return res
  }

  React.useEffect(() => {
    if(!isAuthenticated){
      alert('먼저 로그인을 진행해주셔야 합니다.')
      history.push('/login')
    }else{
      Fetch.get('/api/categories/depth').then(res=>{
        setCategories(res)
      })
      Fetch.get(profileUrl).then(afterResponse)//.then(saveUserInfo)
    }
  }, []);
  React.useEffect(() => {
    if(categories){
      setValue('large_category', authUser.large_category)
      setValue('main_crops', authUser.main_crops)
    }
  }, [categories]);


  const { register, handleSubmit, errors, control, watch, reset, setValue } = useForm({
    reValidateMode: 'onBlur',
  });

  const watchLargeCategory = watch('large_category')
  const watchCategory = watch('category')

  const baseControllerProps = {
    control: control,
    defaultValue: '',
    rules: {
      required: true,
    },
  }

  const baseFieldProps = ({keyword, label, ...rest}) => ({
    className: classes.field,
    label: label,
    variant: 'outlined',
    // helperText: (errors?.[keyword]&&true)?"올바른 이메일 주소가 아닙니다.":'',
    error: errors?.[keyword]&&true,
    ...rest,
  })

  const makeFieldProps = ({name, label, helperText='', errorText='', extraControllerProps, extraFieldProps})=>({
    name: name,
    controllerProps: {
      control: control,
      defaultValue: authUser[name] || '',
      rules: {
        required: true,
      },
      ...extraControllerProps,
    },
    fieldProps: {
      className: classes.field,
      label: label,
      variant: 'outlined',
      helperText: (errors?.[name]&&true)?errorText:helperText,
      error: errors?.[name]&&true,
      ...extraFieldProps,
    },
  })

  const renderImageField = (name)=>(
    <TextField
      className={classes.field}
      inputRef={register}
      type= 'file'
      defaultValue=''
      inputProps={{
        accept:'image/jpg,impge/png,image/jpeg',
      }}
      name={name}
      variant='outlined'
      fullWidth
    />
  )

  // name
  // tel
  // career
  // thumbnail
  // seller_name
  // job_position
  // main_crops

  return (
    <Box className={classes.root} component="div" display='flex' flexDirection="column" alignItems='stretch'>
      <Header 
        brand={
          <Logo />
        }
      />
      <form className={classes.form} onSubmit={handleSubmit(data=>{
        const formData = new FormData()

        Object.keys(data).map(key=>{
          formData.append(key, data[key])
        })
        formData.set("thumbnail", data?.thumbnail[0] || '')

        Fetch.put(profileUrl, formData).then(afterResponse).then(()=>{
          alert('저장되었습니다.')
        })
      })}>
        <Container
          className={classes.container} 
          maxWidth='xs' 
        >
          <Typography
            className={classes.title}
            variant='h4'
            align='center'
          >
            프로필 관리
          </Typography>

          <Grid
            container
            justify="center"
            alignItems="flex-start"
          >
            {/*<Avatar className={classes.pink}>
                          <AccountCircleIcon />
                        </Avatar>*/}
            <Avatar className={classes.avatar} src={authUser.thumbnail_url} />
            {renderImageField('thumbnail')}
            <FormTextField 
              {...makeFieldProps({
                name: 'name',
                label: '실명',
                // extraControllerProps: {
                //   defaultValue: profile["name"],
                // }
              })}
            />
            <FormTextField 
              {...makeFieldProps({
                name: 'tel',
                label: '연락처',
              })}
            />
            <FormRadioField
              name='category'
              controllerProps={{
                ...baseControllerProps,
                defaultValue: authUser.category,
              }}
              formControlProps={{className:classes.categoryRadio}}
              labelText='회원 분류'
              error= {errors?.category&&true}
              options={[
                {value:"S", label:"판매자"},
                {value:"B", label:"구매자"},
              ]}
            />

            {(watchCategory==='S')?<React.Fragment>
              <Grid item xs={6}>
                <FormTextField
                  {...makeFieldProps({
                    name: 'large_category',
                    label: '주판매 작물 대분류',
                    extraControllerProps:{
                      defaultValue: '',
                    },
                    extraFieldProps: {
                      select: true,

                      onChange:e=>{
                        setValue('large_category', e.target.value)
                        setValue('main_crops', '')
                      }
                    }
                  })}
                >
                  {categories.map(category=>
                    <MenuItem key={category.value} value={category.value}>{category.label}</MenuItem>
                  )}
                </FormTextField>
              </Grid>
              <Grid item xs={6}>
                <FormTextField
                  {...makeFieldProps({
                    name: 'main_crops',
                    label: '세부 분류',
                    extraControllerProps:{
                      defaultValue: '',
                    },
                    extraFieldProps: {
                      select: true,
                    }
                  })}
                >
                  <MenuItem value=''>-</MenuItem>
                  {
                    categories.reduce((acc, cur) => (
                      [...acc, ...cur.sub_categories]
                    ), []).map(sub_category=>{
                      return <MenuItem key={sub_category.id} value={sub_category.id} style={{display:watchLargeCategory===sub_category.large_category?'default':'none'}}>{sub_category.name}</MenuItem>
                    })
                  }


                </FormTextField>
              </Grid>
              <FormTextField 
                {...makeFieldProps({
                  name: 'seller_name',
                  label: '업장 이름',
                })}
              />
              <FormTextField 
                {...makeFieldProps({
                  name: 'job_position',
                  label: '직위',
                })}
              />
              <FormTextField 
                {...makeFieldProps({
                  name: 'career',
                  label: '경력사항',
                  extraFieldProps: {
                    multiline: true,
                    rows:3,
                    rowsMax:5,
                  },
                })}
              />
              <FormTextField 
                {...makeFieldProps({
                  name: 'comment',
                  label: '사장님 알림',
                  extraFieldProps: {
                    multiline: true,
                    rows:5,
                    rowsMax:10,
                  },
                })}
              />
            </React.Fragment>:''}

            <Button type='submit' color="primary" size="large" variant='contained' fullWidth>
              저장
            </Button>
          </Grid>
        </Container>
      </form>
      <Footer />
    </Box>
  );
};

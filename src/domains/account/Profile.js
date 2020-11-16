import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import { useForm, Controller } from "react-hook-form";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {Box, Container, Grid, InputAdornment, Button, IconButton, Typography, MenuItem, CircularProgress, Input, TextField} from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';
import DeleteIcon from '@material-ui/icons/Delete';

// import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Logo from 'components/Atoms/Logo/Logo.js'

import FormTextField from 'components/Atoms/FormTextField/FormTextField.js'
import FormRadioField from 'components/Atoms/FormRadioField/FormRadioField.js'

import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";

import {Fetch} from 'utils/Fetch.js'

import styles from "./Profile.style.js";

const useStyles = makeStyles(styles);

export default (props)=>{
  const classes = useStyles();
  const {history, ...rest } = props;

  const [categories, setCategories] = React.useState([])

  React.useEffect(() => {
    // if(isAuthenticated){
    //   alert('로그인 상태입니다.')
    //   history.push('/')
    // }else{
      Fetch.get('/api/categories/depth').then(res=>{
        setCategories(res)
      })
    // }
  }, []);


  const { register, handleSubmit, errors, control, watch, reset, setValue } = useForm({
    reValidateMode: 'onBlur',
  });

  const watchLargeCategory = watch('large_category')
  const watchCategory = watch('category')

  const baseControllerProps = {
    control: control,
    defaultValue: '',
    rules: {
      // required: true,
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
      defaultValue: '',
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
        console.log(data)
        // Fetch.post('/api/profile/', data).then(res=>{
        //   console.log(res)
        // })
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
            {renderImageField('thumbnail')}
            <FormTextField 
              {...makeFieldProps({
                name: 'name',
                label: '실명',
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
              controllerProps={{...baseControllerProps}}
              formControlProps={{className:classes.categoryRadio}}
              labelText='이용자 분류'
              error= {errors?.category&&true}
              options={[
                {value:"seller", label:"판매자"},
                {value:"buyer", label:"구매자"},
              ]}
            />

            {(watchCategory==='seller')?<React.Fragment>
              <Grid item xs={6}>
                <FormTextField
                  {...makeFieldProps({
                    name: 'large_category',
                    label: '주판매 작물 대분류',
                    extraFieldProps: {
                      select: true,
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
                    extraFieldProps: {
                      select: true,
                    }
                  })}
                >
                  <MenuItem value=''>-</MenuItem>
                  {categories.find(large_category=>large_category.value===watchLargeCategory)?.sub_categories.map(sub_category=>
                    <MenuItem key={sub_category.id} value={sub_category.id}>{sub_category.name}</MenuItem>
                  )}
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
                  name: 'career',
                  label: '경력사항',
                  extraFieldProps: {
                    multiline: true,
                    rows:8,
                    rowsMax:12,
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

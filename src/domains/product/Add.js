import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import { useForm } from "react-hook-form";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {Box, Container, Grid, InputAdornment, Button, IconButton, List, ListItem, ListItemText, Link, Paper, Typography, Divider, MenuItem, InputBase} from '@material-ui/core';

import PermIdentity from '@material-ui/icons/PermIdentity';
import DeleteIcon from '@material-ui/icons/Delete';

import { RenderAfterNavermapsLoaded, NaverMap, Marker } from 'react-naver-maps'; // 패키지 불러오기

// import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Logo from 'components/Atoms/Logo/Logo.js'

import FormTextField from 'components/Atoms/FormTextField/FormTextField.js'
import FieldArray from "components/Atoms/FieldArray/FieldArray.js";
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";

import {Fetch} from 'utils/Fetch.js'

import styles from "./Add.style.js";

const useStyles = makeStyles(styles);

export default (props)=>{
  const classes = useStyles();
  const {history, ...rest } = props;


  const [categories, setCategories] = React.useState([
    {"value":"garden","label":"야채류","sub_categories":[{"id":1,"large_category":"garden","name":"가지"},{"id":2,"large_category":"garden","name":"깻잎"},{"id":3,"large_category":"garden","name":"배추"},{"id":4,"large_category":"garden","name":"상추"}]},
    {"value":"green","label":"청과류","sub_categories":[{"id":6,"large_category":"green","name":"사과"},{"id":7,"large_category":"green","name":"배"}]},
    {"value":"grain","label":"곡류","sub_categories":[{"id":8,"large_category":"grain","name":"쌀"}]},
    {"value":"nuts","label":"견과류","sub_categories":[{"id":9,"large_category":"nuts","name":"땅콩"}]},
    {"value":"mushrooms","label":"버섯류","sub_categories":[{"id":10,"large_category":"mushrooms","name":"송이버섯"}]},
    {"value":"etc","label":"기타/가공품","sub_categories":[{"id":11,"large_category":"etc","name":"홍삼"}]}
  ])


  React.useEffect(() => {
    // if(isAuthenticated){
    //   alert('로그인 상태입니다.')
    //   history.push('/')
    // }else{
      // Fetch.get('/api/categories/depth').then(res=>{
      //   setCategories(res)
      // })
    // }
  }, []);

  const { register, handleSubmit, errors, control, watch, reset } = useForm({
    reValidateMode: 'onBlur'
  });

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

  // const makeFormProps = ({keyword, label})=>({
  //   name: keyword,
  //   controllerProps: {
  //     ...baseControllerProps, 
  //   },
  //   fieldProps: {
  //     ...baseFieldProps({keyword, label}),
  //   },
  // })


// category
// name
// address
// price
// description
// images
//    FieldArray
// is_hide

// lat
// lng

  const watchLargeCategory = watch('large_category')

  const defaultImage = {image:''}
  const handleImage = {
    appendParent: ({append}) => ()=>{
      append({...defaultImage})
    },
    removeParent: ({remove}) => index => ()=>{
      remove(index)
    },
    clearParents: ()=>{
      reset({['images']:[]})
    },
  }

  const defaultOption = {volumn:'', price:''}
  const handleOption = {
    appendParent: ({append}) => ()=>{
      append({...defaultOption})
    },
    removeParent: ({remove}) => index => ()=>{
      remove(index)
    },
    clearParents: ()=>{
      reset({['options']:[]})
    },
  }

  const ImageTypeSelect = (
    <FormTextField
      name='image_type'
      controllerProps={{
        ...baseControllerProps,
      }}
      fieldProps={{
        select: true,
        ...baseFieldProps({keyword:'image_type', label:'이미지 용도'}),
        defaultValue: 'content',
      }}
    >
      <MenuItem value='top'>대표이미지</MenuItem>
      <MenuItem value='content'>상품상세</MenuItem>
    </FormTextField>
  )

  return (
    <Box className={classes.root} component="div" display='flex' flexDirection="column">
      <Header 
        brand={
          <Logo />
        }
      />
      <form>
        <Container 
          className={classes.container} 
          maxWidth='md' 
        >
          <Typography
            className={classes.title}
            variant='h4'
            align='center'
          >
            상품 등록
          </Typography>

          <Grid
            container
            spacing={3}
            justify="center"
            alignItems="flex-start"
          >
            <Grid item xs={6}>
              <FormTextField
                name='large_category'
                controllerProps={{
                  ...baseControllerProps,
                }}
                fieldProps={{
                  select: true,
                  ...baseFieldProps({keyword:'large_category', label:'상품 대분류'}),
                }}
              >
                {categories.map(category=>
                  <MenuItem key={category.value} value={category.value}>{category.label}</MenuItem>
                )}
              </FormTextField>
              <FormTextField
                name='sub_category'
                controllerProps={{
                  ...baseControllerProps,
                }}
                fieldProps={{
                  select: true,
                  ...baseFieldProps({keyword:'sub_category', label:'세부 분류'}),
                }}
              >
                <MenuItem value=''>-</MenuItem>
                {categories.find(large_category=>large_category.value===watchLargeCategory)?.sub_categories.map(sub_category=>
                  <MenuItem key={sub_category.id} value={sub_category.id}>{sub_category.name}</MenuItem>
                )}
              </FormTextField>

              <FormTextField 
                name='name'
                controllerProps={{
                  ...baseControllerProps, 
                }}
                fieldProps={{
                  ...baseFieldProps({keyword:'name', label:'상품명'}),
                }}
              />
              <FormTextField 
                name='address'
                controllerProps={{
                  ...baseControllerProps, 
                }}
                fieldProps={{
                  ...baseFieldProps({keyword:'address', label:'재배지 주소'}),
                }}
              />
              <FormTextField 
                name='price'
                controllerProps={{
                  ...baseControllerProps, 
                }}
                fieldProps={{
                  ...baseFieldProps({keyword:'price', label:'대표 가격'}),
                }}
              />
              <FormTextField 
                name='description'
                controllerProps={{
                  ...baseControllerProps, 
                }}
                fieldProps={{
                  ...baseFieldProps({keyword:'description', label:'상품 설명'}),
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <FieldArray 
                {...{parentName:'images', control}}
                handleParent={handleImage}
                parentFields={[
                  {
                    gridProps:{
                      xs: 3,
                    },
                    render:({parentIndex, row})=>(
                      <FormTextField
                        name={`images[${parentIndex}].image_type`}
                        controllerProps={{...baseControllerProps}}
                        fieldProps={{
                          select: true,
                          ...baseFieldProps({keyword:'image_type', label:'이미지 용도'}),
                          defaultValue: 'content',
                        }}
                      >
                        <MenuItem value='top'>대표이미지</MenuItem>
                        <MenuItem value='content'>상품상세</MenuItem>
                      </FormTextField>
                    )
                  },
                  {
                    gridProps:{
                      xs: true,
                    },
                    render:({parentIndex, row})=>(
                      <FormTextField 
                        name={`images[${parentIndex}].image`}
                        controllerProps={{...baseControllerProps}}
                        fieldProps={{
                          type: 'file',
                          inputProps: {
                            accept: 'image/jpg,impge/png,image/jpeg',
                          },
                          ...baseFieldProps({keyword:'image'}),
                        }}
                      />
                    )
                  },
                  {
                    gridProps:{
                      xs: 1,
                    },
                    render:({remove, parentIndex})=>(
                      <IconButton color="secondary" onClick={handleImage.removeParent({remove})(parentIndex)} aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    ),
                  },
                ]}
                parentButtons={[
                  {
                    gridProps:{
                      xs: true,
                    },
                    render: ({append})=>(
                      <Button color="success" size="lg" variant='outlined' onClick={handleImage.appendParent({append})}>
                        이미지 추가
                      </Button>
                    ),
                  },
                  {
                    gridProps:{
                      xs: true,
                    },
                    render: ()=>(
                      <Button color="danger" size="lg" variant='outlined' onClick={handleImage.clearParents}>
                        모두 삭제
                      </Button>
                    ),
                  },
                ]}
              />

              <FieldArray 
                {...{parentName:'options', control}}
                handleParent={handleOption}
                parentFields={[
                  {
                    gridProps:{
                      xs: 5,
                    },
                    render:({parentIndex, row})=>(
                      <FormTextField 
                        name={`options[${parentIndex}].volumn`}
                        controllerProps={{...baseControllerProps}}
                        fieldProps={{
                          ...baseFieldProps({keyword:'volumn', label:'용량'}),
                        }}
                      />
                    )
                  },
                  {
                    gridProps:{
                      xs: 5,
                    },
                    render:({parentIndex, row})=>(
                      <FormTextField 
                        name={`options[${parentIndex}].price`}
                        controllerProps={{...baseControllerProps}}
                        fieldProps={{
                          ...baseFieldProps({keyword:'price', label:'가격'}),
                        }}
                      />
                    )
                  },
                  {
                    gridProps:{
                      xs: 2,
                    },
                    render:({remove, parentIndex})=>(
                      <IconButton color="secondary" onClick={handleOption.removeParent({remove})(parentIndex)} aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    ),
                  },
                ]}
                parentButtons={[
                  {
                    gridProps:{
                      xs: true,
                    },
                    render: ({append})=>(
                      <Button color="success" size="lg" variant='outlined' onClick={handleOption.appendParent({append})}>
                        옵션 추가
                      </Button>
                    ),
                  },
                  {
                    gridProps:{
                      xs: true,
                    },
                    render: ()=>(
                      <Button color="danger" size="lg" variant='outlined' onClick={handleOption.clearParents}>
                        모두 삭제
                      </Button>
                    ),
                  },
                ]}
              />
            </Grid>
          </Grid>

          <Box display='flex' justifyContent="flex-end" mt={10}>
            <Button type='submit' color="primary" size="lg" variant='contained'>
              저장
            </Button>
          </Box>
        </Container>
      </form>
      <Footer />
    </Box>
  );
};

import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import { useForm, Controller } from "react-hook-form";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {Box, Container, Grid, InputAdornment, Button, IconButton, Typography, MenuItem, CircularProgress, Input, TextField} from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';
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


  const [categories, setCategories] = React.useState([])
  const [inSearch, setInSearch] = React.useState(false)
  const [aptitudeTable, setAptitudeTable] = React.useState('')
  // const [files, setFiles] = React.useState([])

  // const onFileUpload = (event) => {
  //   event.preventDefault();
  //   // Get the file Id
  //   let id = event.target.id;
  //   // Create an instance of FileReader API
  //   let file_reader = new FileReader();
  //   // Get the actual file itself
  //   let file = event.target.files[0];
  //   file_reader.onload = () => {
  //     // After uploading the file
  //     // appending the file to our state array
  //     // set the object keys and values accordingly
  //     setFiles([...files, { file_id: id, uploaded_file: file_reader.result }]);
  //   };
  //   // reading the actual uploaded file
  //   file_reader.readAsDataURL(file);
  // }



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

  const defaultImage = {image_type:'', image:''}
  const defaultImages = [{image_type:'top', image:''},{image_type:'content', image:''}]
  const defaultOption = {volumn:'', price:''}
  const defaultOptions = [defaultOption, defaultOption]

  const defaultValues = {
    images: defaultImages,
    options: defaultOptions,
  };

  const { register, handleSubmit, errors, control, watch, reset, setValue } = useForm({
    reValidateMode: 'onBlur',
    defaultValues,
  });

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
        // required: true,
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


// lat
// lng

  const watchAll = watch()
  const watchLargeCategory = watchAll['large_category']

  const handleSearch = ()=>{
    let address = watchAll['address']

    if (address==='')return;

    setInSearch(true)

    // TODO : need spinner & write exception
    Fetch.get('/api/nongsaro/'+address).then(res=>{
      // console.log(res)
      setValue('address', res['address'])
      setValue('lng', res['lng'])
      setValue('lat', res['lat'])
      setAptitudeTable(res['aptitude_table'])
    }).finally(() => {
      // console.log('finally')
      setInSearch(false)
    });
  }

  const handleResetImages = ()=>reset({ ...watchAll, 'images': defaultImages})
  const handleResetOptions = ()=>reset({ ...watchAll, 'options': defaultOptions})


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

  return (
    <Box className={classes.root} component="div" display='flex' flexDirection="column">
      <Header 
        brand={
          <Logo />
        }
      />
      <form onSubmit={handleSubmit(data=>{
        console.log(data)
        // console.log(files)

        const formData = new FormData()

        Object.keys(data).map(key=>{
          formData.append(key, data[key])
        })
        formData.set("thumbnail", data.thumbnail[0])
        formData.delete('images')
        formData.delete('options')

        data['images'].map(obj=>{
          formData.append('images[]', obj.image[0])
        })
        data['options'].map(option=>{
          formData.append('options[]', JSON.stringify(option))
        })

        // // Fetch.post('/api/products/', data).then(res=>{
        Fetch.post('/api/products/', formData).then(res=>{
          alert('정상적으로 등록되었습니다.')
          history.push('/')
        });
      })}>
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
            <Grid item xs={6} container>
              <Grid item xs={6}>
                <FormTextField
                  {...makeFieldProps({
                    name: 'large_category',
                    label: '상품 대분류',
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
                    name: 'category',
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
                  name: 'name',
                  label: '상품명',
                })}
              />
              {renderImageField('thumbnail')}
              <FormTextField 
                {...makeFieldProps({
                  name: 'address',
                  label: '재배지 주소',
                  extraFieldProps: {
                    InputProps:{
                      endAdornment:(
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="search"
                            onClick={handleSearch}
                            edge="end"
                          >
                            {
                              (inSearch)?<CircularProgress className={classes.progress} size={28} />:<SearchIcon />
                            }
                          </IconButton>
                        </InputAdornment>
                      )
                    }
                  }
                })}
              />
              <Grid item xs={6}>
                <FormTextField 
                  {...makeFieldProps({
                    name: 'lat',
                    label: '위도',
                    extraFieldProps: {
                      InputProps: {
                        readOnly: true,
                      }
                    }
                  })}
                />
              </Grid>
              <Grid item xs={6}>
                <FormTextField 
                  {...makeFieldProps({
                    name: 'lng',
                    label: '경도',
                    extraFieldProps: {
                      InputProps: {
                        readOnly: true,
                      }
                    }
                  })}
                />
              </Grid>
              {
                (aptitudeTable==='')?'':<div className={classes.aptitudeTableDiv} dangerouslySetInnerHTML={ {__html: aptitudeTable} }></div>
              }

              <FormTextField 
                {...makeFieldProps({
                  name: 'price',
                  label: '대표 가격',
                  extraFieldProps: {
                    InputProps:{
                      endAdornment:<InputAdornment position="end">원</InputAdornment>
                    }
                  }
                })}
              />
              <FormTextField 
                {...makeFieldProps({
                  name: 'description',
                  label: '상품 설명',
                })}
              />
            </Grid>
            <Grid item xs={6}>
              <FieldArray 
                {...{
                  parentName: 'images', 
                  handleReset: handleResetImages,
                  control}}
                parentFields={[
                  {
                    gridProps:{
                      xs: 4,
                    },
                    render:({parentIndex, row})=>(
                      <FormTextField
                        {...makeFieldProps({
                          name: `images[${parentIndex}].image_type`,
                          label: '이미지 용도',
                          extraControllerProps: {
                            defaultValue: row.image_type || 'content',
                          },
                          extraFieldProps: {
                            select: true,
                          }
                        })}
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
                    render:({parentIndex})=>renderImageField(`images[${parentIndex}].image`)
                  },
                ]}
              />

                      {/*
                      <input ref={register} type="file" name={`images[${parentIndex}].image`} accept='image/jpg,impge/png,image/jpeg' />

                        // <FormTextField 
                        //   {...makeFieldProps({
                        //     name: `images[${parentIndex}].image`,
                        //     // label: '이미지 용도',
                        //     extraControllerProps: {
                        //       defaultValue: row.image,
                        //     },
                        //     extraFieldProps: {
                        //       type: 'file',
                        //       inputProps: {
                        //         accept: 'image/jpg,impge/png,image/jpeg',
                        //         onChange: onFileUpload,
                        //       },
                        //     }
                        //   })}
                        // />
                      */}

              <FieldArray 
                {...{
                  parentName: 'options', 
                  handleReset: handleResetOptions,
                  control}}
                parentFields={[
                  {
                    gridProps:{
                      xs: 5,
                    },
                    render:({parentIndex, row})=>(
                      <FormTextField 
                        {...makeFieldProps({
                          name: `options[${parentIndex}].volumn`,
                          label: '판매 용량',
                          extraControllerProps: {
                            defaultValue: row.volumn,
                          },
                        })}
                      />
                    )
                  },
                  {
                    gridProps:{
                      xs: 5,
                    },
                    render:({parentIndex, row})=>(
                      <FormTextField 
                        {...makeFieldProps({
                          name: `options[${parentIndex}].price`,
                          label: '옵션 가격',
                          extraControllerProps: {
                            defaultValue: row.price,
                          },
                          extraFieldProps: {
                            InputProps:{
                              endAdornment:<InputAdornment position="end">원</InputAdornment>
                            }
                          }
                        })}
                      />
                    )
                  },
                ]}
              />
            </Grid>
          </Grid>

          <Box display='flex' justifyContent="flex-end" mt={10}>
            <Button type='submit' color="primary" size="large" variant='contained'>
              저장
            </Button>
          </Box>
        </Container>
      </form>
      <Footer />
    </Box>
  );
};

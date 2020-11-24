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

import AuthContext from 'contexts/Auth/AuthContext.js';
import {Fetch} from 'utils/Fetch.js'

import styles from "./Add.style.js";

const useStyles = makeStyles(styles);

export default (props)=>{
  const classes = useStyles();
  const {history, ...rest } = props;
  const {isAuthenticated, authUser} = React.useContext(AuthContext) 

  const [categories, setCategories] = React.useState([])
  const [inSearch, setInSearch] = React.useState(false)
  const [aptitudeTable, setAptitudeTable] = React.useState('')

  React.useEffect(() => {
    // console.log(authUser)
    if(isAuthenticated && authUser['category']==='S'){
      Fetch.get('/api/categories/depth').then(res=>{
        setCategories(res)
      })
    }else if(isAuthenticated && authUser['category']!=='S'){
      alert('판매자 회원만이 상품을 등록할 수 있습니다.')
      history.push('/profile')
    }else{
      alert('판매자 회원만이 상품을 등록할 수 있습니다.')
      history.push('/login')
    }
  }, []);

  const defaultImage = {image_type:'', image:''}
  const defaultImages = [defaultImage,]
  const defaultOption = {volumn:'', price:''}
  const defaultOptions = [defaultOption,]

  const defaultValues = {
    images: defaultImages,
    options: defaultOptions,
  };

  const { register, handleSubmit, errors, control, watch, reset, setValue } = useForm({
    reValidateMode: 'onBlur',
    defaultValues,
  });

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
    }).catch(()=>{
      alert('해당 재배지를 조회할 수 없습니다.')
    }).finally(() => {
      // console.log('finally')
      setInSearch(false)
    });
  }

  const handleResetImages = ()=>reset({images:[defaultImage]})
  const handleResetOptions = ()=>reset({images:[defaultOption]})


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
        const formData = new FormData()

        Object.keys(data).map(key=>{
          if (key==='thumbnail'||key==='images'||key==='options')
            return;
          formData.append(key, data[key])
        })
        formData.set("thumbnail", data.thumbnail[0])

        const images = data.images.filter(image=>(
          image.image_type==='top'||image.image_type==='content') && image.image.length>0
        )
        const options = data.options.filter(option=>(
          option.volumn!==''&&option.price!==''
        ))

        images.map(image=>{
          formData.append('images[]', image.image[0])
        })
        formData.set("images_rest", JSON.stringify(images.map(image=>{
          delete image.image
          return image
        })))
        formData.set("options", JSON.stringify(options))

        // // Fetch.post('/api/products/', data).then(res=>{
        Fetch.post('/api/products/', formData).then(res=>{
          // console.log(res)
          alert('정상적으로 등록되었습니다.')
          history.push('/')
        });

        console.log(data)

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
            <Grid item xs={12} sm={6} container>
              <Grid item xs={6}>
                <FormTextField
                  {...makeFieldProps({
                    name: 'large_category',
                    label: '상품 대분류',
                    extraControllerProps:{
                      defaultValue:'',
                    },
                    extraFieldProps: {
                      select: true,
                    },
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
                  {
                    categories.reduce((acc, cur) => (
                      [...acc, ...cur.sub_categories]
                    ), []).map(sub_category=>(
                      <MenuItem key={sub_category.id} value={sub_category.id} style={{display:watchLargeCategory===sub_category.large_category?'default':'none'}}>{sub_category.name}</MenuItem>
                    ))
                  }
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
                    type:'number',
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
                  extraFieldProps: {
                    multiline: true,
                    rows:3,
                    rowsMax:5,
                  },
                })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FieldArray 
                {...{
                  parentName: 'images', 
                  handleReset: handleResetImages,
                  defaultParent: defaultImage,
                  control}}
                parentFields={[
                  // {
                  //   gridProps:{
                  //     style:{display:'none'},
                  //   },
                  //   render:({parentIndex, row})=>(
                  //     <FormTextField 
                  //       {...makeFieldProps({
                  //         name: `images[${parentIndex}].order`,
                  //         label: '순서',
                  //         extraControllerProps: {
                  //           defaultValue: row.order || parentIndex,
                  //         },
                  //       })}
                  //     />
                  //   )
                  // },
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
                            defaultValue: row.image_type || '',
                          },
                          extraFieldProps: {
                            select: true,
                          }
                        })}
                      >
                        <MenuItem value=''>-</MenuItem>
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

              <FieldArray 
                {...{
                  parentName: 'options', 
                  handleReset: handleResetOptions,
                  defaultParent: defaultOption,
                  control}}
                parentFields={[
                  // {
                  //   gridProps:{
                  //     style:{display:'none'},
                  //   },
                  //   render:({parentIndex, row})=>(
                  //     <FormTextField 
                  //       {...makeFieldProps({
                  //         name: `options[${parentIndex}].order`,
                  //         label: '순서',
                  //         extraControllerProps: {
                  //           defaultValue: row.order || parentIndex,
                  //         },
                  //       })}
                  //     />
                  //   )
                  // },
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

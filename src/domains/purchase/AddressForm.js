import React from 'react';
import { useForm, Controller } from "react-hook-form";

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import SearchIcon from '@material-ui/icons/Search';

import FormTextField from 'components/Atoms/FormTextField/FormTextField.js'
import AuthContext from 'contexts/Auth/AuthContext.js';

import {Fetch} from 'utils/Fetch.js'

import styles from "./AddressForm.style.js";

const useStyles = makeStyles(styles);

export default function AddressForm(props) {
  const classes = useStyles();

  const {
    isAuthenticated, authUser, control, watch, setValue, errors, register
  } = props;

  const [inSearch, setInSearch] = React.useState(false);

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
      // variant: 'outlined',
      helperText: (errors?.[name]&&true)?errorText:helperText,
      error: errors?.[name]&&true,
      ...extraFieldProps,
    },
  })

  const watchAddress = watch('address')

  const handleSearch = ()=>{

    if (watchAddress==='')return;

    setInSearch(true)

    console.log(watchAddress)

    // TODO : need spinner & write exception
    Fetch.get(`/api/navermap/geocode/${watchAddress}/`).then(res=>{
      if(res['meta']['totalCount']>0){
        setValue('address', res['addresses'][0]['jibunAddress'])
        setValue('address_detail', '')
      }else{
        alert('해당하는 주소를 찾지 못했습니다.')
      }
    }).catch(()=>{
      alert('해당 재배지를 조회할 수 없습니다.')
    }).finally(() => {
      setInSearch(false)
    });
  }

  if(errors.saveAddress){
    alert('배송내용에 동의해주세요.')
  }
  // email
  // name
  // phone
  // address
  // address_detail
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        배송 확인
      </Typography>
      <Grid container spacing={3}>
        <FormTextField
          {...makeFieldProps({
            name: 'name',
            label: '이름',
            extraControllerProps: {
              defaultValue: authUser.name || ''
            },
          })}
        />
        <FormTextField
          {...makeFieldProps({
            name: 'tel',
            label: '연락처',
            extraControllerProps: {
              defaultValue: authUser.tel || ''
            },
          })}
        />
        <FormTextField
          {...makeFieldProps({
            name: 'email',
            label: '이메일',
            extraControllerProps: {
              defaultValue: authUser.email || ''
            },
          })}
        />
        <FormTextField 
          {...makeFieldProps({
            name: 'address',
            label: '주소',
            extraControllerProps: {
              defaultValue: authUser.address || ''
            },
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

        <FormTextField
          {...makeFieldProps({
            name: 'address_detail',
            label: '상세주소',
            extraControllerProps: {
              defaultValue: authUser.address_detail || ''
            },
          })}
        />

        <Grid item xs={12}>
          <FormControlLabel
            name='saveAddress'
            inputRef={register({
              required: true,
              validate: value => value === true,
            })}
            control={<Checkbox />}
            label="위 배송 내용을 확인 하였으며, 회원 본인은 배송에 동의합니다."
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

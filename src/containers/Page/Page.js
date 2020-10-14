import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import { useForm } from "react-hook-form";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {Box, Container, List, ListItem, ListItemText, InputAdornment, IconButton} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import FormTextField from 'components/Atoms/FormTextField/FormTextField.js'
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";

import styles from "./Page.style.js";

const useStyles = makeStyles(styles);

const Page = (props)=> {
  const classes = useStyles();
  const {history, ...rest } = props;
  const maxWidth = 'md';

  const { handleSubmit, errors, control } = useForm({
    reValidateMode: 'onBlur'
  });

  const baseControllerProps = {
    control: control,
    defaultValue: '',
  }

  return (
    <React.Fragment>
      <Header 
        maxWidth={maxWidth} 
        brandComponent={
          <svg xmlns="http://www.w3.org/2000/svg" width="188.473" height="57.523" viewBox="0 0 188.473 57.523">
            <g id="그룹_487" data-name="그룹 487" transform="translate(-3318.5 -3471.032)">
              <path id="패스_1312" data-name="패스 1312" d="M3432.076,3495.28a15.95,15.95,0,0,0-7.229-1.659c-10.844,0-15.778,6.887-15.778,16.509s4.934,16.461,15.778,16.461a15.936,15.936,0,0,0,6.74-1.417c-.976,3.468-3.467,5.667-7.131,5.667a5.946,5.946,0,0,1-4.933-1.905c-1.759-2.833-10.259-2.541-8.7,2.3,2.784,5.862,8.3,7.425,13.58,7.425,11.82,0,16.363-6.889,16.363-16.022V3496.7C3440.771,3493.23,3434.03,3492.936,3432.076,3495.28Zm-7.229,23.447c-4.348,0-6.887-3.761-6.887-8.6s2.539-8.695,6.887-8.695c4.4,0,7.034,3.858,7.034,8.695S3429.243,3518.727,3424.847,3518.727Z" transform="translate(-43.955 -10.963)" fill="#05aa6f"/>
              <path id="패스_1313" data-name="패스 1313" d="M3489.923,3493.915c-4.2-.342-7.18.292-9.231,1.855-1.612-2.687-8.6-2.295-8.6,1.319v26.036c0,4.1,8.743,4.1,8.743.1v-14.947c0-4.64,3.762-7.083,8.6-6.253C3493.636,3502.757,3494.222,3494.5,3489.923,3493.915Z" transform="translate(-74.544 -11.062)" fill="#05aa6f"/>
              <path id="패스_1314" data-name="패스 1314" d="M3519.23,3471.032h-1.563c-3.908,0-3.908,3.908-3.908,3.908v1.076s0,3.907,3.908,3.907h1.563c3.908,0,3.908-3.907,3.908-3.907v-1.076S3523.138,3471.032,3519.23,3471.032Z" transform="translate(-94.764 0)" fill="#05aa6f"/>
              <path id="패스_1315" data-name="패스 1315" d="M3514.424,3498.678v25.3c0,4.1,8.744,4.1,8.744.1v-25.5C3523.167,3494.576,3514.424,3494.576,3514.424,3498.678Z" transform="translate(-95.087 -11.918)" fill="#05aa6f"/>
              <path id="패스_1316" data-name="패스 1316" d="M3549.206,3512.759c-11.374.157-16.192,8.257-16.022,17.39.064,3.523,2.113,4.5,4.408,4.51l18.957-.349a6.613,6.613,0,0,1-6.835,5.894c-1.442.027-3.741-.143-5.261-1.451-1.845-1.568-3.412-2.554-6.224-1.488a3.678,3.678,0,0,0-1.816,5.75c3.286,4.374,8.709,5.875,13.461,5.787,11.693-.215,16.521-7.783,16.807-18.312C3566.931,3520.978,3560.9,3512.6,3549.206,3512.759Zm-5.258,12.713a6.144,6.144,0,0,1,6.156-5.028c3.2-.06,5.483,1.873,6.658,4.79Z" transform="translate(-104.189 -20.25)" fill="#05aa6f"/>
              <path id="패스_1317" data-name="패스 1317" d="M3637.887,3493.06c-2.852-.957-21.771,4.709-25.612,6.384a17.093,17.093,0,0,1-5.892.979,6.612,6.612,0,0,1-7.059-5.624l18.954-.39c2.295-.1,4.3-1.156,4.23-4.68-.187-9.131-5.318-17.037-16.69-16.75-11.691.293-17.39,8.9-16.768,18.4.7,10.509,5.815,17.882,17.509,17.641,4.752-.1,10.745-2.718,15.377-5.625C3629.857,3498.423,3640.363,3493.917,3637.887,3493.06Zm-31.946-11.537a6.145,6.145,0,0,1,6.348,4.785l-12.814.263C3600.536,3483.609,3602.736,3481.589,3605.941,3481.523Z" transform="translate(-131.283 -0.941)" fill="#05aa6f"/>
              <path id="패스_1318" data-name="패스 1318" d="M3364.623,3502.875c0-8.84-6.741-11.625-14.556-11.625-5.179,0-10.259,1.661-12.8,7.131-1.953,4.591,6.155,5.96,8.4,2.785.977-1.856,2.687-2.1,4.64-2.1,3.42,0,5.031,1.416,5.421,3.565h-4.3a30.9,30.9,0,0,0-6.573.65l-3.232.327c-4.591-.167-13.317-.84-16.692-1.344a1.609,1.609,0,0,1-1.478-1.5,1.677,1.677,0,0,0-1.8-1.52H3320.3a1.676,1.676,0,0,0-1.8,1.52l0,10.78h.007c-.061.312.566.554,2.636.557.179,0,.373,0,.583,0a5.492,5.492,0,0,1,2.331-3.112c1.092-.736,2.727,1.033,3.452,2.858l.568-.033a5.5,5.5,0,0,1,2.325-3.088c1.063-.716,2.638.941,3.39,2.715l.646-.045a5.511,5.511,0,0,1,2.312-3.03c1.045-.7,2.581.882,3.348,2.618,5.361-.4,9.765-.764,10.111-.784.288,0,.569,0,.831,0h4.837v1.563c0,2.345-4.269,3.657-7.962,4.592a1.765,1.765,0,0,0-.257.089l-25.564,6.161s-3.838.876-.686,1.962c2.242.772,20.723-.075,26.355-.353.051,0,.1,0,.151,0a15.489,15.489,0,0,0,7.962-2.05v.489c-.049.829,2.247,1.319,4.542,1.22,1.172-.049,4.3.195,4.3-1.954-.049-3.761-.1-5.861-.1-6.839Z" transform="translate(0 -9.812)" fill="#05aa6f"/>
            </g>
          </svg>
        }

        rightLinks={
          <React.Fragment>
            <FormTextField 
              name='username'
              controllerProps={{...baseControllerProps}}
              fieldProps={{
                label: '원하시는 지역/상품명을 입력해주세요',
                variant: 'outlined',
                InputProps: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge='end' onClick={()=>{alert()}} onMouseDown={(event) => {
                        event.preventDefault();
                      }}>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </React.Fragment>
        }
      />
      <Container className={classes.container} maxWidth={maxWidth} disableGutters>
        {props.children}
      </Container>
      <Footer maxWidth={maxWidth} />
    </React.Fragment>
  );
};

export default Page;
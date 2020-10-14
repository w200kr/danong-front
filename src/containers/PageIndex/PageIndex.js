import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import { useForm } from "react-hook-form";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {Box, Container, List, ListItem, ListItemText, InputAdornment, IconButton} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import Logo from 'components/Atoms/Logo/Logo.js'

import FormTextField from 'components/Atoms/FormTextField/FormTextField.js'
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";

import styles from "./PageIndex.style.js";

const useStyles = makeStyles(styles);

const PageIndex = (props)=> {
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
          <Logo />
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
        내용
      </Container>
      <Footer maxWidth={maxWidth} />
    </React.Fragment>
  );
};

export default PageIndex;
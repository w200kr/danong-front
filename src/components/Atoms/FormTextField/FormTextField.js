import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
import { Controller } from "react-hook-form";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';

import styles from "./FormTextField.style.js";

const useStyles = makeStyles(styles);

export default function FormInput(props) {
  const classes = useStyles();
  const {
    controllerProps,
    fieldProps,
    children,
    name,
    // ...rest
  } = props;

  // const helperText = (fieldProps.error && typeof fieldProps.errorText==='string')? fieldProps.errorText : fieldProps.helperText

  const inputFieldProps = {
    ...fieldProps,
    // helperText
  }


  var fieldClasses;
  if (fieldProps !== undefined) {
    fieldClasses = classNames(
      fieldProps.className,
      classes.formControl
    );
  } else {
    fieldClasses = classes.formControl;
  }

  return (
    <Controller
        name={name}
        {...controllerProps}
        render={({ ...renderProps })=>
          <TextField
            fullWidth={true}
            {...renderProps}
            {...inputFieldProps}
            className={fieldClasses}
          >
            {children}
          </TextField>
        }
        // {...rest}
    />
  );
}

FormInput.propTypes = {
  // labelText: PropTypes.node,
  // labelProps: PropTypes.object,
  // id: PropTypes.string,
  // // inputProps: PropTypes.object,
  // inputProps: PropTypes.shape({
  //   type: PropTypes.string.isRequired,
  // }),
  // fieldProps: PropTypes.object,
  // inputRootCustomClasses: PropTypes.string,
  // error: PropTypes.bool,
  // success: PropTypes.bool,
  // white: PropTypes.bool
};

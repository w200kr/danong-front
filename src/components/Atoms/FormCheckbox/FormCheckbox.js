import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
import { Controller } from "react-hook-form";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText'

import styles from "./FormCheckbox.style.js";

// const defaultControl = <Checkbox checked={gilad} onChange={handleChange} name="gilad" />

const useStyles = makeStyles(styles);

export default function FormCheckbox(props) {
  const classes = useStyles();
  const {
    name,
    controllerProps,
    formControlProps,
    labelProps,
    labelText,
    fieldProps,
    options,
    error,
    helperText,
  } = props;


  var formControlClasses;
  if (formControlProps !== undefined) {
    formControlClasses = classNames(
      formControlProps.className,
      classes.formControl
    );
  } else {
    formControlClasses = classes.formControl;
  }

  return (
    <FormControl component="fieldset" fullWidth {...formControlProps} {...{error}} className={formControlClasses}>
      <FormLabel component="legend" {...labelProps}>{labelText}</FormLabel>
      <Controller
        name={name}
        {...controllerProps}
        render={({ ...renderProps })=>
            // <FormGroup aria-label="gender"  {...renderProps}>
            <FormGroup row {...renderProps} {...fieldProps}>
              {
                options.map((option, index)=>
                  <FormControlLabel 
                    key={index} 
                    control={<Checkbox />} 
                    {...option} 
                  />
                )
              }
            </FormGroup>
        }
      />
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  )
}

FormCheckbox.propTypes = {
  // labelText: PropTypes.node,
  // labelProps: PropTypes.object,
  // id: PropTypes.string,
  // // inputProps: PropTypes.object,
  // inputProps: PropTypes.shape({
  //   type: PropTypes.string.isRequired,
  // }),
  // formControlProps: PropTypes.object,
  // inputRootCustomClasses: PropTypes.string,
  // error: PropTypes.bool,
  // success: PropTypes.bool,
  // white: PropTypes.bool
};

import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
import { Controller } from "react-hook-form";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText'

import styles from "./FormRadioField.style.js";

const defaultControl = <Radio />

const useStyles = makeStyles(styles);

export default function FormRadioField(props) {
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
            // <RadioGroup aria-label="gender"  {...renderProps}>
            <RadioGroup row {...renderProps} {...fieldProps}>
              {
                options.map((option, index)=>
                  <FormControlLabel key={index} control={<Radio />} {...option} />
                )
              }
            </RadioGroup>
        }
      />

      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  )
}

FormRadioField.propTypes = {
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

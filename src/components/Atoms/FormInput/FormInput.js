import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
import { Controller } from "react-hook-form";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import styles from "./FormInput.style.js";

const useStyles = makeStyles(styles);


const renderInput = (inputProps) => {
    if(inputProps.type==='select'){
      return (<Select
        {...inputProps}
      >
        {inputProps.options.map((option, index)=><MenuItem value={index} key={index}>{option.title}</MenuItem>)}
      </Select>)
    }else{
        return (<Input
            {...inputProps}
        />)
    }
}

export default function FormInput(props) {
  const classes = useStyles();
  const {
    controllerProps,
    id,
    name,
    formControlProps,
    labelText,
    labelProps,
    inputProps,
    error,
    errorText,
    white,
    inputRootCustomClasses,
    success,
    // ...rest
  } = props;

  const labelClasses = classNames({
    [" " + classes.labelRootError]: error,
    [" " + classes.labelRootSuccess]: success && !error
  });
  const underlineClasses = classNames({
    [classes.underlineError]: error,
    [classes.underlineSuccess]: success && !error,
    [classes.underline]: true,
    [classes.whiteUnderline]: white
  });
  const marginTop = classNames({
    [inputRootCustomClasses]: inputRootCustomClasses !== undefined
  });
  const inputClasses = classNames({
    [classes.input]: true,
    [classes.whiteInput]: white
  });
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
    <FormControl {...{...formControlProps, error}} className={formControlClasses}>
        {labelText !== undefined ? (
            <InputLabel
                className={classes.labelRoot + " " + labelClasses}
                htmlFor={id}
                {...labelProps}
            >
                {labelText}
            </InputLabel>
        ) : null}
        
        <Controller
            {...controllerProps}
            name={name} 
            render={({ ...renderProps })=>renderInput({
                classes: {
                    input: inputClasses,
                    root: marginTop,
                    disabled: classes.disabled,
                    underline: underlineClasses
                },
                id, error,
                ...renderProps,
                ...inputProps, 
            })}
        />
        <FormHelperText>{error && errorText}</FormHelperText>
    </FormControl>
  );
}

FormInput.propTypes = {
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  // inputProps: PropTypes.object,
  inputProps: PropTypes.shape({
    type: PropTypes.string.isRequired,
  }),
  formControlProps: PropTypes.object,
  inputRootCustomClasses: PropTypes.string,
  error: PropTypes.bool,
  success: PropTypes.bool,
  white: PropTypes.bool
};

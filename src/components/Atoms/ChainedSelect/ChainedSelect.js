import React from "react";

import FormInput from "components/Atoms/FormInput/FormInput.js"



                  //   <ChainedSelect 
                  //     control={control}
                  //     errors={errors}

                  //     chainedValue={watchAll.username}
                  //     dataSet={data}
                  //   />

export default function ChainedSelect(props) {
  const {control, errors, dataSet, chainedValue} = props;

  return (
    <FormInput
      controllerProps={{
        control: control,
        name: 'username',
        defaultValue: '',
        rules: {
          required: true,
        },
      }}
      id='email'
      name= 'username'
      formControlProps={{
        margin: 'dense',
        fullWidth: true,
      }}
      labelText='이메일'
      // labelProps={{}}
      inputProps={{
        type: "select",
        options: dataSet.filter(data=>data.year==chainedValue),
        // getOptionLabel: (option) => option.title,
        // endAdornment: (<InputAdornment position="end">
        //   <PermIdentity className={classes.inputIconsColor} />
        // </InputAdornment>),
      }}
      error={errors.username&&true}
      errorText="올바른 이메일"
    />
  )


}